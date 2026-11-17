import { ButtonLink } from "@/components/ui";
export default function NotFound() {
  return (
    <div className="container error-page">
      <span className="eyebrow">404 / AN UNWRITTEN PAGE</span>
      <h1>Not here. Yet.</h1>
      <p>This page may have moved, or the idea is still taking shape.</p>
      <ButtonLink href="/">Return home</ButtonLink>
    </div>
  );
}
