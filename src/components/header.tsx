"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X, Sun, Moon } from "lucide-react";
import { navigation } from "@/lib/site";
export function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const path = usePathname();
  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    setDark(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }
  return (
    <header
      className="site-header"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          document.querySelector<HTMLButtonElement>(".mobile-toggle")?.focus();
        }
      }}
    >
      <Link className="wordmark" href="/" aria-label="nMaverick home">
        <span className="brand-symbol">
          n<span>↗</span>
        </span>
        <span>
          nMaverick<span className="wordmark-sub">THE MAVERICK BUILDER</span>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            aria-current={
              (href === "/" ? path === "/" : path.startsWith(href))
                ? "page"
                : undefined
            }
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <button
          className="icon-button"
          onClick={toggleTheme}
          aria-label="Toggle color theme"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <Link href="/contact" className="header-connect">
          Let’s connect <ArrowUpRight size={15} />
        </Link>
        <button
          className="icon-button mobile-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {navigation.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={path === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
          <Link href="/ideas" onClick={() => setOpen(false)}>
            Ideas & notes
          </Link>
        </nav>
      )}
    </header>
  );
}
