import Image from "next/image";
import fs from "node:fs";
import path from "node:path";
import type { CSSProperties } from "react";
import { photography, type PhotoKey } from "@/lib/photography";
export function Photograph({
  name,
  hero = false,
  className = "",
}: {
  name: PhotoKey;
  hero?: boolean;
  className?: string;
}) {
  const photo = photography[name];
  const present = fs.existsSync(path.join(process.cwd(), "public", photo.src));
  return (
    <figure
      className={`photograph photograph-${name} ${present ? "" : "photo-placeholder"} ${className}`}
      style={
        {
          "--photo-focus": photo.focalPoint,
          "--photo-focus-mobile": photo.mobileFocalPoint,
        } as CSSProperties
      }
    >
      <Image
        src={present ? photo.src : "/images/profile/placeholder.svg"}
        alt={
          present
            ? photo.alt
            : `Intentional photography placeholder. ${name} photograph has not been supplied.`
        }
        fill
        preload={hero}
        sizes={
          hero
            ? "(max-width: 800px) 100vw, 52vw"
            : "(max-width: 800px) 100vw, 50vw"
        }
        style={{ objectFit: "cover" }}
      />
      <figcaption>
        <span>{photo.label}</span>
        {!present && <strong>PHOTOGRAPH TO COME</strong>}
      </figcaption>
    </figure>
  );
}
