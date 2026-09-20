"use client";

import { Key } from "@/shared/components/Key";
import { useCommandPalette } from "../hooks/useCommandPalette";

export function CommandPalette() {
  const {
    isOpen,
    query,
    setQuery,
    active,
    setActive,
    results,
    inputRef,
    close,
    select,
    onKeyDown,
  } = useCommandPalette();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-fg/15 px-4 pt-[18vh] backdrop-blur-[2px]"
      onClick={close}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-md rounded-lg border border-rule bg-bg"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Jump to…"
          aria-label="Search commands"
          aria-controls="cmdk-list"
          className="w-full border-b border-rule bg-transparent px-4 py-3 text-fg outline-none focus-visible:outline-none placeholder:text-faint"
        />
        <ul id="cmdk-list" role="listbox" className="max-h-72 overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-4 py-3 text-faint">No matches.</li>
          )}
          {results.map((item, i) => (
            <li key={item.label}>
              <button
                type="button"
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => select(i)}
                className={`flex w-full items-baseline justify-between rounded-md px-4 py-2 text-left ${
                  i === active ? "bg-rule/60 text-fg" : "text-muted"
                }`}
              >
                <span>{item.label}</span>
                {item.isKey ? (
                  <span className="flex items-center gap-x-2 text-faint">
                    press <Key>{item.hint}</Key>
                  </span>
                ) : (
                  <span className="text-faint">{item.hint}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
