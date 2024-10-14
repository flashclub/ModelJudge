import { Suspense } from "react";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Brain,
  Clock,
  Zap,
  HelpCircle,
  Users,
  Target,
} from "lucide-react";

import MermaidDiagram from "@/components/MermaidDiagram";
const INTL_NAMESPACE = "AllModel";

const fetchAllModel = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.SILICONFLOW_KEY}`,
    },
  };

  const data = await fetch(
    "https://api.siliconflow.cn/v1/models?type=text&sub_type=chat",
    options
  )
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });

  return data;
};

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: INTL_NAMESPACE });
  return {
    title: t("title"),
    description: t("description"),
  };
};

export default async function AllModel({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: INTL_NAMESPACE });

  return (
    <Suspense
      fallback={<div className="text-center py-10 text-xl">{t("loading")}</div>}
    >
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <main className="flex-grow container mx-auto pt-20 px-4 py-8">
          <section className="text-center mb-16">
            <h1 className="text-3xl font-bold text-gray-800">
              {t("infoCard")}
            </h1>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {t("description")}
            </h2>
            <p className="text-xl text-gray-600 mb-8 mx-auto">
              模型判官是一款革命性的AI模型评测工具，帮助您快速找到最适合的AI模型。
            </p>
            <Link href={`${locale}/model-judge`}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                立即体验 <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              什么是模型判官
            </h2>
            <div className="bg-white rounded-lg shadow-md p-2">
              <div className="flex items-center mb-4 p-6">
                <HelpCircle className="h-8 w-8 text-blue-500 mr-4" />
                <p className="text-lg text-gray-700">
                  模型判官是一款测试模型的评测工具，旨在帮助用户快速找到最适合自己需求的模型。它通过对比多个AI模型的表现，为用户提供客观、全面的评估结果。
                </p>
              </div>
              <MermaidDiagram />
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              如何使用模型判官
            </h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-start mb-4">
                <Users className="h-8 w-8 text-green-500 mr-4 mt-1" />
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>输入任意问题或任务描述</li>
                  <li>从可用模型列表中选择三种不同的AI模型进行测试</li>
                  <li>等待所选的三种模型完成回答</li>
                  <li>
                    系统会自动调用第四种模型（评判模型）对三种模型的回答进行评估和打分
                  </li>
                  <li>查看评估结果，包括每个模型的得分和详细评价</li>
                  <li>基于评估结果，选择最适合您需求的模型</li>
                </ol>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-700 font-semibold">提示：</p>
                <p className="text-gray-600">
                  为获得最佳结果，请尽可能清晰、具体地描述您的问题或任务。这将帮助AI模型提供更准确、相关的回答。
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              为什么使用模型判官
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Brain className="h-12 w-12 text-blue-500" />}
                title="减少试错成本"
                description="随着AI的兴起，越来越多的模型涌现，用户在选择模型时往往无从下手。模型判官帮助您快速找到最适合自己需求的模型，节省宝贵的时间和资源。"
              />
              <FeatureCard
                icon={<Clock className="h-12 w-12 text-green-500" />}
                title="节省时间"
                description="在选择模型时，用户往往需要花费大量的时间去尝试不同的模型。模型判官让您一次性测试多个模型，快速获得结果，大大提高了选择效率。"
              />
              <FeatureCard
                icon={<Zap className="h-12 w-12 text-yellow-500" />}
                title="提高效率"
                description="模型判官支持一次使用多达4个模型，包括千问，DeepSeek，零义万物等几十个模型。只需轻点几下，便可马上获得全面的评估结果。"
              />
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              模型判官的评分标准
            </h2>
            <div className="flex items-start">
              <Target className="h-8 w-8 text-red-500 mr-4 mt-1" />
              <div>
                <p className="text-gray-700 mb-4">
                  模型判官的评分是基于多个维度进行综合评估，包括：
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li>准确性：模型提供的信息是否准确无误</li>
                  <li>相关性：模型的回答是否与问题紧密相关</li>
                  <li>逻辑性：模型的回答是否具有清晰的逻辑结构</li>
                  <li>创造性：模型是否能提供独特、创新的见解</li>
                  <li>完整性：模型的回答是否全面、详尽</li>
                  <li>实用性：模型的回答是否具有实际应用价值</li>
                </ul>
                <p className="text-gray-700">
                  这种全面的评估方法可以帮助您更好地了解每个模型的优势和局限性，从而做出明智的选择。当您在选择模型时，可以参考模型判官的评分和评价，选择最适合自己需求的模型。
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Suspense>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
