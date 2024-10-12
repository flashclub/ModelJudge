[English](https://github.com/flashclub/blob/main/README_EN.md)

本项目抽离于 [AwesomePrompt](https://awesomeprompt.net/zh/all-model)，感谢 [SiliconCloud](https://cloud.siliconflow.cn/i/h5JiyFm0) 提供的免费 API 服务。目前注册即送 2000 万 token。

# 模型判官 🧑‍⚖️

欢迎来到模型判官项目! 这是一个基于 Next.js 构建的 AI 模型评估平台。
输入问题选择三个模型，生成回答，由第四个模型给出评分和最终回答! 🚀
在线体验：[模型判官](https://modeljudge.vercel.app/)

## 项目特色 ✨

- 多模型对比: 同时对比多个 AI 模型的回答 🤖🆚🤖
- 实时流式响应: 快速获取 AI 的回答,无需等待 ⚡
- 国际化支持: 支持中文和英文界面 🌍
- 响应式设计: 在各种设备上都能完美展示 📱💻
- 用户认证: 支持 Google 和 GitHub 登录 🔐

## 快速开始 🏁

1. 克隆项目:

```bash
git clone git@github.com:flashclub/ModelJudge.git
```

2. 安装依赖:

```bash
npm install
```

3. 创建 `.env` 文件，并填入 SiliconCloud API Key:

```bash
SILICONFLOW_KEY=your_api_key
```

4. 运行开发服务器:

```bash
npm run dev
```

5. 打开浏览器访问 [http://localhost:3000](http://localhost:3000) 即可看到项目运行效果!

## 技术栈 🛠️

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - 样式框架
- [next-intl](https://next-intl-docs.vercel.app/) - 国际化解决方案
- [NextAuth.js](https://next-auth.js.org/) - 认证库（可选）
- [Supabase](https://supabase.com/) - 后端数据库（可选）

## 项目结构 📁

```bash
src/
├── app/ # 应用主目录
├── components/ # React 组件
├── config/ # 配置文件
├── context/ # React Context
├── lib/ # 工具函数
└── messages/ # 国际化文本
```

## 贡献指南 🤝

我们欢迎任何形式的贡献! 如果你有好的想法或发现了 bug,请随时提出 issue 或发起 pull request。

## 致谢

1. 感谢 [SiliconCloud](https://cloud.siliconflow.cn/i/h5JiyFm0)。

## 许可证 📄

本项目采用 MIT 许可证。详情请查看 [LICENSE](LICENSE) 文件。

让我们一起打造更棒的 AI 模型评估平台吧! 🎉
