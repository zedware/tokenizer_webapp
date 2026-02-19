import { TokenizerResult, TokenizerType } from './tokenizers/types';

/**
 * Client-side function to call the tokenize API
 */
export async function tokenizeText(
  text: string,
  tokenizerType: TokenizerType
): Promise<TokenizerResult> {
  try {
    const response = await fetch('/api/tokenize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        tokenizerType,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to tokenize text');
    }

    return await response.json();
  } catch (error: any) {
    console.error('Error tokenizing text:', error);
    throw error;
  }
}