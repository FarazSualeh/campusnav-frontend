import Image from "next/image";
import Link from "next/link";

const creators = [
  {
    initials: "FS",
    name: "Faraz Sualeh",
    role: "BSc IT student",
    text: "Faraz built the maps and search experience — everything you see and interact with when finding your way around campus, from your first search to the final turn.",
  },
  {
    initials: "BP",
    name: "Burhan Parkar",
    role: "BSc IT student",
    text: "Burhan built the system that figures out the fastest route for you, working behind the scenes so every path you're shown actually makes sense.",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function AboutPage() {
  return (
    <main className="about-page">
      <nav className="nav shell about-nav" aria-label="Main navigation">
        <Link className="logo" href="/" aria-label="CampusNav home">
          <Image src="/campusnavlogo.png" alt="CampusNav" width={108} height={66} />
        </Link>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/map">Live maps</Link>
          <Link href="/about" aria-current="page">About us</Link>
        </div>
        <div className="about-nav-actions">
          <Link className="back-link" href="/">← Back to home</Link>
          <Link className="nav-cta" href="/map">Explore campus <Arrow /></Link>
        </div>
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
          <p className="eyebrow"><span /> Why CampusNav</p>
        </div>
        <div className="about-story-copy">
          <h2>Because finding a room shouldn&apos;t feel like a <em>detour.</em></h2>
          <p>
            New students, visitors and even regulars can lose time finding classrooms, labs, offices and facilities across a busy campus. CampusNav was built to make those first few minutes simpler: search for a destination, understand where it is, and follow a clear path to get there.
          </p>
          <p>
            Starting with the Engineering Building&apos;s second and third floors, the platform brings the campus map into one focused, student-friendly experience.
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
                <div className="creator-initials">{creator.initials}</div>
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
        <div className="footer-brand" aria-label="CampusNav brand mark">
          <span className="brand-badge" />
          <span>CampusNav</span>
        </div>
        <div className="footer-campus">Anjuman-i-Islam&apos;s<br />Kalsekar Technical Campus</div>
        <div className="footer-right">
          <span>Indoor campus navigation system</span>
          <span>© 2026 CampusNav</span>
        </div>
      </footer>
    </main>
  );
}