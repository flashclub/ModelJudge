// 如果有数据库需求，请打开注释
import { OpenAIStream } from "@/lib/AIStream";
// import { createClient } from "@/lib/supabase";
import config from "@/config";

export const runtime = "edge";
export async function POST(req: Request) {
  const {
    question,
    model,
    modelIndex,
    system,
    id: deviceId,
  } = await req.json();
  // let supabase = null;
  // if (!config.database.supabaseUrl || !config.database.supabaseServiceKey) {
  //   // throw new Error("Missing Supabase URL or service key in configuration");
  // } else {
  //   supabase = createClient();
  // }

  const messages = [
    {
      role: "user",
      content: question,
    },
  ];
  if (system) {
    messages.unshift({
      role: "system",
      content: system,
    });
  }
  // console.log("messages: ", messages);
  let aiUrl = "https://api.siliconflow.cn/v1/chat/completions";
  const stream = await OpenAIStream({
    model,
    url: aiUrl,
    messages,
    apiKey: process.env.SILICONFLOW_KEY,
    callback: async (text) => {
      if (text) {
        // console.log("text: ", text);
        // console.log("model: ", model);
        // if (supabase) {
        //   const { data, error } = await supabase
        //     .from("prompt_all_model")
        //     .upsert(
        //       {
        //         question_id: deviceId,
        //         [modelIndex]: {
        //           name: model,
        //           response: text,
        //         },
        //         question,
        //       },
        //       { onConflict: "question_id" }
        //     );
        //   console.log("data: ", data);
        //   console.log("error: ", error);
        // }
      }
    },
  });
  return new Response(stream);
}
