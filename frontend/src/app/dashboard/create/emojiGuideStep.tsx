import { H4 } from "@/primatives/typography";
import { cn } from "@/utils/cn";
import { useMemo } from "react";
import { EmojiSetupType } from "./client";

type EmojiGuideStepType = {
  emojiSetup: EmojiSetupType;
  setEmojiSetup: React.Dispatch<React.SetStateAction<EmojiSetupType>>;
  step: number;
  title: string;

  onClick?: () => void;
  onSecondClick?: () => void;
  optionOne?: string;
  optionTwo?: string;
  disabledOptionTwo?: boolean;
  isNew: boolean;
  children?: React.ReactNode;
  end?: boolean;
};

export function EmojiGuideStep({
  emojiSetup,
  setEmojiSetup,
  step,
  title,
  onClick,
  onSecondClick: onSecond,
  optionOne,
  optionTwo,
  disabledOptionTwo,
  isNew,
  end,
  children,
}: EmojiGuideStepType) {
  const updatedStep = useMemo(() => {
    return isNew ? step + 1 : step;
  }, [step, isNew]);
  return (
    <div
      style={{ zIndex: 100 - step }}
      className={cn(
        "w-full top-0 h-full bg-palette-secondary flex absolute flex-col items-center justify-center transition-all will-change-transform  ease-in-out duration-300 px-1 py-3",
        {
          "translate-x-0 opacity-100": emojiSetup.step === updatedStep,
          "-translate-x-full opacity-0":
            emojiSetup.step !== updatedStep && emojiSetup.step > updatedStep,
          "translate-x-full opacity-0":
            emojiSetup.step !== updatedStep &&
            emojiSetup.prevStep < updatedStep,
        }
      )}
    >
      <H4 className="text-palette-text font-bold text-center">{title}</H4>
      <span className="w-full h-fit flex flex-col items-center justify-center gap-2">
        {children}
      </span>
      {end ? (
        <input
          type="text"
          value={emojiSetup.emojiURL}
          onChange={(e) =>
            setEmojiSetup((prev) => ({
              ...prev,
              emojiURL: e.target.value,
            }))
          }
          placeholder="Link..."
          className="w-[90%] h-[40px] border-b-4 border-black/60 outline-none  bg-transparent  text-palette-text placeholder-palette-text mt-3"
        />
      ) : (
        <div className="w-full h-fit px-4 flex flex-col xl:flex-row items-center mt-auto justify-center gap-6 py-3">
          <button
            onClick={
              onClick ??
              (() =>
                setEmojiSetup((prev) => ({
                  ...prev,

                  prevStep: prev.step,
                  step: prev.step + 1,
                })))
            }
            className="w-full h-[50px] bg-green-400 flex flex-col items-center justify-center shadow-neo-brutalist-hover border-neo-brutalist border-black "
          >
            <H4 className="text-palette-text font-bold text-[14px]  xl:text-[20px]">
              {optionOne ?? "YES"}
            </H4>
          </button>
          {!disabledOptionTwo && (
            <button
              onClick={
                onSecond ??
                onClick ??
                (() =>
                  setEmojiSetup((prev) => ({
                    ...prev,

                    prevStep: prev.step,
                    step: prev.step + 1,
                  })))
              }
              className="w-full h-[50px] bg-red-400  flex flex-col items-center justify-center shadow-neo-brutalist-hover border-neo-brutalist border-black "
            >
              <H4 className="text-palette-text font-bold text-[14px] xl:text-[20px]">
                {optionTwo ?? "NO"}
              </H4>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
