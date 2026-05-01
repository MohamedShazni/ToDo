import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggled, onUpdated, onDeleted }) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-slate-400 font-medium">No tasks yet</p>
        <p className="text-slate-600 text-sm mt-1">Add your first task above to get started</p>
      </div>
    );
  }

  const pending   = todos.filter((t) => !t.done);
  const completed = todos.filter((t) => t.done);

  return (
    <div className="space-y-6">
      {/* Pending tasks */}
      {pending.length > 0 && (
        <section>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
            Pending · {pending.length}
          </h3>
          <div className="space-y-3">
            {pending.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggled={onToggled}
                onUpdated={onUpdated}
                onDeleted={onDeleted}
              />
            ))}
          </div>
        </section>
      )}

      {/* Completed tasks */}
      {completed.length > 0 && (
        <section>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
            Completed · {completed.length}
          </h3>
          <div className="space-y-3">
            {completed.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggled={onToggled}
                onUpdated={onUpdated}
                onDeleted={onDeleted}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
