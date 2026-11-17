"use client";
import { useEffect, useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { ArrowRight, Play, Pause, RotateCcw } from "lucide-react";
import { architecture } from "@/lib/site";
export function ArchitectureExplorer() {
  const [selected, setSelected] = useState(0),
    [technical, setTechnical] = useState(false),
    [playing, setPlaying] = useState(false),
    [eventStage, setEventStage] = useState<number | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!playing || reduced) return;
    const timer = setTimeout(() => {
      setEventStage((stage) => {
        if (stage === null) return 0;
        return Math.min(stage + 1, architecture.length - 1);
      });
      if (eventStage !== null && eventStage >= architecture.length - 1)
        setPlaying(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [playing, eventStage, reduced]);
  const stage = architecture[selected];
  function run() {
    if (reduced) {
      const next =
        eventStage === null ? 0 : (eventStage + 1) % architecture.length;
      setEventStage(next);
      setSelected(next);
      return;
    }
    if (playing) {
      setPlaying(false);
      return;
    }
    if (eventStage === null || eventStage === architecture.length - 1)
      setEventStage(0);
    setPlaying(true);
  }
  return (
    <div className="architecture-explorer">
      <div className="explorer-toolbar">
        <div
          className="view-toggle"
          role="group"
          aria-label="Architecture explanation mode"
        >
          <button aria-pressed={!technical} onClick={() => setTechnical(false)}>
            Simple View
          </button>
          <button aria-pressed={technical} onClick={() => setTechnical(true)}>
            Technical View
          </button>
        </div>
        <span className="explorer-label">
          CONCEPTUAL ARCHITECTURE / SELECT A STAGE
        </span>
      </div>
      <ol className="pipeline">
        {architecture.map((item, i) => (
          <li key={item.id}>
            <button
              aria-pressed={selected === i}
              aria-controls="architecture-detail"
              onClick={() => setSelected(i)}
            >
              <span className="pipeline-number">0{i + 1}</span>
              <strong>{item.title}</strong>
              <span className="pipeline-caption">{item.detail}</span>
              <ArrowRight size={16} aria-hidden="true" />
              {eventStage === i && (
                <m.span
                  className="event-token"
                  layoutId={reduced ? undefined : "demo-event"}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                  aria-label="Fictional event location"
                >
                  •
                </m.span>
              )}
            </button>
          </li>
        ))}
      </ol>
      <div
        id="architecture-detail"
        className="architecture-detail"
        aria-live="polite"
        aria-atomic="true"
      >
        <div>
          <span className="eyebrow">
            STAGE 0{selected + 1} /{" "}
            {technical ? "TECHNICAL VIEW" : "SIMPLE VIEW"}
          </span>
          <h3>{stage.title}</h3>
          <p>{technical ? stage.technical : stage.simple}</p>
        </div>
        <aside>
          <span className="eyebrow">DEVELOPMENT STATUS</span>
          <strong>{stage.status}</strong>
          <p>
            No stage in this demonstration is evidence of a shipped capability.
          </p>
        </aside>
      </div>
      <div className="demo-console">
        <div>
          <span className="demo-badge">FICTIONAL DEMONSTRATION</span>
          <p>
            {eventStage === null
              ? "Follow synthetic event demo-001 through the conceptual pipeline."
              : architecture[eventStage].event}
          </p>
          <small>
            No live systems, customer data, or real security findings are
            involved.
          </small>
        </div>
        <div className="demo-controls">
          <button className="button" onClick={run}>
            {reduced ? (
              <ArrowRight size={15} />
            ) : playing ? (
              <Pause size={15} />
            ) : (
              <Play size={15} />
            )}{" "}
            {reduced
              ? "Step fictional event"
              : playing
                ? "Pause demonstration"
                : "Play fictional event"}
          </button>
          <button
            className="icon-button"
            aria-label="Reset demonstration"
            onClick={() => {
              setPlaying(false);
              setEventStage(null);
            }}
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
