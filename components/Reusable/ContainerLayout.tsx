import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ContainerLayoutOwnProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  /** Master switch. Set false to strip all padding. */
  padding?: boolean;
  /** Left + right combo. */
  px?: boolean;
  /** Top + bottom combo. */
  py?: boolean;
  pt?: boolean;
  pb?: boolean;
  pl?: boolean;
  pr?: boolean;
};

type ContainerLayoutProps<T extends ElementType> = ContainerLayoutOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ContainerLayoutOwnProps<T>>;

const ContainerLayout = <T extends ElementType = "div">({
  as,
  children,
  className = "",
  padding = true,
  px = true,
  py = true,
  pt = true,
  pb = true,
  pl = true,
  pr = true,
  ...rest
}: ContainerLayoutProps<T>) => {
  const Component = as || "div";

  const paddingClasses = padding
    ? [
        px && pl && "pl-6 md:pl-12",
        px && pr && "pr-6 md:pr-12",
        py && pt && "pt-8 md:pt-12",
        py && pb && "pb-8 md:pb-12",
      ]
        .filter(Boolean)
        .join(" ")
    : "";

  return (
    <Component className={`${paddingClasses} ${className}`.trim()} {...rest}>
      {children}
    </Component>
  );
};

export default ContainerLayout;
