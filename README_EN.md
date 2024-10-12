[简体中文](https://github.com/flashclub/ModelJudge)
This project is derived from [AwesomePrompt](https://awesomeprompt.net/zh/all-model), thanks to [SiliconCloud](https://cloud.siliconflow.cn/i/h5JiyFm0) for providing free API services. Currently, registration comes with 20 million free tokens.

# Model Judge 🧑‍⚖️

Welcome to the Model Judge project! This is an AI model evaluation platform built with Next.js.
Input a question, select three models to generate answers, and let a fourth model provide scores and a final answer! 🚀
Online experience: [Model Judge](https://modeljudge.vercel.app/)

## Features ✨

- Multi-model comparison: Compare answers from multiple AI models simultaneously 🤖🆚🤖
- Real-time streaming responses: Get AI answers quickly without waiting ⚡
- Internationalization: Supports Chinese and English interfaces 🌍
- Responsive design: Perfect display on various devices 📱💻
- User authentication: Supports Google and GitHub login 🔐

## Quick Start 🏁

1. Clone the project:

```bash
git clone git@github.com:flashclub/ModelJudge.git
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add your SiliconCloud API Key:

```bash
SILICONFLOW_KEY=your_api_key
```

4. Run the development server:

```bash
npm run dev
```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to see the project in action!

## Tech Stack 🛠️

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [next-intl](https://next-intl-docs.vercel.app/) - Internationalization solution
- [NextAuth.js](https://next-auth.js.org/) - Authentication library (optional)
- [Supabase](https://supabase.com/) - Backend database (optional)

## Project Structure 📁

```bash
src/
├── app/ # Main application directory
├── components/ # React components
├── config/ # Configuration files
├── context/ # React Context
├── lib/ # Utility functions
└── messages/ # Internationalization texts
```

## Contribution Guidelines 🤝

We welcome any form of contribution! If you have good ideas or find bugs, please feel free to open an issue or submit a pull request.

## Acknowledgements

1. Thanks to [SiliconCloud](https://cloud.siliconflow.cn/i/h5JiyFm0).

## License 📄

This project is licensed under the MIT License. For more details, please see the [LICENSE](LICENSE) file.

Let's build a better AI model evaluation platform together! 🎉
