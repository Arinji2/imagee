import { H2, H3, H4 } from "@/primatives/typography";
import WidthWrapper from "@/wrappers/widthWrapper";
import Image from "next/image";
import Input from "./client";

export default function Page() {
  return (
    <div className="w-full min-h-[100svh] bg-palette-primary flex flex-col items-center justify-center py-2">
      <WidthWrapper>
        <div className="w-full h-fit flex flex-wrap xl:flex-nowrap flex-row items-start xl:items-stretch justify-center gap-8 ">
          <div className="w-full  gap-6 py-8 xl:py-4 flex flex-col items-center justify-start h-auto">
            <div className="w-full  h-full xl:w-[680px] rounded-neo-brutalist bg-palette-bg border-neo-brutalist border-black shadow-neo-brutalist flex flex-col items-stretch justify-center px-5 xl:px-[45px] py-[30px]">
              <div className="w-full h-full flex flex-col items-start justify-start gap-3">
                <H2 className="text-palette-text">You are almost done!</H2>
                <div className="w-full h-[1px] bg-palette-text"></div>
                <div className="pt-5 xl:pt-10 h-full flex flex-col items-start justify-start gap-3 ">
                  <H3 className="text-palette-text  text-left">
                    Enter your Display Name
                  </H3>
                  <H4 className="text-palette-text text-left">
                    This is the name that will be used to link to your emojis.
                  </H4>
                  <Input />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full xl:max-w-[441px] p-2 gap-4 xl:gap-12 xl:max-h-[80svh] h-fit flex group/parent xl:flex-col flex-row items-center justify-start overflow-hidden py-4  ">
            <EmojisContainer />
            <EmojisContainer disabled />
          </div>
        </div>
      </WidthWrapper>
    </div>
  );
}

function EmojisContainer({ disabled }: { disabled?: boolean }) {
  return (
    <>
      <div
        aria-hidden={disabled}
        className={`flex xl:flex-col  flex-row  xl:gap-12 group-hover/parent:pause  xl:animate-infinite-scroll-y animate-infinite-scroll-x items-center justify-start  gap-4`}
      >
        <Emoji src="pep-boss.svg" title="pepe-boss" />
        <Emoji src="pep-chips.svg" title="pepe-chips" />
        <Emoji src="pep-crazy.svg" title="pepe-crazy" />
        <Emoji src="pep-kms.svg" title="pepe-kms" />
        <Emoji src="pep-ok.png" title="pepe-ok" />
        <Emoji src="pep-shock.svg" title="pepe-shock" />
        <Emoji src="pep-yay.svg" title="pepe-yay" />
      </div>
    </>
  );
}

function Emoji({ src, title }: { src: string; title: string }) {
  return (
    <div className=" shrink-0  h-[120px] xl:h-[150px]  overflow-hidden xl:w-full w-[75vw] rounded-[5px]  bg-palette-accent flex flex-row items-center justify-center px-4 py-3 gap-[35px] border-neo-brutalist border-black shadow-neo-brutalist">
      <div className="xl:w-[125px] h-[90px] w-[100px] relative">
        <Image
          src={`/emojis/${src}`}
          sizes="(min-width: 768px) 125px, 100px "
          fill
          className="object-contain"
          alt={`${title} Emoji`}
        />
      </div>
      <H4 className="w-[150px] xl:w-[200px] font-bold text-palette-text h-fit text-center">
        {`"${title}"`}
      </H4>
    </div>
  );
}
