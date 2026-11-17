export type PhotoKey = "hero" | "about" | "editorial" | "community";
export interface PhotoAsset {
  src: string;
  alt: string;
  focalPoint: string;
  mobileFocalPoint: string;
  label: string;
}
export const photography: Record<PhotoKey, PhotoAsset> = {
  hero: {
    src: "/images/profile/hero.webp",
    alt: "Portrait of the person behind The Maverick Builder",
    focalPoint: "50% 35%",
    mobileFocalPoint: "50% 25%",
    label: "01 / THE PERSON BEHIND THE PERSPECTIVE",
  },
  about: {
    src: "/images/profile/about.webp",
    alt: "The Maverick Builder in a personal setting",
    focalPoint: "50% 40%",
    mobileFocalPoint: "50% 30%",
    label: "02 / THE STORY BEHIND THE WORK",
  },
  editorial: {
    src: "/images/profile/editorial.webp",
    alt: "The Maverick Builder in an editorial portrait",
    focalPoint: "50% 35%",
    mobileFocalPoint: "50% 30%",
    label: "04 / A PERSPECTIVE IN PROGRESS",
  },
  community: {
    src: "/images/profile/community.webp",
    alt: "The Maverick Builder in a community setting",
    focalPoint: "50% 40%",
    mobileFocalPoint: "50% 35%",
    label: "05 / PROGRESS SHOULD REACH PEOPLE",
  },
};
