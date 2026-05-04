import './index.css';
import Nav from './components/Nav';
import HeroArt from './components/HeroArt';
import ProjectCard from './components/ProjectCard';
import ResumeItem from './components/ResumeItem';
import styles from './App.module.css';

const projects = [
  {
    title: 'Aura Financial',
    image: 'https://images.pexels.com/photos/811587/pexels-photo-811587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Fintech Dashboard interface',
    role: 'Lead PD',
    domain: 'Fintech',
    output: 'Design System',
  },
  {
    title: 'Habitat Control',
    image: 'https://images.pexels.com/photos/5077054/pexels-photo-5077054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Smart Home Control Interface',
    role: 'UX/UI',
    domain: 'IoT Home',
    output: 'Mobile App',
  },
  {
    title: 'Synthetix BI',
    image: 'https://images.pexels.com/photos/6476123/pexels-photo-6476123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Data Visualization Software',
    role: 'Senior PD',
    domain: 'Data Viz',
    output: 'Web Platform',
  },
  {
    title: 'Resonance Audio',
    image: 'https://images.pexels.com/photos/17483868/pexels-photo-17483868/free-photo-of-close-up-of-synthesizer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Audio Production Tool',
    role: 'Product Des.',
    domain: 'Creative Tools',
    output: 'Desktop App',
  },
];

const resumeItems = [
  {
    dates: 'OCT 2025 — PRES',
    role: 'Senior Product Designer',
    company: '6sense // Remote',
    description:
      'Lead end-to-end product design initiatives that drive consistency, scalability, and user-centered solutions across the platform ecosystem. Own platform-level initiatives from discovery research through concept validation, experience design, and cross-functional alignment.',
  },
  {
    dates: 'OCT 2024 — OCT 2025',
    role: 'Product Designer III',
    company: '6sense // Remote',
    description:
      'Led experience improvements for system integrations and platform initiatives. Updated the experience to support OAuth for 20+ organizations using Snowflake, and redesigned the integration setup flow for 1,000+ customers during onboarding.',
  },
  {
    dates: 'APR 2022 — OCT 2024',
    role: 'User Experience Designer',
    company: '6sense // Remote',
    description:
      'Improved the user experience of 6sense Revenue AI™ for Sales. Led the full redesign of the product, resulting in user growth for over 85% of migrated organizations and an average of 25K monthly users.',
  },
  {
    dates: 'MAR 2021 — APR 2022',
    role: 'User Experience Designer',
    company: 'Zywave // Remote',
    description:
      'Served as a design resource across 3 mission teams. Designed and maintained SaaS solutions for over 15K insurance brokers to create and configure employee benefit quotes and proposals.',
  },
  {
    dates: 'AUG 2020 — MAR 2021',
    role: 'User Experience Designer',
    company: 'Dawn Equipment // Madison, WI',
    description:
      'Sole in-house designer working with a small development team to uncover scalable design improvements. Designed the tablet application that helped 70+ farmers monitor and control Dawn equipment.',
  },
];

export default function App() {
  return (
    <>
      <Nav />

      <div className={styles.container}>
        {/* Hero */}
        <header className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Designing<br />Digital Matter.</h1>
            <p>
              I'm Louis Liu, a Senior Product Designer in St. Paul who untangles complex enterprise logic into intuitive tools.
            </p>
            <a href="#work" className="m-pill">See case studies</a>
          </div>
          <HeroArt />
        </header>

        {/* Work */}
        <section id="work">
          <h2 className={styles.sectionHeader}>Case Studies</h2>
          <div className={styles.workGrid}>
            {projects.map(p => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className={styles.aboutSection}>
          <h2 className={styles.sectionHeader}>About</h2>
          <div className={`${styles.aboutBody} m-slab`}>
            <div className={styles.aboutText}>
              <div className={styles.metaTag} style={{ marginBottom: '30px' }}>
                PRFL // HUMAN
              </div>
              <p>I design for complexity, not aesthetics.</p>
              <p>I've always been more interested in the "engine room" than the "gallery". In the world of enterprise software, the most impactful work is rarely the most glamorous. It's usually messy, tucked behind complex business rules, and built for people who have spent years becoming deep experts in their fields.</p>
              <p>I'm drawn to the problems that resist easy answers. Instead of just focusing on the interface, I look at the systems underneath it: the logic, the constraints, and the mental models that keep everything running. I enjoy untangling those complicated pieces into experiences that feel natural and intuitive. For me, getting a design right matters not because of how it looks, but because the wrong solution carries a real-world cost in time, money, and user trust.</p>
            </div>
            <div className={styles.profilePlaceholder}>
              <img src="/IMG_5314.JPG" alt="Louis Liu" />
            </div>
          </div>
        </section>

        {/* Resume */}
        <section id="resume" className={styles.resumeSection}>
          <h2 className={styles.sectionHeader}>Resume</h2>
          <div className={`${styles.resumeBoard} m-slab`}>
            <div className={styles.resumeHeader}>
              <h3>Louis Liu</h3>
              <a
                href="/Resume_Louis_Liu_2026.pdf"
                download="Resume_Louis_Liu_2026.pdf"
                className={`m-pill ${styles.resumeDownload}`}
              >
                <svg viewBox="0 0 24 24" className={styles.dlIcon} aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PDF
              </a>
            </div>
            <div>
              {resumeItems.map(item => (
                <ResumeItem key={item.dates} {...item} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <p>SYS.LOG // ALL SYSTEMS NOMINAL © 2024 LOUIS LIU</p>
      </footer>
    </>
  );
}
