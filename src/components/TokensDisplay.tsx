import { TokenizerResult, Token } from '@/lib/tokenizers/types';
import { useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface TokensDisplayProps {
  result: TokenizerResult | null;
  loading: boolean;
}

export default function TokensDisplay({ result, loading }: TokensDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the container when new tokens are added
  useEffect(() => {
    if (containerRef.current && result) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [result]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 border rounded-lg bg-gray-50">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-8 w-8 text-blue-500 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-gray-600">Tokenizing...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center h-64 border border-dashed rounded-lg bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500">Enter text and select a tokenizer to see results</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
        <div>
          <h3 className="font-medium">Tokenization Result</h3>
          <p className="text-sm text-gray-500">
            {result.count} {result.count === 1 ? 'token' : 'tokens'}
            {result.time && ` · ${result.time.toFixed(2)}ms`}
          </p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="overflow-auto max-h-[calc(100vh-24rem)]"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Token ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Token Text
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Token Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {result.tokens.map((token, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {token.id}
                </td>
                <td className="px-6 py-4 whitespace-pre-wrap text-sm font-mono">
                  <span className="bg-blue-100 px-1 py-0.5 rounded">
                    {token.text.replace(/\n/g, '⏎').replace(/\s/g, '␣')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {token.value !== undefined ? token.value : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}