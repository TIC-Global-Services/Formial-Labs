"use client";

import { Suspense, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  CanvasTexture,
  Color,
  DoubleSide,
  FrontSide,
  PerspectiveCamera,
  type Texture,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
} from "three";
import {
  Bounds,
  Center,
  Environment,
  Lightformer,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";

const MODEL_URL = "/models/bottle-model-draco.glb";
// Local decoder (public/draco), no CDN dependency
const DRACO_URL = "/draco/";

useGLTF.preload(MODEL_URL, DRACO_URL);

type Vec3 = [number, number, number];
type Role = "glass" | "cap" | "base" | "label";

const SCENE = {
  exposure: 1,
  fov: 30,
  margin: 1.05,
  autoRotate: true,
  autoRotateSpeed: 10,
  dpr: 2,
};

const POSITION = {
  x: 0,
  y: 0,
  scale: 1,
  rotation: [15, 10, 10] as Vec3, // degrees
};

// Glass material settings
const GLASS = {
  color: "#fafcff",
  opacity: 0.12,
  roughness: 0.2,
  metalness: 1,
  envMapIntensity: 8.72,
  transmission: 1,
  ior: 1.12,
  thickness: 6.62,
  attenuationColor: "#ffffff",
  attenuationDistance: 100,
  clearcoat: 0.2,
  clearcoatRoughness: 0,
  specularIntensity: 1,
  reflectivity: 0.5,
  iridescence: 0.44,
  sheen: 0,
  depthWrite: true,
  doubleSided: true,
};

const CAP = {
  color: "#fbfbfb",
  metalness: 1,
  roughness: 0.7,
  envMapIntensity: 1.3,
};

const BASE = {
  color: "#636363",
  metalness: 0,
  roughness: 0.2,
  envMapIntensity: 1,
};

const LABEL = {
  tint: "#ffffff",
  metalness: 0,
  roughness: 0.71,
  envMapIntensity: 0,
};

const LIGHTS = {
  ambient: 1.07,
  directional: 2,
  dirPos: [3, 5, 4] as Vec3,
  envIntensity: 0.89,
  envBlur: 0.75,
  top: 1,
  topPos: [0, 4, 3] as Vec3,
  left: 0.6,
  leftPos: [-5, 0, 2] as Vec3,
  right: 0.6,
  rightPos: [5, 0, 2] as Vec3,
  back: 0.5,
  backPos: [0, 0, -5] as Vec3,
};

// Label text positions (pixels on the 1792x878 label texture)
const LABEL_FONT = '"Times New Roman", Georgia, serif';
const NAME_TEXT = {
  x: 103,
  y: 265, // baseline, just below the "NAME" row
  maxWidth: 750,
  size: 96,
};
const INGREDIENTS_TEXT = {
  x: 103,
  y: 445, // baseline, just below "CHOSEN FOR YOU"
  maxWidth: 750,
  size: 64,
  lineHeight: 80,
  count: 2, // how many ingredients to list before "etc."
};

const Bottle = ({
  onReady,
  name,
  ingredients: ingredientsProp,
}: {
  onReady: () => void;
  name?: string;
  ingredients?: string[];
}) => {
  // Callers often pass a fresh array each render; key on content so the label
  // texture is only repainted when the ingredients actually change.
  const ingredientsKey = ingredientsProp?.join("|") ?? "";
  const ingredients = useMemo(
    () => (ingredientsKey ? ingredientsKey.split("|") : []),
    [ingredientsKey],
  );
  const { scene } = useGLTF(MODEL_URL, DRACO_URL);
  const maxAnisotropy = useThree((s) => s.gl.capabilities.getMaxAnisotropy());

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (!(obj instanceof Mesh)) return;
      const materials = Array.isArray(obj.material)
        ? obj.material
        : [obj.material];
      materials.forEach((mat) => {
        if (!(mat instanceof MeshStandardMaterial)) return;

        // Classify once, from the untouched file values
        if (!mat.userData.role) {
          const role: Role =
            mat instanceof MeshPhysicalMaterial && mat.transmission > 0
              ? "glass"
              : mat.name === "Material.009"
                ? "cap"
                : mat.map
                  ? "label"
                  : "base";
          mat.userData.role = role;
        }
        const role = mat.userData.role as Role;

        [mat.map, mat.roughnessMap, mat.metalnessMap].forEach((tex) => {
          if (tex) {
            tex.anisotropy = Math.min(16, maxAnisotropy);
            tex.needsUpdate = true;
          }
        });

        if (role === "glass" && mat instanceof MeshPhysicalMaterial) {
          mat.color = new Color(GLASS.color);
          mat.metalness = GLASS.metalness;
          mat.roughness = GLASS.roughness;
          mat.envMapIntensity = GLASS.envMapIntensity;
          mat.depthWrite = GLASS.depthWrite;
          mat.transmission = GLASS.transmission;
          mat.ior = GLASS.ior;
          mat.thickness = GLASS.thickness;
          mat.attenuationColor = new Color(GLASS.attenuationColor);
          mat.attenuationDistance = GLASS.attenuationDistance;
          mat.clearcoat = GLASS.clearcoat;
          mat.clearcoatRoughness = GLASS.clearcoatRoughness;
          mat.specularIntensity = GLASS.specularIntensity;
          mat.reflectivity = GLASS.reflectivity;
          mat.iridescence = GLASS.iridescence;
          mat.sheen = GLASS.sheen;
          mat.side = GLASS.doubleSided ? DoubleSide : FrontSide;
          mat.transparent = GLASS.opacity < 1;
          mat.opacity = GLASS.opacity;
        } else if (role === "cap") {
          mat.color = new Color(CAP.color);
          mat.metalness = CAP.metalness;
          mat.roughness = CAP.roughness;
          mat.envMapIntensity = CAP.envMapIntensity;
        } else if (role === "base") {
          mat.color = new Color(BASE.color);
          mat.metalness = BASE.metalness;
          mat.roughness = BASE.roughness;
          mat.envMapIntensity = BASE.envMapIntensity;
        } else {
          mat.color = new Color(LABEL.tint);
          mat.metalness = LABEL.metalness;
          mat.roughness = LABEL.roughness;
          mat.envMapIntensity = LABEL.envMapIntensity;
        }
        mat.needsUpdate = true;
      });
    });
  }, [scene, maxAnisotropy]);

  // Paint the customer's name onto a copy of the label texture
  useLayoutEffect(() => {
    let painted: CanvasTexture | null = null;
    scene.traverse((obj) => {
      if (!(obj instanceof Mesh)) return;
      const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
      materials.forEach((mat) => {
        // The label is the only material with both a map and an emissive map
        if (!(mat instanceof MeshStandardMaterial) || !mat.map || !mat.emissiveMap)
          return;
        const base = (mat.userData.baseLabel ??= {
          map: mat.map,
          emissiveMap: mat.emissiveMap,
        }) as { map: Texture; emissiveMap: Texture };
        const image = base.map.image as CanvasImageSource & {
          width: number;
          height: number;
        };

        const text = name?.trim();
        if (!text && !ingredients.length) {
          mat.map = base.map;
          mat.emissiveMap = base.emissiveMap;
          mat.needsUpdate = true;
          return;
        }

        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(image, 0, 0);

        ctx.fillStyle = "#ffffff";
        ctx.textBaseline = "alphabetic";
        const drawFit = (
          value: string,
          x: number,
          y: number,
          startSize: number,
          maxWidth: number,
        ) => {
          let size = startSize;
          ctx.font = `${size}px ${LABEL_FONT}`;
          while (ctx.measureText(value).width > maxWidth && size > 12) {
            size -= 2;
            ctx.font = `${size}px ${LABEL_FONT}`;
          }
          ctx.fillText(value, x, y);
        };

        if (text) {
          drawFit(text, NAME_TEXT.x, NAME_TEXT.y, NAME_TEXT.size, NAME_TEXT.maxWidth);
        }
        if (ingredients.length) {
          const shown = ingredients.slice(0, INGREDIENTS_TEXT.count);
          const lines = shown.map((item, i) =>
            i === shown.length - 1 && ingredients.length > shown.length
              ? `${item}, etc.`
              : `${item}${i < shown.length - 1 ? "," : ""}`,
          );
          lines.forEach((line, i) =>
            drawFit(
              line,
              INGREDIENTS_TEXT.x,
              INGREDIENTS_TEXT.y + i * INGREDIENTS_TEXT.lineHeight,
              INGREDIENTS_TEXT.size,
              INGREDIENTS_TEXT.maxWidth,
            ),
          );
        }

        const tex = new CanvasTexture(canvas);
        tex.flipY = base.map.flipY;
        tex.colorSpace = base.map.colorSpace;
        tex.wrapS = base.map.wrapS;
        tex.wrapT = base.map.wrapT;
        tex.anisotropy = Math.min(16, maxAnisotropy);
        tex.needsUpdate = true;
        mat.map = tex;
        mat.emissiveMap = tex;
        mat.needsUpdate = true;
        painted = tex;
      });
    });
    return () => painted?.dispose();
  }, [scene, name, ingredients, maxAnisotropy]);

  // Bounds refits the camera over the first frames; reveal only once it settled
  const frames = useRef(0);
  useFrame(() => {
    if (frames.current > 3) return;
    if (++frames.current === 3) onReady();
  });

  return (
    <group rotation={POSITION.rotation.map((d) => (d * Math.PI) / 180) as Vec3}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
};

