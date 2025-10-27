import React, { useState } from 'react';
import { useGemini } from '../contexts/GeminiContext';
import MarkdownRenderer from './MarkdownRenderer';
import { AiToolsIcon } from './Icons';

interface AiToolDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialPrompt: string;
}

const AiToolDialog: React.FC<AiToolDialogProps> = ({ isOpen, onClose, title, initialPrompt }) => {
  const { ai, error: initError } = useGemini();
  const [prompt, setPrompt] = useState(initialPrompt);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(initError);

  const handleGenerate = async () => {
    if (!prompt || isLoading || !ai) return;
    setIsLoading(true);
    setError(null);
    setResponse('');

    try {
      const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      setResponse(result.text);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={onClose}
    >
      <div 
        className="bg-card border border-border rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b border-border flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-primary"><AiToolsIcon /></div>
            <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">&times;</button>
        </header>
        
        <div className="p-6 flex-grow overflow-y-auto space-y-4">
          <div>
            <label htmlFor="ai-prompt" className="text-sm font-medium text-text-secondary mb-1 block">Your Prompt</label>
            <textarea
              id="ai-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
              className="w-full bg-background p-2 rounded-md border border-border focus:ring-primary focus:border-primary disabled:opacity-50"
              disabled={isLoading || !!initError}
            />
          </div>

          <div className="bg-background rounded-lg p-4 min-h-[150px] border border-border">
             <h3 className="text-sm font-medium text-text-secondary mb-2">AI Response</h3>
             {isLoading && (
                <div className="flex items-center justify-center h-full text-text-secondary">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <p className="ml-3">Generating...</p>
                </div>
             )}
             {error && <div className="p-3 bg-status-overdue/20 border border-status-overdue/50 rounded-lg text-red-300">Error: {error}</div>}
             {response && <MarkdownRenderer content={response} />}
             {!isLoading && !response && !error && <p className="text-text-secondary text-sm">The AI-generated response will appear here.</p>}
          </div>
        </div>

        <footer className="p-4 border-t border-border">
          <button
            onClick={handleGenerate}
            disabled={!prompt || isLoading || !!initError}
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : 'Generate Response'}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AiToolDialog;
