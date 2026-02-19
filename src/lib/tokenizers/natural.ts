import * as natural from 'natural';
import { TokenizerResult, Token, TokenizerType } from './types';

/**
 * Tokenize text using the natural library
 */
export async function tokenizeWithNatural(
  text: string,
  tokenizerType: TokenizerType
): Promise<TokenizerResult> {
  const startTime = performance.now();

  let tokens: string[] = [];

  switch (tokenizerType) {
    case 'natural-word':
      tokens = new natural.WordTokenizer().tokenize(text) || [];
      break;
    case 'natural-wordpunct':
      tokens = new natural.WordPunctTokenizer().tokenize(text) || [];
      break;
    case 'natural-treebank':
      tokens = new natural.TreebankWordTokenizer().tokenize(text) || [];
      break;
    default:
      throw new Error(`Unsupported natural tokenizer type: ${tokenizerType}`);
  }

  const endTime = performance.now();

  return {
    tokens: tokens.map((token, id) => ({
      id,
      text: token,
      value: token
    })),
    count: tokens.length,
    time: endTime - startTime
  };
}