import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const API = 'http://localhost:5000/api/todos';

export default function App() {
  const [todos,   setTodos]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  // Fetch all todos on mount
  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch(API);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load');
        setTodos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCreated = (todo)     => setTodos((prev) => [todo, ...prev]);
  const handleToggled = (updated)  => setTodos((prev) => prev.map((t) => t._id === updated._id ? updated : t));
  const handleUpdated = (updated)  => setTodos((prev) => prev.map((t) => t._id === updated._id ? updated : t));
  const handleDeleted = (id)       => setTodos((prev) => prev.filter((t) => t._id !== id));

  const total     = todos.length;
  const completed = todos.filter((t) => t.done).length;
  const progress  = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-base font-bold text-white tracking-tight">TaskFlow</span>
          </div>
          {total > 0 && (
            <span className="text-xs text-slate-400 font-medium">
              {completed}/{total} done
            </span>
          )}
        </div>

        {/* Progress bar */}
        {total > 0 && (
          <div className="h-0.5 bg-slate-800">
            <div
              className="h-full bg-brand-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </header>

      {/* Main */}
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">My Tasks</h1>
          <p className="text-slate-400 text-sm mt-1">Stay organised and get things done.</p>
        </div>

        {/* Create form */}
        <TodoForm onCreated={handleCreated} />

        {/* Error */}
        {error && (
          <div className="bg-red-950/40 border border-red-900 text-red-400 text-sm rounded-xl px-4 py-3">
            ⚠️ {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading ? (
          <div className="space-y-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-slate-900 rounded-2xl border border-slate-800" />
            ))}
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggled={handleToggled}
            onUpdated={handleUpdated}
            onDeleted={handleDeleted}
          />
        )}
      </main>
    </div>
  );
}
