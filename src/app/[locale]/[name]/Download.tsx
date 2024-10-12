"use client";

import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import html2canvas from "html2canvas";
import { useEffect, useState } from "react";

export default function Download({ iframeId }: { iframeId: string }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
    if (iframe) {
      iframe.onload = () => setIframeLoaded(true);
    }
  }, [iframeId]);

  const download = async () => {
    const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      try {
        const canvas = await html2canvas(iframe.contentWindow.document.body);
        const dataUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "iframe_content.png";
        a.click();
      } catch (error) {
        console.error("下载图片时出错：", error);
      }
    } else {
      console.error("未找到指定的iframe或其内容");
    }
  };

  return (
    <div>
      <Button onClick={download} disabled={!iframeLoaded}>
        下载
        <DownloadIcon />
      </Button>
    </div>
  );
}
