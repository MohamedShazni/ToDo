import { useState } from 'react';

const API = 'http://localhost:5000/api/todos';

export default function TodoItem({ todo, onToggled, onUpdated, onDeleted }) {
  const [editing, setEditing]   = useState(false);
  const [toggling, setToggling] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Inline edit state
  const [editTitle, setEditTitle]   = useState(todo.title);
  const [editDesc,  setEditDesc]    = useState(todo.description || '');
  const [editError, setEditError]   = useState('');
  const [saving,    setSaving]      = useState(false);

  const handleToggle = async () => {
    setToggling(true);
    try {
      const res  = await fetch(`${API}/${todo._id}/done`, { method: 'PATCH' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      onToggled(data);
    } catch (err) {
      console.error(err);
    } finally {
      setToggling(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`${API}/${todo._id}`, { method: 'DELETE' });
      if (!res.ok) { const d = await res.json(); throw new Error(d.message); }
      onDeleted(todo._id);
    } catch (err) {
      console.error(err);
      setDeleting(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editTitle.trim()) { setEditError('Title is required'); return; }
    setEditError('');
    setSaving(true);
    try {
      const res  = await fetch(`${API}/${todo._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle.trim(), description: editDesc.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      onUpdated(data);
      setEditing(false);
    } catch (err) {
      setEditError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const formattedDate = new Date(todo.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <div
      className={`group bg-slate-900 border rounded-2xl p-5 shadow-lg transition-all duration-200 animate-fade-in
        ${todo.done
          ? 'border-slate-800 opacity-60'
          : 'border-slate-800 hover:border-brand-700 hover:shadow-brand-950/30'
        }`}
    >
      {editing ? (
        /* ── Inline Edit Form ── */
        <form onSubmit={handleSave} className="space-y-3">
          {editError && (
            <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
              {editError}
            </p>
          )}
          <input
            id={`edit-title-${todo._id}`}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
          />
          <textarea
            id={`edit-desc-${todo._id}`}
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            rows={2}
            placeholder="Description (optional)"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition resize-none"
          />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => { setEditing(false); setEditTitle(todo.title); setEditDesc(todo.description || ''); setEditError(''); }}
              className="px-3 py-1.5 text-xs font-medium text-slate-400 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 disabled:opacity-50 rounded-lg transition"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      ) : (
        /* ── Display Mode ── */
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <button
            id={`toggle-${todo._id}`}
            onClick={handleToggle}
            disabled={toggling}
            aria-label={todo.done ? 'Mark as undone' : 'Mark as done'}
            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
              ${todo.done
                ? 'bg-brand-600 border-brand-600'
                : 'border-slate-600 hover:border-brand-500'
              } disabled:opacity-50`}
          >
            {todo.done && (
              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium leading-snug ${todo.done ? 'line-through text-slate-500' : 'text-slate-100'}`}>
              {todo.title}
            </p>
            {todo.description && (
              <p className={`mt-1 text-xs leading-relaxed ${todo.done ? 'text-slate-600' : 'text-slate-400'}`}>
                {todo.description}
              </p>
            )}
            <p className="mt-2 text-[10px] text-slate-600">{formattedDate}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
            <button
              id={`edit-${todo._id}`}
              onClick={() => setEditing(true)}
              aria-label="Edit task"
              className="p-1.5 text-slate-400 hover:text-brand-400 hover:bg-slate-800 rounded-lg transition"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              id={`delete-${todo._id}`}
              onClick={handleDelete}
              disabled={deleting}
              aria-label="Delete task"
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition disabled:opacity-50"
            >
              {deleting ? (
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
