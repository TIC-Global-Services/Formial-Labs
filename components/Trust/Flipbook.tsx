"use client";

import { ComponentProps, useRef, useState } from "react";
import Image from "next/image";
import HTMLFlipBookImpl from "react-pageflip";

export type FlipbookSpread = {
  left: string;
  right: string;
  alt?: string;
};

// react-pageflip's shipped types mark every StPageFlip engine setting as a
// required prop, but the engine itself (page-flip) fills in real defaults
// for anything omitted. Relax that once here instead of hand-supplying the
// ~15 settings we don't customize.
const HTMLFlipBook = HTMLFlipBookImpl as unknown as React.ComponentType<
  Partial<ComponentProps<typeof HTMLFlipBookImpl>> & { children: React.ReactNode }
>;

type PageFlipRef = {
  pageFlip: () => { getCurrentPageIndex: () => number; getOrientation: () => "portrait" | "landscape" };
};

const BinderRings = ({ behindFlip }: { behindFlip: boolean }) => (
  <div
    className={`pointer-events-none absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 overflow-hidden sm:w-11 ${
      // The engine's own page layers sit at z-index 3-10 (startZIndex + 3..10)
      // internally, well below our rings' resting z-30 — so at rest the rings
      // correctly sit in front of the page edges. But that also means the
      // rings would always paint over a page mid-flip too. Duck below the
      // engine's max internal layer (10) for the duration of any flip so the
      // turning page passes in front of the spine instead of under it.
      behindFlip ? "z-2" : "z-30"
    }`}
  >
    {/* eslint-disable-next-line @next/next/no-img-element -- next/image's
    width-based srcset picks a source sized for this ~40px display width,
    but object-cover here scales by HEIGHT (a narrow strip against a tall
    portrait source), so that small width-matched source gets stretched
    ~10x vertically and turns to mush. Serve the native file instead. */}
    <img
      src="/assets/trust/book_ring.png"
      alt=""
      className="h-full w-full object-cover"
    />
  </div>
);

/**
 * A two-page-spread flipbook, turned by dragging (mouse or touch) or a tap
 * near a page corner — powered by react-pageflip (StPageFlip engine), which
 * also handles the responsive single-page-per-screen fallback on narrow
 * viewports (`usePortrait`). Each entry in `spreads` is a pre-designed
 * left/right page image; this component only adds the binder chrome.
 */
const Flipbook = ({ spreads }: { spreads: FlipbookSpread[] }) => {
  const bookRef = useRef<PageFlipRef>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const pages = spreads.flatMap((s) => [
    { src: s.left, alt: s.alt ?? "" },
    { src: s.right, alt: s.alt ?? "" },
  ]);

  return (
    <div className="w-full">
      <div className="relative mx-auto w-full max-w-6xl">
        <HTMLFlipBook
          ref={bookRef}
          width={560}
          height={723}
          size="stretch"
          minWidth={220}
          maxWidth={900}
          minHeight={280}
          maxHeight={1163}
          showCover={false}
          usePortrait
          mobileScrollSupport
          drawShadow
          className="overflow-hidden border border-primary/25 [&_.page-content]:h-full [&_.page-content]:w-full"
          onFlip={(e: { data: number }) => setPageIndex(e.data)}
          onChangeOrientation={(e: { data: "portrait" | "landscape" }) =>
            setIsPortrait(e.data === "portrait")
          }
          // `onChangeOrientation` only fires on a *change* — if the book loads
          // directly in portrait (narrow viewport on first paint) nothing
          // ever fires, so the rings stay stuck on. Read the real initial
          // orientation once the engine finishes initializing instead.
          onInit={() => setIsPortrait(bookRef.current?.pageFlip().getOrientation() === "portrait")}
          onChangeState={(e: { data: "user_fold" | "fold_corner" | "flipping" | "read" }) =>
            setIsFlipping(e.data !== "read")
          }
        >
          {pages.map((page, i) => (
            <div key={i} className="page-content relative overflow-hidden bg-[#f5f3ee]">
              <Image
                src={page.src}
                alt={page.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
                priority={i < 2}
              />
            </div>
          ))}
        </HTMLFlipBook>

        {!isPortrait && <BinderRings behindFlip={isFlipping} />}
      </div>

      <div className="mt-4 flex flex-col items-center gap-1 sm:mt-6">
        <p className="font-obviously text-xs text-primary/60 sm:text-sm">
          <span className="font-bold text-primary">
            {String(Math.floor(pageIndex / 2) + 1).padStart(2, "0")}
          </span>{" "}
          / {String(spreads.length).padStart(2, "0")}
        </p>
        <p className="text-xs text-primary/40">Drag or tap a page corner to turn it</p>
      </div>
    </div>
  );
};

export default Flipbook;
