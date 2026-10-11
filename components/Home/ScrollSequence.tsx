"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BADGES = [
    { label: "Precise", icon: "precise", className: "left-[6%] top-[22%] md:left-[44%] md:top-[19%]", from: { x: 0, y: 30 } },
    { label: "Confident", icon: "confident", className: "right-[6%] top-[29%] md:left-[13%] md:right-auto md:top-[30%]", from: { x: -40, y: 20 } },
    { label: "Clear", icon: "clear", className: "left-[6%] top-[66%] md:left-auto md:right-[13%] md:top-[30%]", from: { x: 40, y: 20 } },
    { label: "One of a kind", icon: "kind", className: "right-[6%] top-[73%] md:right-[17%] md:top-[68%]", from: { x: 40, y: -20 } },
    { label: "Expert", icon: "expert", className: "left-[6%] top-[80%] md:left-[30%] md:top-[74%]", from: { x: -40, y: -20 } },
];

const COPY_SETS = [
    ["Made only for you", "pH balanced", "Proprietary technology", "Gold standard ingredients"],
    ["Precision delivered", "Medical-grade", "Evidence-based"],
    ["World-class", "Advanced science", "Innovative formulations"],
];

const ScrollSequence = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
    const floatRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !sectionRef.current) return;

        // block user scroll while the video plays
        const block = (e: Event) => e.preventDefault();
        const blockKeys = (e: KeyboardEvent) => {
            if ([" ", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "End", "Home"].includes(e.key)) e.preventDefault();
        };
        const lock = () => {
            window.addEventListener("wheel", block, { passive: false });
            window.addEventListener("touchmove", block, { passive: false });
            window.addEventListener("keydown", blockKeys);
        };
        const unlock = () => {
            window.removeEventListener("wheel", block);
            window.removeEventListener("touchmove", block);
            window.removeEventListener("keydown", blockKeys);
        };

        let raf = 0;
        let played = false;
        let playing = false;
        let cleanupMove = () => {};

        const ctxGsap = gsap.context(() => {
            const badges = badgeRefs.current.filter(Boolean) as HTMLDivElement[];
            gsap.set(video, { opacity: 0 });
            badges.forEach((el, i) => gsap.set(el, { opacity: 0, scale: 0.7, ...BADGES[i].from }));

            // text timeline (units 0-10), driven by video.currentTime
            const textTl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
            textTl.to({}, { duration: 10 }, 0);
            COPY_SETS.forEach((_, s) => {
                const lines = gsap.utils.toArray<HTMLElement>(`.seq-set-${s} .seq-line`);
                const t = 0.3 + s * 3.2;
                textTl.fromTo(
                    lines,
                    { opacity: 0, y: 28 },
                    { opacity: 1, y: 0, ease: "power2.out", duration: 0.6, stagger: 0.2 },
                    t,
                );
                textTl.to(lines, { opacity: 0, y: -28, ease: "power2.in", duration: 0.5, stagger: 0.08 }, t + 2.3);
            });
            textTl.fromTo(
                ".seq-note",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, ease: "power2.out", duration: 0.8 },
                0.5,
            );

            const tick = () => {
                if (video.duration) textTl.progress(Math.min(video.currentTime / video.duration, 1));
                if (playing) raf = requestAnimationFrame(tick);
            };

            const finish = () => {
                playing = false;
                cancelAnimationFrame(raf);
                textTl.progress(1);
                unlock();
            };

            const reset = () => {
                played = false;
                playing = false;
                cancelAnimationFrame(raf);
                unlock();
                video.pause();
                video.currentTime = 0;
                textTl.progress(0);
                gsap.to(video, { opacity: 0, duration: 0.3, overwrite: true });
            };

            const start = () => {
                if (played) return;
                played = true;
                playing = true;
                lock();
                gsap.to(video, { opacity: 1, duration: 0.6, overwrite: true });
                video.currentTime = 0;
                video.play().then(
                    () => {
                        raf = requestAnimationFrame(tick);
                    },
                    finish,
                );
            };
            video.onended = finish;
            video.onerror = finish;

            // intro (scrubbed): badges in 0-1, hold 1-3, fade out 3-4
            const tl = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=400%",
                    pin: true,
                    scrub: 0.5,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        if (self.progress >= 0.8 && self.direction > 0) start();
                        else if (self.progress < 0.7 && played) reset();
                    },
                    onLeave: (self) => {
                        // fast scroll overshoot: pull back to the end and play
                        if (!played) {
                            window.scrollTo(0, self.start + (self.end - self.start) * 0.85);
                            start();
                        }
                    },
                },
            });
            tl.to(badges, { opacity: 1, scale: 1, x: 0, y: 0, ease: "power2.out", duration: 1 }, 0);
            tl.to(contentRef.current, { opacity: 0, scale: 0.95, duration: 1 }, 3);
            tl.to({}, { duration: 1 }, 4); // pinned buffer: video starts at 4/5 progress

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
            cancelAnimationFrame(raf);
            unlock();
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
                        className={`absolute ${b.className}`}
                    >
                        <div
                            ref={(el) => {
                                floatRefs.current[i] = el;
                            }}
                            className="flex items-center gap-2"
                        >
                            <span className="rounded-full bg-[#eaf2f9] px-4 py-2 text-sm text-primary md:px-8 md:py-4 md:text-lg shadow-[0_4px_14px_rgba(0,71,99,0.12)]">
                                {b.label}
                            </span>
                            <span className="flex size-9 items-center md:size-13 justify-center rounded-full bg-[#eaf2f9] shadow-[0_4px_14px_rgba(0,71,99,0.12)]">
                                <Image src={`/icons/${b.icon}.png`} alt="" width={24} height={24} className="size-4 md:size-6" />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                muted
                playsInline
                preload="auto"
            >
                <source src="/videos/seq.webm" type="video/webm" />
                <source src="/videos/seq.mp4" type="video/mp4" />
            </video>
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
            <div className="seq-note pointer-events-none absolute bottom-8 left-6 right-6 max-w-sm text-left opacity-0 md:bottom-14 md:left-auto md:right-16 md:max-w-lg md:text-right">
                <h3 className="text-primary text-2xl tracking-tighter md:text-4xl">Advanced Airless System</h3>
                <p className="mt-2 text-base leading-tight tracking-tight md:text-xl">
                    Twist the pump head or remove the safety lock before first use to activate the dispenser.
                </p>
            </div>
        </div>
    );
};

export default ScrollSequence;
