import React from 'react';
import { gradients } from './DesignTokens';

export default function CompareBar({ items = [], onOpen, onRemove }) {
  if (!Array.isArray(items) || items.length < 2) return null;
  return (
    <div className="fixed bottom-[calc(60px+env(safe-area-inset-bottom))] left-0 right-0 z-40">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <div className="rounded-xl shadow-lg border bg-white/90 backdrop-blur p-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <strong>Compare ({items.length})</strong>
            <div className="flex items-center gap-2">
              {items.slice(0,3).map(p => (
                <button key={p._id || p.id} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-xs" onClick={() => onRemove?.(p)}>
                  × {p.projectName?.slice(0,18)}
                </button>
              ))}
            </div>
          </div>
          <button onClick={onOpen} className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300">
            View Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
