import { cn } from "@/utils/cn";
import { ClassValue } from "clsx";

export function Landing({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) {
  return (
    <h1 className={cn("text-[45px] xl:text-[90px] font-bold", className)}>
      {children}
    </h1>
  );
}
export function H1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) {
  return (
    <h1 className={cn("text-[33px] xl:text-[67px] font-bold", className)}>
      {children}
    </h1>
  );
}
export function H2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) {
  return (
    <h2 className={cn("text-[25px] xl:text-[50px] font-bold", className)}>
      {children}
    </h2>
  );
}
export function H3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) {
  return (
    <h3 className={cn(" text-[20px] xl:text-[37px] font-bold", className)}>
      {children}
    </h3>
  );
}
export function H4({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) {
  return (
    <h4 className={cn(" text-[18px] xl:text-[28px] font-medium", className)}>
      {children}
    </h4>
  );
}

export function P({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) {
  return <p className={cn("text-[16px] font-medium", className)}>{children}</p>;
}
export function ButtonText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) {
  return (
    <p className={cn("text-[20px] xl:text-[40px] font-bold ", className)}>
      {children}
    </p>
  );
}
