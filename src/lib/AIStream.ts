import { createParser } from "eventsource-parser";
import { OpenAIError } from "./errors";

export const OpenAIStream = async ({
  model,
  url,
  messages,
  apiKey,
  callback,
}: {
  model: string;
  url: string;
  messages: any[];
  apiKey?: string;
  callback?: (allText: string) => void | Promise<void>;
}) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey || process.env.SILICONFLOW_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({ model, messages, stream: true }),
  });

  if (!res.ok) {
    await handleErrorResponse(res);
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const textChunks: string[] = [];

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = createParseHandler(controller, encoder, textChunks);
      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }

      // 流结束时，执行回调函数
      const allText = textChunks.join("");
      try {
        if (callback) {
          await Promise.resolve(callback(allText));
        }
      } catch (error) {
        console.error("Error in stream end callback:", error);
      }

      controller.close();
    },
  });

  return stream;
};

const createParseHandler =
  (
    controller: ReadableStreamDefaultController,
    encoder: TextEncoder,
    textChunks: string[]
  ) =>
  (event: any) => {
    if (event.type === "event") {
      const data = event.data;
      if (data === "[DONE]") return;

      try {
        const json = JSON.parse(data);
        // console.log("aiStream json", json);
        if (json.choices[0].finish_reason != null) return;

        const text = json.choices[0].delta.content;
        textChunks.push(text);
        controller.enqueue(encoder.encode(text));
      } catch (e) {
        controller.error(e);
      }
    }
  };

const handleErrorResponse = async (res: Response) => {
  const result = await res.json();
  if (result.error) {
    throw new OpenAIError(
      result.error.message,
      result.error.type,
      result.error.param,
      result.error.code
    );
  } else {
    throw new Error(`API returned an error: ${result.statusText}`);
  }
};
