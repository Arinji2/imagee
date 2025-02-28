import { H4, P } from "@/primatives/typography";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { EmojiSetupType } from "./client";
import { EmojiGuideStep } from "./emojiGuideStep";

export default function Emoji({
  emojiSetup,
  setEmojiSetup,
  isNew,
}: {
  emojiSetup: EmojiSetupType;
  setEmojiSetup: React.Dispatch<React.SetStateAction<EmojiSetupType>>;
  isNew: boolean;
}) {
  return (
    <div className="xl:w-[40%] w-full h-full  bg-palette-secondary  rounded-neo-brutalist border-neo-brutalist flex flex-col items-center justify-start  border-black">
      <div className="w-full h-[50px] flex flex-col items-center justify-center bg-palette-bg border-b-neo-brutalist border-black text-center">
        <H4 className="text-palette-text font-bold">
          Emoji Setup: Step {emojiSetup.step}
        </H4>
      </div>

      <div className="w-full h-[300px] xl:h-full flex flex-col items-center  justify-center overflow-hidden relative">
        {isNew && (
          <EmojiGuideStep
            title="This is a walkthrough of how to setup your emoji"
            emojiSetup={emojiSetup}
            isNew={isNew}
            setEmojiSetup={setEmojiSetup}
            step={0}
            optionOne="START"
            disabledOptionTwo
          />
        )}

        <EmojiGuideStep
          title="Do you have Nitro?"
          emojiSetup={emojiSetup}
          isNew={isNew}
          setEmojiSetup={setEmojiSetup}
          onClick={() => {
            setEmojiSetup((prev) => ({
              ...prev,
              hasNitro: true,
              prevStep: prev.step,
              step: prev.step + 1,
            }));
          }}
          onSecondClick={() => {
            setEmojiSetup((prev) => ({
              ...prev,
              hasNitro: false,
              prevStep: prev.step,
              step: prev.step + 1,
            }));
          }}
          step={1}
        />
        <EmojiGuideStep
          title="Open the Discord Bot"
          emojiSetup={emojiSetup}
          isNew={isNew}
          setEmojiSetup={setEmojiSetup}
          step={2}
          optionOne="DONE!"
          disabledOptionTwo
        >
          <Link
            target="_blank"
            className="text-palette-text font-bold underline"
            href="https://discord.com/users/1222044643810738258"
          >
            Discord Bot <ExternalLink size={16} className="inline mb-1" />
          </Link>
        </EmojiGuideStep>
        {isNew ? (
          <EmojiGuideStep
            title="Authorize the Bot"
            emojiSetup={emojiSetup}
            isNew={isNew}
            setEmojiSetup={setEmojiSetup}
            step={3}
            optionOne="DONE!"
            disabledOptionTwo
          >
            <P className="text-palette-text text-center">
              Click on the <span className="font-bold">Add App Button</span>{" "}
              then click <span className="font-bold">Try it Now</span>. Click on
              the <span className="font-bold">Authorize Button</span>. Finally
              click on the{" "}
              <span className="font-bold">Send Message Button</span>.
            </P>
          </EmojiGuideStep>
        ) : (
          <EmojiGuideStep
            title="Message the Bot"
            emojiSetup={emojiSetup}
            isNew={isNew}
            setEmojiSetup={setEmojiSetup}
            step={3}
            optionOne="DONE!"
            disabledOptionTwo
          >
            <P className="text-palette-text text-center">
              Click on the Send Message Button
            </P>
          </EmojiGuideStep>
        )}

        {emojiSetup.hasNitro ? (
          <EmojiGuideStep
            title="Get the Emoji"
            emojiSetup={emojiSetup}
            isNew={isNew}
            setEmojiSetup={setEmojiSetup}
            step={4}
            optionOne="GOT IT!"
            disabledOptionTwo
          >
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              <P className="text-palette-text text-center">
                Send your favorite emoji, prefixed with a \ to the bot
              </P>
              <code className="text-palette-text text-center text-lg  h-fit w-fit relative">
                \ <span className="absolute left-1">💀</span>
              </code>
              <P className=" text-palette-bg p-1 rounded-sm border-neo-brutalist border-black bg-red-500">
                Facing Errors?
              </P>
            </div>
          </EmojiGuideStep>
        ) : (
          <EmojiGuideStep
            title="Get the Emoji"
            emojiSetup={emojiSetup}
            isNew={isNew}
            setEmojiSetup={setEmojiSetup}
            step={4}
            optionOne="GOT IT!"
            disabledOptionTwo
          >
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <P className="text-palette-text text-center">
                Go to any server with your favorite custom emoji, prefixed with
                a \ send it to the server.
              </P>
              <code className="text-palette-text text-center text-lg   h-fit w-fit relative">
                \ <span className="absolute left-1">💀</span>
              </code>
              <P className="text-palette-text text-center">
                Copy the whole thing, including the {"<>"} and send it to the
                bot
              </P>
            </div>
          </EmojiGuideStep>
        )}

        <EmojiGuideStep
          title="Send us the link the bot gave you!"
          emojiSetup={emojiSetup}
          isNew={isNew}
          setEmojiSetup={setEmojiSetup}
          step={5}
          end
        />
      </div>
      {emojiSetup.step === 1 ? (
        <button
          onClick={() => {
            setEmojiSetup((prev) => ({
              ...prev,
              prevStep: 4,
              step: 5,
              hasNitro: true,
            }));
          }}
          className={`text-palette-text pb-2 text-md font-bold`}
        >
          SKIP
        </button>
      ) : (
        <button
          onClick={() => {
            setEmojiSetup((prev) => ({
              ...prev,
              prevStep: prev.step,
              step: prev.step - 1,
            }));
          }}
          className={`text-palette-text pb-2 text-md font-bold`}
        >
          BACK TO STEP {emojiSetup.step - 1}
        </button>
      )}
    </div>
  );
}
