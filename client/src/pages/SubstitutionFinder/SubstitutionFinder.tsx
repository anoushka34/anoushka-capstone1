import { useState, type FormEvent } from 'react';
import "./SubstitutionFinder.css";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

interface HistoryItem {
  ingredient: string;
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

function SubstitutionFinder() {
  const [ingredient, setIngredient] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!ingredient.trim() || isLoading) return;

    setIsLoading(true);
    setResponse('');
    setError('');

    const prompt = `I don't have "${ingredient.trim()}" for a recipe. Suggest 3 common substitutes, each with a one-sentence explanation of how it changes the result.`;

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
        [{ ingredient, answer: fullText }, ...prev].slice(0, 3)
      );

      setIngredient('');
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
    <div className="sub-page">
      <div className="sub-container">
        <h1 className="sub-heading">Ingredient Substitution Finder</h1>
        <p className="sub-subheading">Missing an ingredient? Get quick, sensible substitutes</p>

        <form className="sub-form" onSubmit={handleSubmit}>
          <label className="form-label">Ingredient</label>
          <input
            className="form-input"
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="e.g. buttermilk, cilantro, brown sugar..."
            disabled={isLoading}
          />

          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading || !ingredient.trim()}
          >
            {isLoading ? 'Finding substitutes...' : 'Find Substitutes'}
          </button>
        </form>

        {error && <p className="sub-error">{error}</p>}

        {isLoading && !response && <p className="sub-loading">Gemini is thinking...</p>}

        {response && (
          <div className="sub-response-card">
            <span className="sub-response-tag">Substitutes</span>
            <p className="sub-response-text">{renderWithBold(response)}</p>
          </div>
        )}

        {history.length > 0 && (
          <div className="sub-history">
            <h2 className="sub-history-heading">Recent Searches</h2>
            <div className="sub-history-list">
              {history.map((h, i) => (
                <div key={i} className="sub-history-card">
                  <p className="sub-history-question">{h.ingredient}</p>
                  <p className="sub-history-answer">{renderWithBold(h.answer)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubstitutionFinder;