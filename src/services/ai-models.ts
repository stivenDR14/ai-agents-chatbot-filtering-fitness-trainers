import { ChatMistralAI } from "@langchain/mistralai";
import { env } from "app/config/env";

export const modelLargeMistral = (temperature: number) =>
  new ChatMistralAI({
    model: "mistral-large",
    endpoint: env.MISTRAL_LARGE_ENDPOINT,
    apiKey: env.MISTRAL_LARGE_KEY,
    temperature: temperature,
    callbacks: [
      {
        /* handleLLMEnd(output) {
          console.log("handleLLMEnd", JSON.stringify(output, null, 2));
        }, */
      },
    ],
  });
