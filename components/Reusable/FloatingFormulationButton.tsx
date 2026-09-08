"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsRight } from "lucide-react";

const HIDDEN_ON = ["/free-skin-assesment", "/skin-assesment-result"];

const FloatingFormulationButton = () => {
  const pathname = usePathname();
  const ref = useRef<HTMLAnchorElement>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkBackground = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top - 4;

      const prevPointerEvents = el.style.pointerEvents;
      el.style.pointerEvents = "none";
      const target = document.elementFromPoint(x, y);
      el.style.pointerEvents = prevPointerEvents;

      const themedAncestor = target?.closest("[data-theme]");
      const theme = themedAncestor?.getAttribute("data-theme");
      setIsDark(theme === "dark");
    };

    checkBackground();

    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkBackground);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const textColor = isDark ? "text-white" : "text-primary";

  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <Link
      ref={ref}
      href="/free-skin-assesment"
      aria-label="Find Your Formulation"
      className={`fixed bottom-5 right-5 left-auto z-40 flex h-16 w-16 translate-x-0 items-center justify-center gap-6 overflow-hidden rounded-full bg-white/10 backdrop-blur-md border-t border-b border-white/80 shadow-[inset_-1px_-1px_4px_0_rgba(0,0,0,0.25)] transition-colors duration-300 ease-in-out hover:bg-white/15 min-[1200px]:bottom-6 min-[1200px]:left-1/2 min-[1200px]:right-auto min-[1200px]:h-20 min-[1200px]:w-[35%] min-[1200px]:-translate-x-1/2 min-[1200px]:justify-between min-[1200px]:pl-2 min-[1200px]:pr-8 ${textColor}`}
    >
      {/* compact icon-only badge — mobile & tablet */}
      <Image
        src="/assets/common/button-bottle.png"
        alt=""
        width={80}
        height={80}
        className="h-12 w-12 shrink-0 rounded-full min-[1200px]:hidden"
      />

      {/* full bar — desktop only */}
      <div className="hidden min-w-0 items-center gap-4 min-[1200px]:flex">
        <Image
          src="/assets/common/button-bottle.png"
          alt=""
          width={80}
          height={80}
          className="h-16 w-16 shrink-0 rounded-full"
        />
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-lg leading-tight">
            Start your journey
          </span>
          <span className="truncate text-2xl font-semibold leading-tight">
            to better skin
          </span>
        </span>
      </div>

      <div className="hidden shrink-0 items-center gap-3 min-[1200px]:flex">
        <span className="flex flex-col items-end leading-tight">
          <span className="text-sm font-obviously font-medium uppercase tracking-wide">
            Find Your
          </span>
          <span className="text-sm font-obviously font-bold uppercase tracking-wide">
            Formulation
          </span>
        </span>
        <ChevronsRight className="h-7 w-7 shrink-0" strokeWidth={2} />
      </div>
    </Link>
  );
};

export default FloatingFormulationButton;
