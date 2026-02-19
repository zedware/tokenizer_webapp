import { TokenizerResult, Token, TokenizerType } from './types';
import * as HfTokenizers from '@huggingface/tokenizers';

/**
 * Tokenize text using HuggingFace tokenizers
 */
export async function tokenizeWithHuggingFace(
  text: string,
  tokenizerType: TokenizerType
): Promise<TokenizerResult> {
  const startTime = performance.now();

  let tokenizer;

  try {
    switch (tokenizerType) {
      case 'huggingface-bert':
        tokenizer = await HfTokenizers.Tokenizer.fromPretrained('bert-base-uncased');
        break;
      case 'huggingface-gpt2':
        tokenizer = await HfTokenizers.Tokenizer.fromPretrained('gpt2');
        break;
      default:
        throw new Error(`Unsupported HuggingFace tokenizer type: ${tokenizerType}`);
    }

    const encoded = await tokenizer.encode(text);
    const ids = encoded.getIds();
    const tokens: Token[] = [];

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const token = encoded.getTokens()[i];
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
    console.error('Error tokenizing with HuggingFace:', error);
    throw error;
  }
}
