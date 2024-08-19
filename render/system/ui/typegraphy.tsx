import { cn } from "@/lib/utils";
import { FC } from "react";

type TypographyProps = {
  className?: string;
  children: React.ReactNode;
};

export const Heading1: FC<TypographyProps> = ({ className, children }) => (
  <h1
    className={cn(
      "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      className,
    )}
  >
    {children}
  </h1>
);

export const Heading2: FC<TypographyProps> = ({ className, children }) => (
  <h2
    className={cn(
      "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 [&:not(:first-child)]:mt-10",
      className,
    )}
  >
    {children}
  </h2>
);

export const Heading3: FC<TypographyProps> = ({ className, children }) => (
  <h3
    className={cn(
      "scroll-m-20 text-2xl font-semibold tracking-tight [&:not(:first-child)]:mt-8",
      className,
    )}
  >
    {children}
  </h3>
);

export const Heading4: FC<TypographyProps> = ({ className, children }) => (
  <h4
    className={cn(
      "scroll-m-20 text-xl font-semibold tracking-tight [&:not(:first-child)]:mt-8",
      className,
    )}
  >
    {children}
  </h4>
);

export const Paragraph: FC<TypographyProps> = ({ className, children }) => (
  <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
    {children}
  </p>
);

export const Blockquote: FC<TypographyProps> = ({ className, children }) => (
  <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
    {children}
  </blockquote>
);

export const List: FC<TypographyProps> = ({ className, children }) => (
  <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>
    {children}
  </ul>
);

export const InlineCode: FC<TypographyProps> = ({ className, children }) => (
  <code className={cn("rounded bg-muted p-1", className)}>{children}</code>
);

export const Lead: FC<TypographyProps> = ({ className, children }) => (
  <p className={cn("text-lg font-semibold", className)}>{children}</p>
);

export const Large: FC<TypographyProps> = ({ className, children }) => (
  <p className={cn("text-xl", className)}>{children}</p>
);

export const Small: FC<TypographyProps> = ({ className, children }) => (
  <p className={cn("text-sm", className)}>{children}</p>
);

export const Muted: FC<TypographyProps> = ({ className, children }) => (
  <p className={cn("text-gray-500", className)}>{children}</p>
);
