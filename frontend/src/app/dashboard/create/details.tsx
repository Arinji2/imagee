import { H4, P } from "@/primatives/typography";
import { SetStateAction } from "react";
import { LinkType } from "./client";

export default function Details({
  name,
  setName,
  link,
  setLink,
}: {
  name: string;
  setName: React.Dispatch<SetStateAction<string>>;
  link: LinkType;
  setLink: React.Dispatch<SetStateAction<LinkType>>;
}) {
  return (
    <div className="xl:w-[60%] w-full h-full  flex flex-col items-stretch justify-start gap-6">
      <div className="w-full h-fit flex flex-col items-start justify-start bg-palette-primary/50 p-2 rounded-neo-brutalist  border-neo-brutalist border-black leading-tight ">
        <H4 className="text-palette-text font-bold">Name:</H4>
        <P className="text-palette-text font-semibold">
          The name for your emoji, this will be displayed on the site.
        </P>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name..."
          className="w-full h-[40px] border-b-4 border-black/60 outline-none  bg-transparent  text-palette-text placeholder-palette-text mt-3"
        />
      </div>
      <div className="w-full h-fit flex  flex-col items-start justify-start bg-palette-accent p-2 rounded-neo-brutalist  border-neo-brutalist border-black leading-tight ">
        <H4 className="text-palette-text font-bold">Link:</H4>
        <P className="text-palette-text font-semibold">
          The link for your emoji
        </P>
        <div className="w-full h-fit flex flex-col xl:flex-row items-center justify-center gap-6 pr-4 pt-3">
          <button
            onClick={() => {
              setLink((prev) => ({ ...prev, withUsername: true }));
            }}
            className={`${
              link.withUsername
                ? " shadow-neo-brutalist-hover "
                : " shadow-transparent "
            }w-full h-[70px] transition-shadow ease-in-out duration-150 bg-palette-primary flex flex-col items-center justify-center  border-neo-brutalist border-black `}
          >
            <H4 className="text-palette-text font-bold text-[14px] xl:text-[20px]">
              Prefixed
            </H4>
            <P className="text-palette-text text-center text-[12px]">
              Use with username, no minimum length
            </P>
          </button>
          <button
            onClick={() => {
              setLink((prev) => ({ ...prev, withUsername: false }));
            }}
            className={`${
              !link.withUsername
                ? " shadow-neo-brutalist-hover "
                : " shadow-transparent "
            }w-full h-[70px] transition-shadow ease-in-out duration-150 bg-palette-bg flex flex-col items-center justify-center  border-neo-brutalist border-black `}
          >
            <H4 className="text-palette-text font-bold text-[14px] xl:text-[20px]">
              Not Prefixed
            </H4>
            <P className="text-palette-text text-center text-[12px]">
              Use without username, minimum length of 3
            </P>
          </button>
        </div>
        <div className="w-full h-[40px] border-b-4 border-black/60 outline-none  bg-transparent  text-palette-text placeholder-palette-text mt-3 ">
          <input
            type="text"
            onChange={(e) =>
              setLink((prev) => ({ ...prev, value: e.target.value }))
            }
            placeholder="Link..."
            value={link.value}
            className="w-full h-[40px] bg-transparent outline-none placeholder-palette-text "
          />
        </div>
      </div>
    </div>
  );
}
