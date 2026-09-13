import Link from "next/link";
import Image from "next/image";

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

const faqs = [
  {
    question: "What is CampusNav?",
    answer:
      "CampusNav is an indoor campus navigation platform designed for Anjuman-i-Islam's Kalsekar Technical Campus (AIKTC) in New Panvel. It helps students, staff, and visitors locate classrooms, computer labs, staff rooms, and facilities with precise navigation.",
  },
  {
    question: "Which buildings and floors are currently supported?",
    answer:
      "Currently, Floors 2 and 3 of the Engineering Building are fully mapped and live with interactive Dijkstra routing. Additional floors (Ground and Floor 1) and other campus blocks are coming soon.",
  },
  {
    question: "How does CampusNav calculate the shortest route?",
    answer:
      "CampusNav models campus corridors, doorways, and stairwells as a weighted navigation graph. Using Dijkstra's shortest path algorithm, it calculates the most direct walkable route between your starting location and destination.",
  },
  {
    question: "Do I need to download an application to use CampusNav?",
    answer:
      "No app installation is needed. CampusNav runs directly in any modern mobile or desktop web browser. You can also share QR codes to your friend to get directions to your destination.",
  },
];

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="hero">
        <nav className="nav shell" aria-label="Main navigation">
          <Logo />
          <div className="nav-links">
            <a href="#how-it-works">How it works</a>
            <a href="#features">Features</a>
            <a href="#departments">Departments</a>
            <a href="#faq">FAQ</a>
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
              <a href="#faq">FAQ</a>
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

      <section className="departments-section" id="departments">
        <div className="departments section shell">
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
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="shell">
          <div className="section-heading faq-heading">
            <p className="eyebrow"><span /> Questions &amp; Answers</p>
            <h2>Frequently asked <em>questions.</em></h2>
          </div>
          <div className="faq-grid">
            {faqs.map((faq) => (
              <article className="faq-card" key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
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
          <span>© 2026 CampusNav</span>
        </div>
      </footer>
    </main>
  );
}
