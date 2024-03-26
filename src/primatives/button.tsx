import { cn } from "@/utils/cn";
import { ReactNode } from "react";

export default function Button({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
  props?: React.HTMLProps<HTMLButtonElement>;
}) {
  return (
    <button
      className={cn`px-5 transition-all ease-in-out duration-200 hover:shadow-neo-brutalist-hover  hover:bg-palette-secondary group xl:px-[45px] py-[10px] w-full h-fit bg-palette-bg xl:w-[680px] border-[4px] border-black shadow-neo-brutalist rounded-neo-brutalist  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
