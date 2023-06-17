import type { RequestHandler } from "./$types";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";
// Importing from $env namespace to prevent import error
import { OPENAI_KEY } from "$env/static/private";

// OpenAI configuration
const config = new Configuration({
  apiKey: OPENAI_KEY
});

const openai = new OpenAIApi(config);

export const POST: RequestHandler = async ({ request }) => {
  // Give AI the context of the chat
  const { messages } = await request.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    // Send response in chunks
    stream: true,
    messages
  });

  // Vercel AI SDK - converts response to stream
  const stream = OpenAIStream(response);
  /*const stream = OpenAIStream(await response, {
    // Running callbacks as the stream is being processed
    onStart: async () => {
      await savePromptToDatabaseFunction(prompt);
    },
    onToken: async (token: string) => {
      console.log(token);
    },
    onCompletion: async (completion: string) => {
      await saveCompletionToDatabaseFunction(completion);
    }
  });*/

  // Return stream
  return new StreamingTextResponse(stream);
};
