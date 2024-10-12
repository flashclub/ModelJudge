"use client";
export default function IFrame({ promptInfo }: { promptInfo: string }) {
  return (
    <iframe
      id="iframe"
      srcDoc={promptInfo}
      className="w-[450px] h-[900px] border-0"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
    />
  );
}
