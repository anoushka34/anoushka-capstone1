import { useState, type FormEvent } from 'react';
import "./AIAssistant.css";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

interface HistoryItem {
  prompt: string;
  answer: string;
}

// Converts basic **bold** markdown into JSX bold elements.
function renderWithBold(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

function AIAssistant() {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setResponse('');
    setError('');

    let fullText = '';
    let buffer = '';

    try {
      const res = await fetch(`${BACKEND_URL}/api/ai/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const errorBody = await res
          .json()
          .catch(() => ({ error: 'Unknown error' }));

        throw new Error(errorBody.error || `Server error: ${res.status}`);
      }

      if (!res.body) {
        throw new Error('Response body is empty.');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data:')) continue;

          const data = line.replace(/^data:\s*/, '').trim();

          if (!data) continue;

          try {
            const parsed = JSON.parse(data);
            const text =
              parsed?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (text) {
              fullText += text;
              setResponse(fullText);
            }
          } catch {
            // Ignore incomplete JSON chunks
          }
        }
      }

      setHistory((prev) =>
        [{ prompt, answer: fullText }, ...prev].slice(0, 3)
      );

      setPrompt('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-page">
      <div className="ai-container">
        <h1 className="ai-heading">AI Assistant</h1>
        <p className="ai-subheading">Ask a cooking question and get an instant answer</p>

        <form className="ai-form" onSubmit={handleSubmit}>
          <label className="form-label">Your Question</label>
          <textarea
            className="form-input ai-textarea"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask something..."
            disabled={isLoading}
          />

          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading || !prompt.trim()}
          >
            {isLoading ? 'Generating...' : 'Submit'}
          </button>
        </form>

        {error && <p className="ai-error">{error}</p>}

        {isLoading && !response && <p className="ai-loading">Gemini is thinking...</p>}

        {response && (
          <div className="ai-response-card">
            <span className="ai-response-tag">Answer</span>
            <p className="ai-response-text">{renderWithBold(response)}</p>
          </div>
        )}

        {history.length > 0 && (
          <div className="ai-history">
            <h2 className="ai-history-heading">Recent History</h2>
            <div className="ai-history-list">
              {history.map((h, i) => (
                <div key={i} className="ai-history-card">
                  <p className="ai-history-question">{h.prompt}</p>
                  <p className="ai-history-answer">{renderWithBold(h.answer)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIAssistant;