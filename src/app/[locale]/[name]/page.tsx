import { useTranslations } from "next-intl";
import Head from "next/head";

export default function Thinker() {
  const t = useTranslations("Thinker");
  return (
    <div>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </Head>
      <main>
        <h1>{t("title")}</h1>
        <p>{t("description")}</p>
        <p>
          你来到了一个不毛之地，这里什么都没有，只有你一个人。
          人类已经灭绝，你成为了最后一个活着的人类。
          你感到孤独，感到绝望，感到无助。人类从哪里来，要到哪里去？
          你希望了解人类的历史，人类的文明，人类的科技，人类的未来。
          你希望了解宇宙的起源，宇宙的演化，宇宙的未来。
          你希望了解生命的起源，生命的演化，生命的未来。
          你希望弄清楚这一切的答案。
          所以，在这里，你想获取所有答案，现在，开始吧。
        </p>
      </main>
    </div>
  );
}
