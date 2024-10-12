"use client";
import { useEffect } from "react";
export default function RenderCard({
  promptInfo,
  iframeId,
  className,
}: {
  promptInfo: string;
  iframeId: string;
  className?: string;
}) {
  return (
    <div>
      <iframe
        id={iframeId}
        srcDoc={promptInfo}
        className={`w-full md:w-[450px] min-h-[900px] border-0 ${className}`}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
      />
    </div>
  );
}
