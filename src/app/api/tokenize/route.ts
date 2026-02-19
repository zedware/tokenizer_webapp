import { NextRequest, NextResponse } from 'next/server';
import { tokenize, TokenizerType } from '@/lib/tokenizers';

export async function POST(request: NextRequest) {
  try {
    const { text, tokenizerType } = await request.json();

    if (!text || !tokenizerType) {
      return NextResponse.json(
        { error: 'Missing required parameters: text and tokenizerType' },
        { status: 400 }
      );
    }

    // Validate tokenizer type
    if (!isValidTokenizerType(tokenizerType)) {
      return NextResponse.json(
        { error: `Invalid tokenizer type: ${tokenizerType}` },
        { status: 400 }
      );
    }

    const result = await tokenize(text, tokenizerType as TokenizerType);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in tokenize API:', error);

    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

function isValidTokenizerType(type: string): boolean {
  const validTypes: TokenizerType[] = [
    'openai-cl100k',
    'openai-p50k',
    'openai-r50k',
    'gemini',
    'huggingface-bert',
    'huggingface-gpt2',
    'natural-word',
    'natural-wordpunct',
    'natural-treebank'
  ];

  return validTypes.includes(type as TokenizerType);
}