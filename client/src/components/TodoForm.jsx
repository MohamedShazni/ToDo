import { useState } from 'react';

const API = 'http://localhost:5000/api/todos';

export default function TodoForm({ onCreated, editTodo, onUpdated, onCancel }) {
  const isEditing = Boolean(editTodo);

  const [title, setTitle]       = useState(editTodo?.title || '');
  const [description, setDesc]  = useState(editTodo?.description || '');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) { setError('Title is required'); return; }
    setError('');
    setLoading(true);

    try {
      const url    = isEditing ? `${API}/${editTodo._id}` : API;
      const method = isEditing ? 'PUT' : 'POST';

      const res  = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), description: description.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Request failed');

      if (isEditing) { onUpdated(data); }
      else           { onCreated(data); setTitle(''); setDesc(''); }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl animate-slide-down"
    >
      <h2 className="text-lg font-semibold text-slate-100 mb-4">
        {isEditing ? '✏️ Edit Task' : '➕ New Task'}
      </h2>

      {error && (
        <p className="mb-3 text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="space-y-3">
        <div>
          <label htmlFor="todo-title" className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">
            Title <span className="text-brand-400">*</span>
          </label>
          <input
            id="todo-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label htmlFor="todo-desc" className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">
            Description <span className="text-slate-600">(optional)</span>
          </label>
          <textarea
            id="todo-desc"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Add more details..."
            rows={3}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition resize-none"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2 justify-end">
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-400 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition shadow-lg shadow-brand-900/40"
        >
          {loading ? (isEditing ? 'Saving…' : 'Adding…') : (isEditing ? 'Save Changes' : 'Add Task')}
        </button>
      </div>
    </form>
  );
}
