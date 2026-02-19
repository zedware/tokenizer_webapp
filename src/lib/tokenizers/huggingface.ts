import { TokenizerResult, Token, TokenizerType } from './types';
import { AutoTokenizer } from '@huggingface/transformers'; // <-- Updated package

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
        tokenizer = await AutoTokenizer.from_pretrained('bert-base-uncased');
        break;
      case 'huggingface-gpt2':
        tokenizer = await AutoTokenizer.from_pretrained('gpt2');
        break;
      default:
        throw new Error(`Unsupported HuggingFace tokenizer type: ${tokenizerType}`);
    }

    // 1. Invoke the tokenizer to get the token IDs 
    const { input_ids } = tokenizer(text);
	const ids = Array.from(input_ids.data, Number);

    // 2. Use the built-in method to map IDs back to their exact literal subword strings.
    // (We use a fallback check because the method's location varies slightly between v2 and v3 of the library)
    const rawTokens = tokenizer.model?.convert_ids_to_tokens 
      ? tokenizer.model.convert_ids_to_tokens(ids) 
      : tokenizer.convert_ids_to_tokens(ids);

    const tokens: Token[] = [];

    // 3. Map the IDs to your Token array structure
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      
      // Fallback to decode if the id somehow isn't in the raw tokens map
      const tokenText = rawTokens[i] ?? tokenizer.decode([id]);

      tokens.push({
        id,
        text: tokenText,
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
