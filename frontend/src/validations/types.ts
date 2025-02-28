import z from "zod";
import { EmojiSchema } from "./schema";
export type EmojiSchemaType = z.infer<typeof EmojiSchema>;
