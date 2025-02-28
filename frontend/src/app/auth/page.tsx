import { H1 } from "@/primatives/typography";
import WidthWrapper from "@/wrappers/widthWrapper";
import { DiscordButton, GithubButton, GoogleButton } from "./buttons";

export default function Page() {
  return (
    <div className="w-full min-h-[100svh] bg-palette-primary flex flex-col items-center justify-center py-2 ">
      <WidthWrapper>
        <div className="bg-palette-bg p-4 rounded-neo-brutalist shadow-neo-brutalist border-neo-brutalist border-black ">
          <H1 className="text-palette-text text-center">
            Authenticate With IMAGEE
          </H1>
        </div>
        <div className="w-full h-fit flex flex-col items-center justify-center gap-6 pt-10">
          <GoogleButton />
          <DiscordButton />

          <GithubButton />
        </div>
      </WidthWrapper>
    </div>
  );
}
