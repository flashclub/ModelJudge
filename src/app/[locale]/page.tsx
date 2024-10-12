import { Suspense } from "react";
import ClientComponent from "@/components/ClientComponent";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

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
  console.log("所有模型", data);
  // 筛选出问答模

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
  const data = await fetchAllModel();

  console.log("api data--", data);
  return (
    <Suspense fallback={<div>{t("loading")}</div>}>
      <div className="flex flex-col container p-4 mx-auto max-h-[calc(100vh-0px)] overflow-auto">
        <div className="flex space-y-2  flex-col justify-center items-center">
          <h1 className="text-2xl font-bold">{t("infoCard")}</h1>
          <div className="text-xl text-gray-500">{t("description")}</div>
        </div>
        <ClientComponent models={data.data} />
      </div>
    </Suspense>
  );
}
