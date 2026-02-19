import { TokenizerResult, Token, TokenizerType } from './types';
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Tokenize text using Google's Gemini tokenizer
 * Note: The Gemini API doesn't directly expose tokenization, so we'll use a count estimation
 */
export async function tokenizeWithGemini(
  text: string,
  tokenizerType: TokenizerType
): Promise<TokenizerResult> {
  const startTime = performance.now();

  try {
    // Replace with your actual API key from environment variable
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

    if (!apiKey) {
      throw new Error('Gemini API key not found. Set NEXT_PUBLIC_GEMINI_API_KEY environment variable.');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Use countTokens method if available
    const result = await model.countTokens(text);

    // Since Gemini API doesn't provide individual tokens, we'll simulate them
    // by splitting the text into words and adjusting the count
    const words = text.split(/\s+/);
    const ratio = result.totalTokens / words.length;

    const tokens: Token[] = [];
    let tokenId = 0;

    // Create approximate tokens based on words
    for (const word of words) {
      // Adjust number of tokens per word based on the ratio
      const tokensPerWord = Math.max(1, Math.round(word.length / 4));

      for (let i = 0; i < tokensPerWord; i++) {
        const start = Math.floor((word.length * i) / tokensPerWord);
        const end = Math.floor((word.length * (i + 1)) / tokensPerWord);
        const tokenText = word.substring(start, end);

        if (tokenText) {
          tokens.push({
            id: tokenId++,
            text: tokenText,
            value: tokenId
          });
        }
      }
    }

    // Adjust token count to match the reported count
    const realTokenCount = result.totalTokens;

    const endTime = performance.now();

    return {
      tokens: tokens.slice(0, realTokenCount),
      count: realTokenCount,
      time: endTime - startTime
    };
  } catch (error) {
    console.error('Error tokenizing with Gemini:', error);
    throw error;
  }
}
