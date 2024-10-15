"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { useTranslations } from "next-intl";
export default function MermaidDiagram() {
  const t = useTranslations("MermaidDiagram");
  const ref = useRef<HTMLDivElement>(null);
  const chart = `
    %%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#007bff', 'primaryTextColor': '#000000', 'primaryBorderColor': '#007bff', 'lineColor': '#333333', 'secondaryColor': '#f8f9fa', 'tertiaryColor': '#f1f3f5', 'fontSize': '18px'}}}%%
    flowchart LR
      subgraph  
        A("${t("start")}") --> B("${t("question")}")
        B --> C("${t("selectModel")}")
        C --> D("${t("model1")}")
        C --> E("${t("model2")}")
        C --> F("${t("model3")}")
      end
      subgraph  
        D --> G("${t("model1Answer")}")
        E --> H("${t("model2Answer")}")
        F --> I("${t("model3Answer")}")
        G & H & I --> J("${t("judgeModel")}")
      end
      subgraph  
        J --> L("${t("generateScore")}")
        L --> M("${t("viewScore")}")
        M --> N("${t("selectBestModel")}")
        N --> O("${t("end")}")
      end

      classDef default fill:#f9f9f9,stroke:#333,stroke-width:2px,rx:10,ry:10
      classDef input fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,rx:10,ry:10
      classDef process fill:#fff3e0,stroke:#e65100,stroke-width:2px,rx:10,ry:10
      classDef output fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,rx:10,ry:10
      classDef model fill:#fce4ec,stroke:#c2185b,stroke-width:2px,rx:10,ry:10
      classDef decision fill:#fff8e1,stroke:#ffa000,stroke-width:2px,rx:10,ry:10

      class A,O default
      class B,M input
      class C,J,K process
      class L,N output
      class D,E,F,G,H,I model
  `;

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "base",
      securityLevel: "loose",
      flowchart: {
        curve: "basis",
        padding: 15,
        nodeSpacing: 30,
        rankSpacing: 20,
      },
    });

    if (ref.current) {
      mermaid.render("mermaid-svg", chart).then((result) => {
        if (ref.current) {
          ref.current.innerHTML = result.svg;

          // 获取 SVG 元素
          const svg = ref.current.querySelector("svg");
          if (svg) {
            // 移除 SVG 的宽度和高度属性，允许它自由缩放
            svg.removeAttribute("width");
            svg.removeAttribute("height");

            // 设置 viewBox 以保持比例
            const bbox = svg.getBBox();
            svg.setAttribute("viewBox", `0 0 ${bbox.width} ${bbox.height}`);

            // 添加保持宽高比的样式
            svg.style.width = "100%";
            svg.style.height = "auto";
            svg.style.maxWidth = "100%";
            svg.style.display = "block";
          }
        }
      });
    }
  }, [chart]);

  return (
    <div className="flex justify-center items-center p-2">
      <div
        ref={ref}
        className="mermaid-diagram w-full overflow-x-auto"
        style={{
          fontSize: "18px",
        }}
      >
        <style>
          {`
            .mermaid-diagram svg {
              font-size: 18px !important;
            }
            .mermaid-diagram .node rect,
            .mermaid-diagram .node circle,
            .mermaid-diagram .node ellipse,
            .mermaid-diagram .node polygon,
            .mermaid-diagram .node path {
              stroke-width: 2px;
            }
          `}
        </style>
      </div>
    </div>
  );
}
