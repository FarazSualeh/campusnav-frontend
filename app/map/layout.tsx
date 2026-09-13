import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Campus Map & Live Indoor Navigation",
  description:
    "Explore interactive floor plans, search classrooms, labs, faculty rooms, and get real-time Dijkstra shortest-path navigation across Floors 2 & 3 of AIKTC Engineering Building.",
  keywords: [
    "AIKTC campus map",
    "indoor navigation map",
    "Floor 2 floorplan",
    "Floor 3 floorplan",
    "Kalsekar Technical Campus navigation",
    "classroom finder",
    "engineering building map",
    "turn by turn indoor routing",
    "Dijkstra navigation",
  ],
  alternates: {
    canonical: "/map",
  },
  openGraph: {
    title: "Interactive Campus Map & Live Indoor Navigation | CampusNav",
    description:
      "Explore interactive floor plans and find the fastest route across floors at Kalsekar Technical Campus.",
    url: "/map",
    type: "website",
    images: [
      {
        url: "/campusnavlogo.png",
        width: 1200,
        height: 630,
        alt: "CampusNav Interactive Campus Map",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Campus Map & Live Indoor Navigation | CampusNav",
    description:
      "Live turn-by-turn indoor routing for classrooms, labs, and facilities at AIKTC.",
    images: ["/campusnavlogo.png"],
  },
};

export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
