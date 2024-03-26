export default function WidthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="max-w-[1280px]  w-[90%] md:w-[calc(100%-120px)] h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
