import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '📜 Spell Tomes & Scrolls',
    icon: '🧙‍♂️',
    description: (
      <>
        A collection of <strong>arcane knowledge</strong> about frontend magic, organized into scrolls and tomes. 
        Journey through tutorials, code solutions, and practical wisdom from battles with the toughest bugs.
      </>
    ),
  },
  {
    title: '⚔️ Battle-Tested Code',
    icon: '🛡️',
    description: (
      <>
        Discover <strong>powerful techniques</strong> refined through countless coding adventures. 
        From React component composition to TypeScript incantations, all documented for your quest.
      </>
    ),
  },
  {
    title: '🔮 Always Evolving',
    icon: '✨',
    description: (
      <>
        This grimoire is <strong>constantly updated</strong> with new discoveries and learnings. 
        As I level up and gain experience, so too does this collection of frontend wisdom.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        {icon}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3" style={{ color: '#D9934C' }}>{title}</Heading>
        <p style={{ color: 'var(--ifm-font-color-base)' }}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features} style={{ 
      background: 'var(--ifm-background-color)',
      padding: '3rem 0',
      borderTop: '1px solid rgba(217, 147, 76, 0.3)'
    }}>
      <div className="container">
        <Heading as="h2" className="text--center" style={{ color: '#D9934C', marginBottom: '2rem' }}>
          📖 The Frontend Chronicles
        </Heading>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
