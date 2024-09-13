import styles from './style.module.css';

export const FilterLetters = ({ letters, onLetterClick, selectedLetter }) => (
  <div className={`${styles.filterContainer}`}>
    <button
      onClick={() => onLetterClick('all')}
      className={styles.allButton}
    >
      All
    </button>
    {letters.map((letter) => (
      <button
        key={letter}
        onClick={() => onLetterClick(letter)}
        className={` ${letter === selectedLetter ? styles.selectedButton : ''}`}
       >
        {letter}
      </button>
    ))}
  </div>
);
