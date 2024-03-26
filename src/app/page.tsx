import Button from "@/primatives/button";
import { ButtonText, H2, H4, Landing } from "@/primatives/typography";
import WidthWrapper from "@/wrappers/widthWrapper";
import { Play } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full min-h-[100svh] bg-palette-primary flex flex-col items-center justify-center py-2">
      <WidthWrapper>
        <div className="w-full h-fit flex flex-wrap md:flex-nowrap flex-row items-start md:items-center justify-center gap-8 ">
          <div className="w-full h-[100svh] gap-6 py-8 md:py-2 flex flex-col items-center justify-start md:h-full">
            <div className="w-full shrink-0 md:w-[680px] rounded-neo-brutalist h-[300px] md:h-[420px] bg-palette-bg border-neo-brutalist border-black shadow-neo-brutalist flex flex-col items-center justify-start px-5 md:px-[45px] py-[30px]">
              <div className="w-full h-fit flex flex-col items-start justify-start gap-3">
                <Landing className="text-palette-text">IMAGEE</Landing>
                <div className="w-fit h-fit flex flex-row items-center gap-2 justify-start">
                  <H4 className="text-palette-text font-bold">PRONOUNCED:</H4>
                  <H4 className="text-palette-text font-medium">IM-AEH-JEE</H4>
                </div>
              </div>
              <H4 className="mt-auto text-palette-text">
                When your Discord Nitro ends before your addiction to use custom
                emojis.
              </H4>
            </div>
            <div className="w-full h-fit flex flex-col items-center justify-center mt-auto gap-4">
              <Button className="flex flex-row items-center justify-between">
                <ButtonText className="  text-palette-text">
                  GET STARTED
                </ButtonText>
                <Play
                  size={40}
                  color="#292925"
                  className="group-hover:rotate-180 transition-transform ease-in-out duration-500 rotate-0"
                />
              </Button>

              <Button className="flex flex-row items-center justify-between hover:bg-palette-bg bg-palette-secondary">
                <ButtonText className="  text-palette-text">LOGIN</ButtonText>
                <Play
                  size={40}
                  color="#292925"
                  className="group-hover:rotate-180 transition-transform ease-in-out duration-500 rotate-0"
                />
              </Button>
            </div>
          </div>

          <div className="w-full md:max-w-[441px] p-2 gap-4 md:gap-0  h-fit flex group/parent md:flex-col flex-row items-center justify-start overflow-hidden py-4 ">
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
        className={` ${
          disabled ? "md:hidden  " : " "
        } flex md:flex-col  flex-row  md:gap-12 group-hover/parent:pause md:animate-none animate-infinite-scroll items-center justify-start  gap-4`}
      >
        <div className=" shrink-0  h-[120px] md:h-[180px]  overflow-hidden md:w-full w-[75vw] rounded-[5px]  bg-palette-bg flex flex-row items-center justify-center px-4 py-3 gap-[35px] border-neo-brutalist border-black shadow-neo-brutalist">
          <div className="md:w-[125px] h-[111px] w-[100px] relative">
            <Image
              src="/emojis/wat.png"
              sizes="(min-width: 768px) 125px, 100px "
              fill
              className="object-contain"
              alt="Wat Emoji"
            />
          </div>
          <H2 className="w-[150px] md:w-[200px] text-palette-text h-fit text-center">
            "wat"
          </H2>
        </div>
        <div className=" shrink-0   h-[120px] md:h-[180px]  md:w-full w-[75vw] rounded-[5px]  bg-palette-bg flex flex-row items-center justify-center px-4 py-3 gap-[35px] border-neo-brutalist border-black shadow-neo-brutalist">
          <div className="md:w-[125px] h-[111px] w-[100px] relative">
            <Image
              src="/emojis/lel.svg"
              sizes="(min-width: 768px) 125px, 100px "
              fill
              className="object-contain"
              alt="Lel Emoji"
            />
          </div>
          <H2 className="w-[150px] md:w-[200px] text-palette-text h-fit text-center">
            "lel"
          </H2>
        </div>
        <div className=" shrink-0  h-[120px] md:h-[180px]  md:w-full w-[75vw] rounded-[5px]  bg-palette-bg flex flex-row items-center justify-center px-4 py-3 gap-[35px] border-neo-brutalist border-black shadow-neo-brutalist">
          <div className="md:w-[125px] h-[111px] w-[100px] relative">
            <Image
              src="/emojis/mwah.svg"
              sizes="(min-width: 768px) 125px, 100px "
              fill
              className="object-contain"
              alt="Mwah Emoji"
            />
          </div>
          <H2 className="w-[150px] md:w-[200px] text-palette-text h-fit text-center">
            "mwah"
          </H2>
        </div>
      </div>
    </>
  );
}
