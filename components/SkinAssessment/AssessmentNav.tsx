"use client";

import { ChevronsLeft, ChevronsRight } from "lucide-react";

const AssessmentNav = ({
  onBack,
  onNext,
  backDisabled,
  nextDisabled,
  nextLabel = "Next",
}: {
  onBack: () => void;
  onNext: () => void;
  backDisabled?: boolean;
  nextDisabled?: boolean;
  nextLabel?: string;
}) => {
  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={onBack}
        disabled={backDisabled}
        aria-label="Back"
        className="flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full border-t border-b border-white/80 bg-white/20 text-primary shadow-[inset_-1px_-1px_4px_0_rgba(0,0,0,0.1)] backdrop-blur-md transition-colors duration-300 ease-in-out hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronsLeft size={18} strokeWidth={2} />
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="flex cursor-pointer items-center gap-2 rounded-full border-t border-b border-white/80 bg-white/20 px-8 py-4 font-obviously text-[12px] font-bold uppercase tracking-widest text-primary shadow-[inset_-1px_-1px_4px_0_rgba(0,0,0,0.1)] backdrop-blur-md transition-colors duration-300 ease-in-out hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-30"
      >
        {nextLabel}
        <ChevronsRight size={18} strokeWidth={2} />
      </button>
    </div>
  );
};

export default AssessmentNav;
