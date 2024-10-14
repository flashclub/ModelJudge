"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import ReactMarkdown from "react-markdown";
import { useTranslations } from "next-intl";

interface Model {
  id: string;
  object: string;
  created: number;
  owned_by: string;
}

interface ClientComponentProps {
  models: Model[];
}

export default function ClientComponent({ models }: ClientComponentProps) {
  const t = useTranslations("AllModel");
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState({ a: "", b: "", c: "", d: "" });
  const [loading, setLoading] = useState(false);
  const [deviceId, setDeviceId] = useState(uuidv4());
  const [selectedModela, setSelectedModela] = useState("");
  const [selectedModelb, setSelectedModelb] = useState("");
  const [selectedModelc, setSelectedModelc] = useState("");
  const [selectedModeld, setSelectedModeld] = useState(
    "Qwen/Qwen2.5-72B-Instruct"
  );
  const handleModelChange = (model: string, value: string) => {
    if (model === "a") {
      setSelectedModela(value);
    } else if (model === "b") {
      setSelectedModelb(value);
    } else if (model === "c") {
      setSelectedModelc(value);
    } else if (model === "d") {
      setSelectedModeld(value);
    }
    console.log("selectedModela", selectedModela);
    console.log("selectedModelb", selectedModelb);
    console.log("selectedModelc", selectedModelc);
  };

  const streamResponse = async (
    response: Response,
    key: keyof typeof answers
  ) => {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let partialResult = "";

    while (!done && reader) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      if (value) {
        const chunk = decoder.decode(value);
        partialResult += chunk;
        setAnswers((prev) => ({
          ...prev,
          [key]: partialResult,
        }));
      }
    }

    return partialResult;
  };
  const fetchOptions = (
    model: { modelIndex: string; name: string },
    system?: string
  ) => ({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
      model: model.name,
      modelIndex: model.modelIndex,
      system,
      id: deviceId,
    }),
  });
  const handleStart = async () => {
    if (!question) {
      alert(t("noQuestion"));
      return;
    }

    if (!selectedModela || !selectedModelb || !selectedModelc) {
      alert(t("noModel"));
      return;
    }
    setLoading(true);
    setAnswers({ a: "", b: "", c: "", d: "" });
    setDeviceId(uuidv4());
    try {
      const [responseA, responseB, responseC] = await Promise.all([
        fetch(
          "/api/all-model",
          fetchOptions({ modelIndex: "model_a", name: selectedModela })
        ),
        fetch(
          "/api/all-model",
          fetchOptions({ modelIndex: "model_b", name: selectedModelb })
        ),
        fetch(
          "/api/all-model",
          fetchOptions({ modelIndex: "model_c", name: selectedModelc })
        ),
      ]);

      const [resultA, resultB, resultC] = await Promise.all([
        streamResponse(responseA, "a"),
        streamResponse(responseB, "b"),
        streamResponse(responseC, "c"),
      ]);

      const updatedAnswers = { a: resultA, b: resultB, c: resultC, d: "" };
      console.log("answers all", updatedAnswers);

      await setD(updatedAnswers);
    } catch (error) {
      console.error("错误:", error);
    } finally {
      setLoading(false);
    }
  };
  const setD = async (currentAnswers: typeof answers) => {
    // console.log("currentAnswers", currentAnswers);

    const system = `
        你是一位以尖锐和挑衅风格著称的专业评论员。你的任务是查看大语言模型的回答，
        并根据这些回答点评。要尖锐和挑衅，稍微刻薄一点。不要让人感到尴尬。
        针对 ${question} 这个问题
        ${selectedModela} 的回答是：${currentAnswers.a}，

        ${selectedModelb} 的回答是：${currentAnswers.b}，

        ${selectedModelc} 的回答是：${currentAnswers.c}， 

        请你分别总结三个模型回答的内容
        并且指出他们回答的

        优点，缺点，得分（满分100），并给出最终的答案。
      `;
    console.log("system", system);
    const responseD = await fetch(
      "/api/all-model",
      fetchOptions({ modelIndex: "model_d", name: selectedModeld }, system)
    );
    await streamResponse(responseD, "d");
  };
  return (
    <div className="container mx-auto p-4 flex-1 overflow-auto flex flex-col">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <Textarea
          placeholder={t("inputQuestion")}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-grow"
          rows={4}
        />
        <Button onClick={handleStart} disabled={loading} className="md:w-24">
          {loading ? t("loading") : t("start")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow overflow-hidden">
        <Card className="relative overflow-y-auto">
          {["a", "b", "c"].map((model) => (
            <div key={model}>
              <div key={model} className="bg-white px-4 pt-4">
                <Select
                  value={
                    model === "a"
                      ? selectedModela
                      : model === "b"
                      ? selectedModelb
                      : selectedModelc
                  }
                  onValueChange={(value: string) =>
                    handleModelChange(model, value)
                  }
                >
                  <SelectTrigger className="mb-2">
                    <SelectValue placeholder={t("selectModel")} />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((modelItem) => (
                      <SelectItem key={modelItem.id} value={modelItem.id}>
                        {modelItem.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="sticky top-0 z-10">
                <h3 className=" bg-white font-bold p-4 py-2 ">
                  {t("contestModel")}
                  {model === "a"
                    ? selectedModela
                    : model === "b"
                    ? selectedModelb
                    : selectedModelc}
                </h3>
              </div>

              <div className="px-4 relative">
                <ReactMarkdown className="prose">
                  {answers[model as keyof typeof answers] || t("waitingAnswer")}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </Card>
        <Card className=" relative overflow-y-auto ">
          <div className="bg-white px-4 pt-4">
            <Select
              value={selectedModeld}
              onValueChange={(value: string) => handleModelChange("d", value)}
            >
              <SelectTrigger className="mb-2">
                <SelectValue placeholder={t("selectModel")} />
              </SelectTrigger>
              <SelectContent>
                {models.map((modelItem) => (
                  <SelectItem key={modelItem.id} value={modelItem.id}>
                    {modelItem.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="sticky top-0 z-10">
            <h3 className=" bg-white font-bold p-4 py-2">
              {t("aiJudge")} : {selectedModeld}
            </h3>
          </div>
          <div className="px-4 relative">
            <ReactMarkdown className="prose pb-4">
              {answers.d || t("waitingAnswer")}
            </ReactMarkdown>
          </div>
        </Card>
      </div>
    </div>
  );
}
