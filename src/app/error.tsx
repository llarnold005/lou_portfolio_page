"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container error-page">
      <h1>A pause in the process.</h1>
      <p>Something prevented this page from loading. Please try again.</p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
