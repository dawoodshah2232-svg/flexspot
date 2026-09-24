import { Component } from 'react';

// Catches render crashes (e.g. a code-split chunk that failed to load after
// a deploy) and shows a friendly reload card instead of a dead black page.
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('UI crash caught:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="pt-[92px] pb-24 px-4">
          <div className="max-w-md mx-auto text-center rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8 mt-10 shadow-[var(--shadow-card)]">
            <div className="text-5xl mb-4">🛠️</div>
            <h2 className="font-display font-bold text-xl text-[var(--ink)]">Something glitched</h2>
            <p className="text-sm text-[var(--ink-2)] mt-2">
              This page failed to load. A quick reload usually fixes it.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary px-6 py-3 mt-5"
            >
              ↻ Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
