
import React, { useState, useEffect } from 'react';
import { CopyIcon } from './icons/CopyIcon';

interface PromptOutputProps {
  prompt: string;
}

const PromptOutput: React.FC<PromptOutputProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  const tokenCount = Math.ceil(prompt.length / 4);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="bg-slate-850 rounded-lg shadow-lg">
      <div className="flex justify-between items-center p-4 border-b border-slate-700">
        <div>
          <h2 className="text-xl font-semibold text-white">Prompt Generado</h2>
          <p className="text-sm text-slate-400">
            Tokens estimados: <span className="font-medium text-sky-400">{tokenCount}</span>
          </p>
        </div>
        <button
          onClick={handleCopy}
          className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200 ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
          }`}
        >
          <CopyIcon className="w-4 h-4 mr-2" />
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
      <div className="p-4 max-h-[calc(100vh-220px)] overflow-y-auto">
        <pre className="text-sm text-slate-300 whitespace-pre-wrap bg-slate-900 p-4 rounded-md">
          <code>{prompt}</code>
        </pre>
      </div>
    </div>
  );
};

export default PromptOutput;
