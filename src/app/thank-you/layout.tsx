// Passthrough layout — the page itself handles full-screen coverage via
// position:fixed so it visually overrides the root layout's nav and dot grid.
export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
