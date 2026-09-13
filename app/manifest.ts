import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CampusNav | Indoor Campus Navigation System, Panvel",
    short_name: "CampusNav",
    description:
      "Interactive indoor campus navigation and routing for Anjuman-i-Islam's Kalsekar Technical Campus (AIKTC).",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F5",
    theme_color: "#101b34",
    icons: [
      {
        src: "/cnlogo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/cnlogo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
