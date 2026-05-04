import { useState, useEffect } from 'react';
import styles from './Nav.module.css';

export default function Nav() {
  const [active, setActive] = useState('work');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['work', 'about', 'resume'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom > 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={styles.nav}>
      {['work', 'about', 'resume'].map(id => (
        <a
          key={id}
          href={`#${id}`}
          className={active === id ? styles.active : ''}
          onClick={(e) => handleClick(e, id)}
        >
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </a>
      ))}
    </nav>
  );
}
