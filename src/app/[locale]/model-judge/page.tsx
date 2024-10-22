import { Suspense } from "react";
import ClientComponent from "@/components/ClientComponent";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import InputApiKey from "./InputApiKey";
import { cookies } from "next/headers";
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
  // console.log("所有模型", data);

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
    <div className="flex flex-col container p-4 mx-auto max-h-[calc(100vh-0px)] overflow-auto">
      <div className="flex space-y-2  flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">{t("infoCard")}</h1>
        <div className="text-xl text-gray-500">{t("description")}</div>
        <div>
          由于访问量激增，如遇到评分服务无法访问，请稍后再试。或输入自己密钥使用。
          （您的密钥不会被记录）。免费申请密钥请访问：
          <a
            href="https://cloud.siliconflow.cn/i/h5JiyFm0"
            className="text-blue-600 hover:underline"
          >
            SiliconCloud
          </a>
          &nbsp;&nbsp;
          <InputApiKey cookies={cookies()} />
        </div>
      </div>

      <ClientComponent models={data.data} />
    </div>
  );
}
