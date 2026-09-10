"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import { TransitionRouter } from "next-transition-router";
import gsap from "gsap";
import blogIndex from "@/content/blogs/index.json";

/**
 * Same path structure at every keyframe: `M 0 {anchor} V {bulge} Q 50 {control} 100 {bulge} V {anchor} z`.
 * Only bulge/control move, so it can be tweened as plain numbers instead of needing
 * the (paid) MorphSVGPlugin — this reproduces that plugin's output for this shape exactly.
 */
const wavePath = (anchor: number, bulge: number, control: number) =>
  `M 0 ${anchor} V ${bulge} Q 50 ${control} 100 ${bulge} V ${anchor} z`;

// Matches /blogs/<slug> (an article) but not the /blogs listing page itself.
const getArticleSlug = (path?: string) => path?.match(/^\/blogs\/([^/]+)\/?$/)?.[1];

const getPost = (slug?: string) => (slug ? blogIndex.find((post) => post.slug === slug) : undefined);

const PageTransition = ({ children }: { children: ReactNode }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);
  // Set once per navigation (in `leave`, which gets from/to) and read again in
  // `enter` (which doesn't receive them) so both halves agree on which effect to run.
  const isReadingTransition = useRef(false);
  // Last pointer-down position, as a %/% pair — the zoom radiates outward from
  // wherever the reader actually clicked (a card thumbnail, "Read More", etc.)
  // instead of always the screen's dead center.
  const originRef = useRef("50% 50%");

  // Set the initial `d` imperatively, once, before paint. It must never be a
  // JSX-reconciled prop — a re-render mid-animation would reset it and stomp
  // GSAP's direct DOM writes.
  useLayoutEffect(() => {
    pathRef.current?.setAttribute("d", wavePath(100, 100, 100));

    const onPointerDown = (e: PointerEvent) => {
      originRef.current = `${(e.clientX / window.innerWidth) * 100}% ${(e.clientY / window.innerHeight) * 100}%`;
    };
    document.addEventListener("pointerdown", onPointerDown, { capture: true });
    return () => document.removeEventListener("pointerdown", onPointerDown, { capture: true });
  }, []);

  return (
    <TransitionRouter
      auto
      leave={(next, _from, to) => {
        const toSlug = getArticleSlug(to);
        // Only opening an article gets the photo-bloom treatment. Leaving one
        // (back to the listing, or anywhere else) always uses the standard
        // wave morph below.
        const post = getPost(toSlug);
        isReadingTransition.current = Boolean(post);

        if (isReadingTransition.current && post) {
          const overlay = overlayRef.current;
          const img = imgRef.current;
          const vignette = vignetteRef.current;
          const caption = captionRef.current;
          const title = titleRef.current;
          const meta = metaRef.current;
          if (!overlay || !img || !vignette || !caption || !title || !meta) {
            next();
            return;
          }

          img.src = post.heroImage;
          title.textContent = post.title;
          meta.textContent = `${post.readTime} · ${post.category}`;

          gsap.set(overlay, { autoAlpha: 1 });
          // transformOrigin must be set through GSAP (not img.style directly) —
          // its first tween on this element would otherwise reset it to 50% 50%.
          gsap.set(img, { scale: 1.3, opacity: 0, transformOrigin: originRef.current });
          gsap.set(vignette, { opacity: 0 });
          gsap.set([title, meta], { opacity: 0, y: 16 });

          const tl = gsap.timeline({ onComplete: next });

          // The article's own hero photo blooms outward from the exact spot
          // the reader clicked. Opacity and scale run as separate tweens —
          // opacity resolves quickly so the photo reads immediately, while
          // the scale keeps gliding to rest on a long, gentle deceleration
          // instead of snapping to a stop.
          tl.to(img, { opacity: 1, duration: 0.45, ease: "sine.out" })
            .to(img, { scale: 1.04, duration: 0.9, ease: "power3.out" }, "<")
            .to(vignette, { opacity: 1, duration: 0.6, ease: "sine.out" }, "<")
            .to(meta, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.5")
            .to(title, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, "<0.05")
            .to({}, { duration: 0.3 }); // hold so the title is actually readable

          return () => tl.kill();
        }

        const path = pathRef.current;
        if (!path) {
          next();
          return;
        }

        const state = { bulge: 100, control: 100 };
        const tl = gsap.timeline();

        // Cover: flat at the bottom edge -> rising wave -> solid fill.
        // Old page stays mounted and visible underneath until this completes —
        // TransitionRouter only navigates once `next()` is called.
        tl.to(state, {
          bulge: 50,
          control: 0,
          duration: 0.5,
          ease: "sine.in",
          onUpdate: () => path.setAttribute("d", wavePath(100, state.bulge, state.control)),
        }).to(state, {
          bulge: 0,
          control: 0,
          duration: 0.5,
          ease: "sine",
          onUpdate: () => path.setAttribute("d", wavePath(100, state.bulge, state.control)),
          onComplete: next,
        });

        return () => tl.kill();
      }}
      enter={(next) => {
        if (isReadingTransition.current) {
          const overlay = overlayRef.current;
          const img = imgRef.current;
          const vignette = vignetteRef.current;
          const title = titleRef.current;
          const meta = metaRef.current;
          if (!overlay || !img || !vignette || !title || !meta) {
            next();
            return;
          }

          const tl = gsap.timeline({
            onComplete: () => {
              gsap.set(overlay, { autoAlpha: 0 });
              next();
            },
          });

          // Title lifts away first, then the photo itself keeps blooming and
          // fades out, revealing the article — which opens on that same hero
          // image, so the handoff reads as continuous rather than a cut.
          tl.to([title, meta], { opacity: 0, y: -12, duration: 0.3, ease: "power2.in" })
            .to(img, { scale: 1.35, opacity: 0, duration: 0.6, ease: "expo.in" }, "-=0.1")
            .to(vignette, { opacity: 0, duration: 0.35, ease: "sine.in" }, "<");

          return () => tl.kill();
        }

        const path = pathRef.current;
        if (!path) {
          next();
          return;
        }

        const state = { bulge: 100, control: 100 };
        const tl = gsap.timeline();

        // Reveal: solid fill -> retreating wave -> flat at the top edge.
        // The new page is already rendered underneath at this point.
        tl.to(state, {
          bulge: 50,
          control: 0,
          duration: 0.5,
          ease: "sine.in",
          onUpdate: () => path.setAttribute("d", wavePath(0, state.bulge, state.control)),
        }).to(state, {
          bulge: 0,
          control: 0,
          duration: 0.5,
          ease: "sine",
          onUpdate: () => path.setAttribute("d", wavePath(0, state.bulge, state.control)),
          onComplete: next,
        });

        return () => tl.kill();
      }}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-100 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMin slice"
      >
        <path ref={pathRef} className="fill-primary" />
      </svg>
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-100 overflow-hidden opacity-0"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- transient transition graphic, not real page content */}
        <img ref={imgRef} alt="" className="h-full w-full object-cover" />
        <div
          ref={vignetteRef}
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/40"
        />
        <div
          ref={captionRef}
          className="absolute inset-x-0 bottom-0 px-6 pb-12 text-center sm:px-16 sm:pb-16"
        >
          <p
            ref={metaRef}
            className="font-obviously text-xs font-semibold tracking-widest text-white/80 uppercase"
          />
          <h2
            ref={titleRef}
            className="font-aeonik mx-auto mt-3 max-w-2xl text-3xl leading-tight text-white sm:text-5xl"
          />
        </div>
      </div>
      {children}
    </TransitionRouter>
  );
};

export default PageTransition;
