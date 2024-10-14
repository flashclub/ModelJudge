"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

export default function MermaidDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const chart = `
    %%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#007bff', 'primaryTextColor': '#000000', 'primaryBorderColor': '#007bff', 'lineColor': '#333333', 'secondaryColor': '#f8f9fa', 'tertiaryColor': '#f1f3f5', 'fontSize': '18px'}}}%%
    flowchart LR
      subgraph  
        A("开始") --> B("用户输入问题或任务描述")
        B --> C("选择三种AI模型进行测试")
        C --> D("模型1处理")
        C --> E("模型2处理")
        C --> F("模型3处理")
      end
      subgraph  
        D --> G("模型1回答")
        E --> H("模型2回答")
        F --> I("模型3回答")
        G & H & I --> J("评判模型<br>(第四个模型)评估")
      end
      subgraph  
        J --> L("生成评分和详细评价")
        L --> M("用户查看每个模型的<br>得分和评价")
        M --> N("用户选择最适合的模型")
        N --> O("结束")
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
