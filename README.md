# Tokenizer Webapp

A web application to compare different tokenization methods from various AI providers including OpenAI, HuggingFace, Google Gemini, and traditional NLP tokenizers.

## Features

- Input text and see how different tokenizers process it
- Compare results across multiple tokenization algorithms
- View token IDs, text representations, and token values
- Support for multiple tokenizer providers:
  - OpenAI (cl100k, p50k, r50k)
  - Google Gemini
  - HuggingFace (BERT, GPT-2)
  - Natural.js (Word, WordPunct, Treebank)

## Development

```bash
# Install dependencies
npm install

# Create a .env file with your API keys (see .env.example)
cp .env.example .env

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment on Railway

This project is configured for easy deployment on [Railway](https://railway.app).

1. Fork this repository
2. Create a new project on Railway and connect it to your GitHub repository
3. Add the required environment variables:
   - `OPENAI_API_KEY` - Your OpenAI API key
   - `NEXT_PUBLIC_GEMINI_API_KEY` - Your Google Gemini API key
   - `HUGGINGFACE_API_TOKEN` - Your HuggingFace API token
4. Deploy the app

Railway will automatically build and deploy your application.

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- OpenAI API
- Google Generative AI API
- HuggingFace Tokenizers
- Natural.js

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## License

Apache 2.0