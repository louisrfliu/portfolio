import styles from './ProjectCard.module.css';

export default function ProjectCard({ title, image, alt, role, domain, output }) {
  return (
    <article className={`${styles.card} m-slab`}>
      <div className={`${styles.imageContainer} m-inset`}>
        <img src={image} alt={alt} loading="lazy" />
      </div>
      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Role</span>
            <span className={styles.metaValue}>{role}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Domain</span>
            <span className={styles.metaValue}>{domain}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Output</span>
            <span className={styles.metaValue}>{output}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
