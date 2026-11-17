"use client";
import { useState } from "react";
export function Share() {
  const [status, setStatus] = useState("");
  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url: location.href });
        setStatus("Shared.");
      } else {
        await navigator.clipboard.writeText(location.href);
        setStatus("Link copied.");
      }
    } catch {
      setStatus("Use your browser’s address bar to copy this link.");
    }
  }
  return (
    <div className="share">
      <button className="text-link" onClick={share}>
        Share this article ↗
      </button>
      <span role="status">{status}</span>
    </div>
  );
}
