"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import { TransitionRouter } from "next-transition-router";
import gsap from "gsap";

/**
 * Same path structure at every keyframe: `M 0 {anchor} V {bulge} Q 50 {control} 100 {bulge} V {anchor} z`.
 * Only bulge/control move, so it can be tweened as plain numbers instead of needing
 * the (paid) MorphSVGPlugin — this reproduces that plugin's output for this shape exactly.
 */
const wavePath = (anchor: number, bulge: number, control: number) =>
  `M 0 ${anchor} V ${bulge} Q 50 ${control} 100 ${bulge} V ${anchor} z`;

const PageTransition = ({ children }: { children: ReactNode }) => {
  const pathRef = useRef<SVGPathElement>(null);

  // Set the initial `d` imperatively, once, before paint. It must never be a
  // JSX-reconciled prop — a re-render mid-animation would reset it and stomp
  // GSAP's direct DOM writes.
  useLayoutEffect(() => {
    pathRef.current?.setAttribute("d", wavePath(100, 100, 100));
  }, []);

  return (
    <TransitionRouter
      auto
      leave={(next) => {
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
      {children}
    </TransitionRouter>
  );
};

export default PageTransition;
