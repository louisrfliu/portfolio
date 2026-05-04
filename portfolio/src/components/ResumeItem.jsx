import styles from './ResumeItem.module.css';

export default function ResumeItem({ dates, role, company, description }) {
  return (
    <div className={styles.item}>
      <div className={styles.date}>{dates}</div>
      <div className={styles.role}>
        <h4>{role}</h4>
        <span className={styles.company}>{company}</span>
        <p>{description}</p>
      </div>
    </div>
  );
}
