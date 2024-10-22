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
  // 从请求的cookie中读取API密钥
  const cookies = req.headers.get("cookie");
  let apiKey = "";
  if (cookies) {
    const apiKeyCookie = cookies
      .split(";")
      .find((cookie) => cookie.trim().startsWith("api_key="));
    if (apiKeyCookie) {
      apiKey = apiKeyCookie.split("=")[1].trim();
    }
  }

  // 如果cookie中没有API密钥，则使用环境变量中的密钥
  if (!apiKey) {
    apiKey = process.env.SILICONFLOW_KEY || "";
  }

  // 确保我们有一个有效的API密钥
  if (!apiKey) {
    throw new Error("未找到有效的API密钥");
  }
  console.log("apiKey: ", apiKey);
  // console.log("messages: ", messages);
  let aiUrl = "https://api.siliconflow.cn/v1/chat/completions";
  const stream = await OpenAIStream({
    model,
    url: aiUrl,
    messages,
    apiKey,
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
