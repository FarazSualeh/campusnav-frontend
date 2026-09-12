import Link from "next/link";
import Image from "next/image";

const features = [
  ["01", "Indoor Navigation", "Turn-by-turn guidance that understands the spaces between buildings.", "↗"],
  ["02", "Smart Search", "Find a room, faculty office or facility in seconds with natural search.", "⌕"],
  ["03", "Multi-Floor Support", "Move confidently across floors with clear lifts, stairs and transitions.", "⇅"],
  ["04", "Campus Map", "See your destination in context with a live, easy-to-read campus view.", "▦"],
];

function Logo() {
  return (
    <Link className="logo" href="/" aria-label="CampusNav home">
      <Image src="/campusnavlogo.png" alt="CampusNav" width={108} height={66} />
    </Link>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main id="top">
      <section className="hero">
        <nav className="nav shell" aria-label="Main navigation">
          <Logo />
          <div className="nav-links">
            <a href="#how-it-works">How it works</a>
            <a href="#features">Features</a>
            <a href="#departments">Departments</a>
            <Link href="/about">About us</Link>
            <Link href="/map" className="text-orange-600 font-bold">Live Floor 2 &amp; 3 Maps</Link>
          </div>
          <Link className="nav-cta" href="/map">
            Explore campus <Arrow />
          </Link>
          <details className="mobile-menu">
            <summary aria-label="Open navigation menu">☰</summary>
            <div>
              <Link href="/map" className="font-bold text-orange-600">Open Interactive Map</Link>
              <a href="#how-it-works">How it works</a>
              <a href="#features">Features</a>
              <a href="#departments">Departments</a>
              <Link href="/about">About us</Link>
            </div>
          </details>
        </nav>

        <div className="hero-content shell">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Explore AIKTC&apos;s Campus</p>
            <h1>Navigate our campus.<br /><em>With confidence.</em></h1>
            <p className="hero-description">
              CampusNav helps students find classrooms, labs, offices and facilities inside the campus, without the guesswork.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/map">
                Explore Floor 2 &amp; 3 Maps <Arrow />
              </Link>
              <a className="text-link" href="#how-it-works">
                See how it works <span>↓</span>
              </a>
            </div>
            <div className="hero-note">
              <span className="status-dot" /> Live: Engineering Building (Floors 2 &amp; 3)
            </div>
          </div>

          <Link href="/map" className="map-art" aria-label="Illustration of an indoor campus map" role="img" title="Click to open interactive map">
            <div className="map-top">
              <span>Campus map</span>
              <span className="map-live"><i /> live view</span>
            </div>
            <div className="map-grid" />
            <div className="map-building building-a">
              <b>A</b>
              <span>Engineering (Floors 2 &amp; 3 Live)</span>
            </div>
            <div className="map-building building-b">
              <b>B</b>
              <span>Pharmacy</span>
            </div>
            <div className="map-building building-c">
              <b>C</b>
              <span>Architecture</span>
            </div>
            <div className="map-path path-one" />
            <div className="map-path path-two" />
            <div className="map-pin">
              <span>◉</span>
              <b>Staircase (Entrance)</b>
            </div>
            <div className="map-destination">
              <span>✦</span>
              <b>Server Room & Labs</b>
              <small>Interactive Map ➔</small>
            </div>
            <div className="map-controls">
              <span>+</span>
              <span>−</span>
            </div>
          </Link>
        </div>

        <div className="hero-foot shell">
          <span>01 / 03</span>
          <span className="scroll-line" />
          <span>Scroll to explore</span>
        </div>
      </section>

      <section className="process section shell" id="how-it-works">
        <div className="section-heading">
          <p className="eyebrow"><span /> Simple by design</p>
          <h2>From lost to <em>located.</em></h2>
        </div>
        <div className="process-grid">
          {[
            ["01", "Search", "Search for any classroom, lab, washroom or lounge on Floors 2 and 3."],
            ["02", "Select destination", "Choose from real-time filtered locations or tap any room."],
            ["03", "Navigate", "Follow the optimal corridor path highlighted directly on the map."],
          ].map(([number, title, text], index) => (
            <div className="process-step" key={number}>
              <span className="step-number">{number}</span>
              <div>
                <div className="step-icon">{index === 0 ? "⌕" : index === 1 ? "✦" : "↗"}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              {index < 2 && <span className="step-arrow">→</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="shell">
          <div className="section-heading feature-heading">
            <p className="eyebrow"><span /> Everything within reach</p>
            <h2>A better way to<br /><em>find your way.</em></h2>
            <p>Built around the way students actually move through campus.</p>
          </div>
          <div className="feature-grid">
            {features.map(([number, title, text, icon]) => (
              <article className="feature-card" key={number}>
                <div className="feature-card-top">
                  <span>{number}</span>
                  <strong>{icon}</strong>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <Link href="/map" aria-label={`Learn more about ${title}`}>
                  <Arrow />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="departments section shell" id="departments">
        <div className="department-copy">
          <p className="eyebrow"><span /> One campus, many paths</p>
          <h2>Made for the <em>whole campus.</em></h2>
          <p>
            Whether you are heading to a morning lecture or finding a new lab, CampusNav keeps every department connected.
          </p>
          <Link className="text-link" href="/map">
            Explore Floor 2 &amp; 3 navigation <Arrow />
          </Link>
        </div>
        <div className="department-list">
          <div>
            <span>01</span>
            <b>Engineering</b>
            <small>Floors 2 &amp; 3 Navigation Active</small>
          </div>
          <div>
            <span>02</span>
            <b>Pharmacy</b>
            <small>Care through science</small>
          </div>
          <div>
            <span>03</span>
            <b>Architecture</b>
            <small>Designing tomorrow</small>
          </div>
        </div>
      </section>

      <section className="final-cta" id="explore">
        <div className="shell final-cta-inner">
          <p className="eyebrow"><span /> Your campus, clearly mapped</p>
          <h2>Ready to find<br /><em>your way?</em></h2>
          <Link className="button button-light" href="/map">
            Open Interactive Map <Arrow />
          </Link>
        </div>
      </section>

      <footer className="footer shell">
        <div className="footer-brand" aria-label="CampusNav brand">
          <Image src="/campusnavlogo.png" alt="" width={42} height={42} />
          <span>CampusNav</span>
        </div>
        <div className="footer-campus">
          Anjuman-i-Islam&apos;s<br />Kalsekar Technical Campus
        </div>
        <div className="footer-right">
          <span>AIKTC Indoor campus navigation system</span>
          <span>© 2026 CampusNav</span>
        </div>
      </footer>
    </main>
  );
}