const Lights = () => (
  <>
    <ambientLight intensity={LIGHTS.ambient} />
    <directionalLight position={LIGHTS.dirPos} intensity={LIGHTS.directional} />
    <Environment
      resolution={256}
      environmentIntensity={LIGHTS.envIntensity}
      blur={LIGHTS.envBlur}
    >
      <Lightformer
        form="rect"
        intensity={LIGHTS.top}
        position={LIGHTS.topPos}
        scale={[8, 4, 1]}
      />
      <Lightformer
        form="rect"
        intensity={LIGHTS.left}
        position={LIGHTS.leftPos}
        scale={[3, 6, 1]}
      />
      <Lightformer
        form="rect"
        intensity={LIGHTS.right}
        position={LIGHTS.rightPos}
        scale={[3, 6, 1]}
      />
      <Lightformer
        form="ring"
        intensity={LIGHTS.back}
        position={LIGHTS.backPos}
        scale={6}
      />
    </Environment>
  </>
);

// Shifts the rendered image in screen space, so the bottle still spins in place
const ViewOffset = ({ x, y }: { x: number; y: number }) => {
  useFrame(({ camera, size }) => {
    if (!("setViewOffset" in camera)) return;
    const cam = camera as PerspectiveCamera;
    cam.setViewOffset(
      size.width,
      size.height,
      -x * size.width,
      y * size.height,
      size.width,
      size.height,
    );
  });
  return null;
};

