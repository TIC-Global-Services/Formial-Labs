import type { ReactNode } from "react";

const  StepHeading = ({
  eyebrow,
  title,
  subtitle,
  required = true,
  wide = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  required?: boolean;
  wide?: boolean;
}) => { 
  return (
    <div className="relative text-center">
      {eyebrow && (
        <p className="mb-2 font-obviously text-xs font-medium uppercase   text-primary/80">
          {eyebrow}
        </p>
      )}
      <h1 className={`font-aeonik text-2xl leading-tight tracking-tighter text-primary sm:text-4xl mx-auto ${wide ? "max-w-4xl" : "max-w-2xl"}`}>
        {title}
      </h1>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-md text-sm md:text-lg leading-tight text-[#525252]">
          {subtitle}
          {required && " *"}
        </p>
      )}
    </div>
  );
};

export default StepHeading;
