import { cn } from "@/lib/utils";

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
};

function H1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

function H2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}

function H3({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}

function H4({ children, className }: TypographyProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  );
}

function P({ children, className }: TypographyProps) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  );
}

function BlockQuote({ children }: TypographyProps) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  );
}

function List({ children }: TypographyProps) {
  return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>;
}

function Lead({ children }: TypographyProps) {
  return <p className="text-xl text-muted-foreground">{children}</p>;
}

function Large({ children }: TypographyProps) {
  return <p className="text-lg font-semibold">{children}</p>;
}

function Small({ children }: TypographyProps) {
  return <p className="text-sm font-medium leading-none">{children}</p>;
}

function Muted({ children }: TypographyProps) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

const Typography = {
  H1,
  H2,
  H3,
  H4,
  P,
  BlockQuote,
  List,
  Lead,
  Large,
  Small,
  Muted,
};

export default Typography;
