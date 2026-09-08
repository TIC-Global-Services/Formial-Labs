const StepHeading = ({
  eyebrow,
  title,
  subtitle,
  required = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  required?: boolean;
}) => {
  return (
    <div className="relative text-center">
      {eyebrow && (
        <p className="mb-2 font-obviously text-xs font-medium uppercase  text-primary/80">
          {eyebrow}
        </p>
      )}
      <h1 className="font-aeonik text-3xl leading-tight tracking-tighter text-primary sm:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-md text-lg text-[#525252]">
          {subtitle}
          {required && " *"}
        </p>
      )}
    </div>
  );
};

export default StepHeading;
