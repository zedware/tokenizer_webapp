'use client';

import { useState } from 'react';
import Image from 'next/image';
import TokenizerSelector from '@/components/TokenizerSelector';
import TextInput from '@/components/TextInput';
import TokensDisplay from '@/components/TokensDisplay';
import { TokenizerType, TOKENIZERS } from '@/lib/tokenizers/types';
import { tokenizeText } from '@/lib/tokenize-client';
import { TokenizerResult } from '@/lib/tokenizers/types';

export default function Home() {
  const [text, setText] = useState('Transformer is a geat 变压器，楽しです！');
  const [selectedTokenizer, setSelectedTokenizer] = useState<TokenizerType>('openai-cl100k');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TokenizerResult | null>(null);

  const handleTokenize = async () => {
    if (!text.trim()) return;

    setLoading(true);

    try {
      const result = await tokenizeText(text, selectedTokenizer);
      setResult(result);
    } catch (error) {
      console.error('Error tokenizing:', error);
      // In a production app, we'd show a toast or error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tokenizer Webapp</h1>
          <p className="text-lg text-gray-600">
            Compare different tokenization methods from various AI providers
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="grid gap-8 md:grid-cols-5">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <label htmlFor="tokenizer" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Tokenizer
                  </label>
                  <TokenizerSelector
                    selectedTokenizer={selectedTokenizer}
                    onChange={setSelectedTokenizer}
                  />
                </div>

                <div>
                  <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-1">
                    Input Text
                  </label>
                  <TextInput
                    value={text}
                    onChange={setText}
                    disabled={loading}
                  />
                </div>

                <button
                  onClick={handleTokenize}
                  disabled={loading || !text.trim()}
                  className="w-full py-2.5 px-4 rounded-lg bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Tokenizing...' : 'Tokenize'}
                </button>
              </div>

              <div className="md:col-span-3">
                <h2 className="block text-sm font-medium text-gray-700 mb-1">
                  Results
                </h2>
                <TokensDisplay result={result} loading={loading} />
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Deploy on{' '}
            <a
              href="https://railway.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Railway.com
            </a>
            {' '}· Inspired by{' '}
            <a
              href="https://tiktokenizer.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              tiktokenizer
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
