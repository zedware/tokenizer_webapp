/**
 * Types for the tokenizer application
 */

export interface TokenizerResult {
  tokens: Token[];
  count: number;
  time?: number;
}

export interface Token {
  id: number;
  text: string;
  value?: string | number;
}

export type TokenizerType =
  | 'openai-cl100k'
  | 'openai-p50k'
  | 'openai-r50k'
  | 'gemini'
  | 'huggingface-bert'
  | 'huggingface-gpt2'
  | 'natural-word'
  | 'natural-wordpunct'
  | 'natural-treebank';

export interface TokenizerInfo {
  id: TokenizerType;
  name: string;
  description: string;
  provider: 'OpenAI' | 'Google' | 'HuggingFace' | 'Natural' | 'Other';
  modelFamily?: string;
}

export const TOKENIZERS: TokenizerInfo[] = [
  {
    id: 'openai-cl100k',
    name: 'OpenAI cl100k_base',
    description: 'Used for ChatGPT, GPT-3.5, GPT-4, and other modern OpenAI models',
    provider: 'OpenAI',
    modelFamily: 'GPT-4/3.5'
  },
  {
    id: 'openai-p50k',
    name: 'OpenAI p50k_base',
    description: 'Used for older GPT-3 models like Davinci',
    provider: 'OpenAI',
    modelFamily: 'GPT-3'
  },
  {
    id: 'openai-r50k',
    name: 'OpenAI r50k_base',
    description: 'Used for older GPT-3 models like Curie, Babbage, Ada',
    provider: 'OpenAI',
    modelFamily: 'GPT-3'
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Tokenizer for Google\'s Gemini models',
    provider: 'Google',
    modelFamily: 'Gemini'
  },
  {
    id: 'huggingface-bert',
    name: 'BERT Tokenizer',
    description: 'BertWordPieceTokenizer from HuggingFace',
    provider: 'HuggingFace',
    modelFamily: 'BERT'
  },
  {
    id: 'huggingface-gpt2',
    name: 'GPT-2 Tokenizer',
    description: 'GPT2 tokenizer from HuggingFace',
    provider: 'HuggingFace',
    modelFamily: 'GPT-2'
  },
  {
    id: 'natural-word',
    name: 'Word Tokenizer',
    description: 'Simple word tokenizer from natural library',
    provider: 'Natural',
  },
  {
    id: 'natural-wordpunct',
    name: 'WordPunct Tokenizer',
    description: 'Word and punctuation tokenizer from natural library',
    provider: 'Natural',
  },
  {
    id: 'natural-treebank',
    name: 'Treebank Tokenizer',
    description: 'Penn Treebank tokenization from natural library',
    provider: 'Natural',
  }
];