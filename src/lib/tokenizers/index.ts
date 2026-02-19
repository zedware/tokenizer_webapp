export * from './types';
export * from './openai';
export * from './huggingface';
export * from './natural';
export * from './gemini';

import { tokenizeWithOpenAI } from './openai';
import { tokenizeWithHuggingFace } from './huggingface';
import { tokenizeWithNatural } from './natural';
import { tokenizeWithGemini } from './gemini';
import { TokenizerResult, TokenizerType } from './types';

/**
 * Main tokenize function that delegates to the appropriate tokenizer
 */
export async function tokenize(
  text: string,
  tokenizerType: TokenizerType
): Promise<TokenizerResult> {
  if (tokenizerType.startsWith('openai-')) {
    return tokenizeWithOpenAI(text, tokenizerType);
  } else if (tokenizerType.startsWith('huggingface-')) {
    return tokenizeWithHuggingFace(text, tokenizerType);
  } else if (tokenizerType.startsWith('natural-')) {
    return tokenizeWithNatural(text, tokenizerType);
  } else if (tokenizerType === 'gemini') {
    return tokenizeWithGemini(text, tokenizerType);
  }

  throw new Error(`Unsupported tokenizer type: ${tokenizerType}`);
}