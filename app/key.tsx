/** Keyboard key cap. Shared by the footer hint and the command palette. */
export function Key({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-rule px-1.5 py-0.5 text-[12px] text-muted">
      {children}
    </kbd>
  );
}
