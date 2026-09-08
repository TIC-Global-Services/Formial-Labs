const ProgressBar = ({ step, total }: { step: number; total: number }) => {
  const percent = Math.round(((step + 1) / total) * 100);

  return (
    <div className="flex items-center gap-4">
      <div className="h-1 flex-1 bg-primary/10">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="w-10 shrink-0 text-right text-xs text-[#525252]">{percent}%</span>
    </div>
  );
};

export default ProgressBar;