const Exposure = ({ value }: { value: number }) => {
  useFrame(({ gl }) => {
    gl.toneMappingExposure = value;
  });
  return null;
};

const BottleModel = ({
  className,
  onReady,
  name,
  ingredients,
}: {
  className?: string;
  onReady?: () => void;
  name?: string;
  ingredients?: string[];
}) => {
  const [ready, setReady] = useState(false);

  return (
    <div
      className={className}
      style={{ opacity: ready ? 1 : 0, transition: "opacity 0.5s ease" }}
    >
      <Canvas
        dpr={SCENE.dpr}
        camera={{ position: [0, 0, 5], fov: SCENE.fov }}
        gl={{ alpha: true, antialias: true }}
      >
        <Exposure value={SCENE.exposure} />
        <ViewOffset x={POSITION.x} y={POSITION.y} />
        <Lights />
        <Suspense fallback={null}>
          <group scale={POSITION.scale}>
            <Bounds fit clip observe maxDuration={0.001} margin={SCENE.margin}>
              <Bottle
                name={name}
                ingredients={ingredients}
                onReady={() => {
                  setReady(true);
                  onReady?.();
                }}
              />
            </Bounds>
          </group>
        </Suspense>
        <OrbitControls
          autoRotate={SCENE.autoRotate}
          autoRotateSpeed={SCENE.autoRotateSpeed}
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default BottleModel;
