"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 400;
const FRAME_START = 10001;
const frameSrc = (i: number) => `/new-seq/${FRAME_START + i}.webp`;

const BADGES = [
    { label: "Precise", icon: "precise", className: "left-[44%] top-[19%]", from: { x: 0, y: 30 } },
    { label: "Confident", icon: "confident", className: "left-[13%] top-[30%]", from: { x: -40, y: 20 } },
    { label: "Clear", icon: "clear", className: "right-[13%] top-[30%]", from: { x: 40, y: 20 } },
    { label: "One of a kind", icon: "kind", className: "right-[17%] top-[68%]", from: { x: 40, y: -20 } },
    { label: "Expert", icon: "expert", className: "left-[30%] top-[74%]", from: { x: -40, y: -20 } },
];

const COPY_SETS = [
    ["Made only for you", "pH balanced", "Proprietary technology", "Gold standard ingredients"],
    ["Precision delivered", "Medical-grade", "Evidence-based"],
    ["World-class", "Advanced science", "Innovative formulations"],
];

const ScrollSequence = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
    const floatRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx || !sectionRef.current) return;

        const frames: (HTMLImageElement | undefined)[] = [];
        const state = { frame: 0 };
        let lastDrawn = -1;

        const draw = (force = false) => {
            const index = Math.round(state.frame);
            let img = frames[index];
            for (let i = index; !img?.complete && i >= 0; i--) img = frames[i];
            if (!img?.complete || !img.naturalWidth) return;
            if (!force && lastDrawn === index) return;
            const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
            const w = img.naturalWidth * scale;
            const h = img.naturalHeight * scale;
            ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
            lastDrawn = img === frames[index] ? index : -1;
        };

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            draw(true);
        };
        resize();
        window.addEventListener("resize", resize);

        // progressive preload, 6 parallel chains
        let cancelled = false;
        let next = 0;
        const loadNext = () => {
            if (cancelled || next >= FRAME_COUNT) return;
            const i = next++;
            const img = new window.Image();
            img.onload = () => {
                if (i === Math.round(state.frame)) draw(true);
                loadNext();
            };
            img.onerror = loadNext;
            img.src = frameSrc(i);
            frames[i] = img;
        };
        for (let k = 0; k < 6; k++) loadNext();

        let cleanupMove = () => {};
        const ctxGsap = gsap.context(() => {
            const badges = badgeRefs.current.filter(Boolean) as HTMLDivElement[];
            gsap.set(canvas, { opacity: 0 });
            badges.forEach((el, i) => gsap.set(el, { opacity: 0, scale: 0.7, ...BADGES[i].from }));

            // timeline units: badges in 0-1, hold 1-3, fade out 3-4, frames 4-14
            const tl = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=600%",
                    pin: true,
                    scrub: 0.5,
                    anticipatePin: 1,
                },
            });

            // all badges appear together
            tl.to(badges, { opacity: 1, scale: 1, x: 0, y: 0, ease: "power2.out", duration: 1 }, 0);
            tl.to(contentRef.current, { opacity: 0, scale: 0.95, duration: 1 }, 3);
            tl.to(canvas, { opacity: 1, duration: 0.6 }, 3.4);
            tl.to(state, { frame: FRAME_COUNT - 1, duration: 10, onUpdate: () => draw() }, 4);

            // top-left copy sets: lines stagger in, hold, then lift out
            COPY_SETS.forEach((_, s) => {
                const lines = gsap.utils.toArray<HTMLElement>(`.seq-set-${s} .seq-line`);
                const t = 4.3 + s * 3.2;
                tl.fromTo(
                    lines,
                    { opacity: 0, y: 28 },
                    { opacity: 1, y: 0, ease: "power2.out", duration: 0.6, stagger: 0.2 },
                    t,
                );
                tl.to(lines, { opacity: 0, y: -28, ease: "power2.in", duration: 0.5, stagger: 0.08 }, t + 2.3);
            });

            // bottom-right note: appears with first set, stays to the end
            tl.fromTo(
                ".seq-note",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, ease: "power2.out", duration: 0.8 },
                4.5,
            );

            // cursor parallax: each badge drifts by its own depth
            const floats = floatRefs.current.filter(Boolean) as HTMLDivElement[];
            const movers = floats.map((el, i) => {
                const depth = 18 + (i % 3) * 14;
                return {
                    depth,
                    x: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" }),
                    y: gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" }),
                };
            });
            const onMove = (e: MouseEvent) => {
                const nx = e.clientX / window.innerWidth - 0.5;
                const ny = e.clientY / window.innerHeight - 0.5;
                movers.forEach((m, i) => {
                    const dir = i % 2 === 0 ? 1 : -1;
                    m.x(nx * m.depth * 2 * dir);
                    m.y(ny * m.depth * 2 * dir);
                });
            };
            window.addEventListener("mousemove", onMove);
            cleanupMove = () => window.removeEventListener("mousemove", onMove);
        }, sectionRef);

        return () => {
            cancelled = true;
            window.removeEventListener("resize", resize);
            cleanupMove();
            ctxGsap.revert();
        };
    }, []);

    return (
        <div ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-white">
            <div ref={contentRef} className="absolute inset-0">
                <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                    <h1 className="text-primary text-4xl md:text-6xl tracking-tighter">
                        India&apos;s First <br />
                        Custom-Made Medical-Grade Skincare
                    </h1>
                    <p className="mt-4 max-w-3xl text-lg md:text-xl leading-tight tracking-tighter">
                        Every formulation is custom-built around your unique skin profile using
                        medical-grade actives, clinically backed, for results that last.
                    </p>
                </div>
                {BADGES.map((b, i) => (
                    <div
                        key={b.label}
                        ref={(el) => {
                            badgeRefs.current[i] = el;
                        }}
                        className={`absolute hidden md:block ${b.className}`}
                    >
                        <div
                            ref={(el) => {
                                floatRefs.current[i] = el;
                            }}
                            className="flex items-center gap-2"
                        >
                            <span className="rounded-full bg-[#eaf2f9] px-8 py-4 text-lg text-primary shadow-[0_4px_14px_rgba(0,71,99,0.12)]">
                                {b.label}
                            </span>
                            <span className="flex size-13 items-center justify-center rounded-full bg-[#eaf2f9] shadow-[0_4px_14px_rgba(0,71,99,0.12)]">
                                <Image src={`/icons/${b.icon}.png`} alt="" width={24} height={24} />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
            <div className="pointer-events-none absolute left-6 top-24 md:left-16 md:top-32">
                {COPY_SETS.map((lines, s) => (
                    <ul key={s} className={`seq-set-${s} absolute left-0 top-0 whitespace-nowrap`}>
                        {lines.map((line) => (
                            <li
                                key={line}
                                className="seq-line text-primary text-3xl leading-tight tracking-tighter opacity-0 md:text-5xl"
                            >
                                {line}
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
            <div className="seq-note pointer-events-none absolute bottom-8 right-6 max-w-sm text-right opacity-0 md:bottom-14 md:right-16 md:max-w-lg">
                <h3 className="text-primary text-2xl tracking-tighter md:text-4xl">Advanced Airless System</h3>
                <p className="mt-2 text-base leading-tight tracking-tight md:text-xl">
                    Twist the pump head or remove the safety lock before first use to activate the dispenser.
                </p>
            </div>
        </div>
    );
};

export default ScrollSequence;
