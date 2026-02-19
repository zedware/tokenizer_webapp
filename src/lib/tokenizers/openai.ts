import { encodingForModel, getEncoding } from 'js-tiktoken';
import { TokenizerResult, Token, TokenizerType } from './types';

/**
 * Tokenize text using OpenAI's tokenizers
 */
export async function tokenizeWithOpenAI(
  text: string,
  tokenizerType: TokenizerType
): Promise<TokenizerResult> {
  const startTime = performance.now();

  let encoding;

  try {
    switch (tokenizerType) {
      case 'openai-cl100k':
        encoding = getEncoding('cl100k_base');
        break;
      case 'openai-p50k':
        encoding = getEncoding('p50k_base');
        break;
      case 'openai-r50k':
        encoding = getEncoding('r50k_base');
        break;
      default:
        throw new Error(`Unsupported OpenAI tokenizer type: ${tokenizerType}`);
    }

    const encoded = encoding.encode(text);
    const tokens: Token[] = [];

    for (let i = 0; i < encoded.length; i++) {
      const id = encoded[i];
      const token = encoding.decode([id]);
      tokens.push({
        id,
        text: token,
        value: id
      });
    }

    const endTime = performance.now();

    return {
      tokens,
      count: tokens.length,
      time: endTime - startTime
    };
  } catch (error) {
    console.error('Error tokenizing with OpenAI:', error);
    throw error;
  }
}
