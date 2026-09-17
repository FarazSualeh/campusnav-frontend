import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About CampusNav | Team, Tech Stack & Story",
  description:
    "Learn about CampusNav — an indoor campus navigation platform created by Faraz Sualeh and Burhan Parkar at Anjuman-i-Islam's Kalsekar Technical Campus (AIKTC).",
  keywords: [
    "About CampusNav",
    "Faraz Sualeh",
    "Burhan Parkar",
    "AIKTC BSc IT project",
    "indoor navigation system developers",
    "Kalsekar Technical Campus student project",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About CampusNav | Team, Tech Stack & Story",
    description:
      "Created by Faraz Sualeh & Burhan Parkar for AIKTC students, faculty, and visitors.",
    url: "/about",
    type: "profile",
    images: [
      {
        url: "/cnlogo.png",
        width: 1200,
        height: 630,
        alt: "CampusNav Creators",
      },
    ],
  },
};

const creators = [
  {
    image: "/farazs.jpg",
    alt:"faraz's pic",
    name: "Faraz Sualeh",
    role: "Frontend Developer, UI/UX designer, and Navigation System Handler",
    text: "Faraz built the Maps, search, and navigation experience, from finding locations and selecting destinations to calculating the shortest route and guiding users with precise directions.",
  },
  {
    image: "/burhanp.jpg",
    alt:"burhan's pic",
    name: "Burhan Parkar",
    role: "Backend Developer, Database Manager and System Administrator",
    text: "Burhan built the backend that powers CampusNav, managing the APIs, data flow, and database structure that keep locations and navigation information organized and accessible.",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "CampusNav",
      "applicationCategory": "NavigationApplication",
      "operatingSystem": "Web",
      "description":
        "Indoor campus navigation system for Anjuman-i-Islam's Kalsekar Technical Campus.",
      "author": creators.map((c) => ({
        "@type": "Person",
        "name": c.name,
        "jobTitle": c.role,
        "description": c.text,
      })),
    },
  };

  return (
    <main className="about-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <nav className="nav shell about-nav" aria-label="Main navigation">
        <Link className="logo" href="/" aria-label="CampusNav home">
          <Image src="/cnlogo.png" alt="CampusNav" width={108} height={66} />
        </Link>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/map">Live maps</Link>
          <Link href="/about" aria-current="page">About us</Link>
        </div>
        <Link className="nav-cta" href="/map">Explore campus <Arrow /></Link>
        <details className="mobile-menu">
          <summary aria-label="Open navigation menu">☰</summary>
          <div>
            <Link href="/map" className="font-bold text-orange-600">Open Interactive Map</Link>
            <Link href="/">Home</Link>
            <Link href="/map">Live maps</Link>
            <Link href="/about">About us</Link>
          </div>
        </details>
      </nav>

      <div className="about-back-row shell">
        <Link className="back-link" href="/">← Back to home</Link>
      </div>

      <section className="about-hero shell">
        <div className="about-hero-copy">
          <p className="eyebrow"><span /> The people behind the map</p>
          <h1>Built here.<br /><em>Made for here.</em></h1>
          <p className="about-lead">
            CampusNav is an indoor navigation platform created by two BSc IT students at Anjuman-i-Islam&apos;s Kalsekar Technical Campus.
          </p>
        </div>
        <div className="about-visual" aria-label="Campus route illustration">
          <div className="about-visual-header">
            <span>Engineering block</span>
            <span className="status-pill">Live</span>
          </div>
          <div className="route-graphic">
            <div className="campus-block block-a">
              <b>A</b>
              <small>Labs</small>
            </div>
            <div className="campus-block block-b">
              <b>B</b>
              <small>Dept.</small>
            </div>
            <div className="campus-block block-c">
              <b>C</b>
              <small>Study</small>
            </div>
            <span className="route-line line-one" />
            <span className="route-line line-two" />
            <span className="route-line line-three" />
            <span className="route-pin pin-start">Start</span>
            <span className="route-pin pin-end">You are here</span>
          </div>
        </div>
      </section>

      <section className="about-story section shell">
        <div className="about-section-label">
          <span>01</span>
          <p className="eyebrow"><span /> Why CampusNav?</p>
        </div>
        <div className="about-story-copy">
          <h2>Because finding a room shouldn&apos;t feel like a <em>detour.</em></h2>
          <p>
            New students, visitors and even regulars can lose time finding classrooms, labs, offices and facilities across a busy campus. CampusNav was built to make those first few minutes simpler: search for a destination, understand where it is, and follow a clear path to get there.
          </p>
          <p>
            Starting with the Engineering Building&apos;s first, second and third floors, the platform brings the campus map into one focused, student-friendly experience.
          </p>
          <Link className="text-link cta-link" href="/map">Open the interactive map <Arrow /></Link>
        </div>
      </section>

      <section className="creators-section">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow"><span /> Meet the creators</p>
            <h2>Student-built,<br /><em>campus-minded.</em></h2>
          </div>
          <div className="creator-grid">
            {creators.map((creator) => (
              <article className="creator-card" key={creator.name}>
                {creator.image ? (
                  <Image
                    className="creator-avatar"
                    src={creator.image}
                    alt={`${creator.name} profile`}
                    width={78}
                    height={78}
                  />
                ) : (
                  <div className="creator-initials">{creator.image}</div>
                )}
                <div className="creator-text">
                  <p className="creator-role">{creator.role}</p>
                  <h3>{creator.name}</h3>
                  <p>{creator.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer shell">
        <div className="footer-brand" aria-label="CampusNav brand">
          <Image src="/cnlogo.png" alt="" width={42} height={42} />
          <span>CampusNav</span>
        </div>
        <div className="footer-campus">Anjuman-i-Islam&apos;s<br />Kalsekar Technical Campus</div>
        <div className="footer-right">
          <span>© 2026 CampusNav</span>
        </div>
      </footer>
    </main>
  );
}