import {
  ActivityType,
  Client,
  DMChannel,
  GatewayIntentBits,
  Partials,
} from "discord.js";
import dotenv from "dotenv";
dotenv.config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel, Partials.Message],
  presence: {
    status: "online",
    activities: [
      {
        name: "DM me a Custom Emoji to get started!",
        type: ActivityType.Playing,
        url: "https://imagee.arinji.com",
      },
    ],
  },
});

client.on("ready", () => {
  console.log(`Discord Bot is Online`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel instanceof DMChannel) {
    if (message.content.indexOf(":") === -1) {
      await message.channel.send(
        `Hiya, use this link to continue with your Imagee Setup:  https://cdn.discordapp.com/emojis/${message.content}.webp. Don't know what's going on? Check out our FAQ: https://imagee.arinji.com/faq?emoji `
      );

      return;
    }

    const emojiIdRegex = /<:[a-zA-Z0-9_]+:(\d+)>/;
    const match = message.content.match(emojiIdRegex);

    if (match) {
      const emojiId = match[1];

      await message.channel.send(
        `Hiya, use this link to continue with your Imagee Setup:  https://cdn.discordapp.com/emojis/${emojiId}.webp. Don't know what's going on? Check out our FAQ: https://imagee.arinji.com/faq?emoji `
      );
    } else {
      await message.channel.send(
        `It seems as if you didn't send me a Custom Emoji, have questions? Check out our FAQ: https://imagee.arinji.com/faq?emoji`
      );
    }
  }
});

client.login(process.env.TOKEN!);
