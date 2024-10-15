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
            <Link href={`${locale}/model-judge`}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                {t("startNow")} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              {t("whatIsModelJudge")}
            </h2>
            <div className="bg-white rounded-lg shadow-md p-2">
              <div className="flex items-center p-6">
                <HelpCircle className="h-8 w-8 text-blue-500 mr-4" />
                <p className="text-lg text-gray-700">
                  {t("whatIsModelJudgeDesc")}
                </p>
              </div>
              <MermaidDiagram />
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              {t("howToUseModelJudge")}
            </h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-start mb-4">
                <Users className="h-8 w-8 text-green-500 mr-4 mt-1" />
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>{t("howToUseModelJudgeDesc1")}</li>
                  <li>{t("howToUseModelJudgeDesc2")}</li>
                  <li>{t("howToUseModelJudgeDesc3")}</li>
                  <li>{t("howToUseModelJudgeDesc4")}</li>
                  <li>{t("howToUseModelJudgeDesc5")}</li>
                  <li>{t("howToUseModelJudgeDesc6")}</li>
                </ol>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-700 font-semibold">{t("tip")}</p>
                <p className="text-gray-600">{t("tipDesc")}</p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              {t("whyUseModelJudge")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Brain className="h-12 w-12 text-blue-500" />}
                title={t("reduceTrialCost")}
                description={t("reduceTrialCostDesc")}
              />
              <FeatureCard
                icon={<Clock className="h-12 w-12 text-green-500" />}
                title={t("saveTime")}
                description={t("saveTimeDesc")}
              />
              <FeatureCard
                icon={<Zap className="h-12 w-12 text-yellow-500" />}
                title={t("improveEfficiency")}
                description={t("improveEfficiencyDesc")}
              />
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("modelJudgeStandard")}
            </h2>
            <div className="flex items-start">
              <Target className="h-8 w-8 text-red-500 mr-4 mt-1" />
              <div>
                <p className="text-gray-700 mb-4">
                  {t("modelJudgeStandardDesc")}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li>{t("modelJudgeStandardDesc1")}</li>
                  <li>{t("modelJudgeStandardDesc2")}</li>
                  <li>{t("modelJudgeStandardDesc3")}</li>
                  <li>{t("modelJudgeStandardDesc4")}</li>
                  <li>{t("modelJudgeStandardDesc5")}</li>
                  <li>{t("modelJudgeStandardDesc6")}</li>
                </ul>
                <p className="text-gray-700">{t("modelJudgeStandardDesc7")}</p>
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
