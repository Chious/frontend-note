import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header
      className={clsx('hero', styles.heroBanner)}
      style={{
        background: 'var(--ifm-color-primary-lightest)',
        color: 'var(--ifm-font-color-base)',
        borderBottom: '1px solid #D9934C',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <img
            src="https://raw.githubusercontent.com/Chious/Chious/main/assets/avatar.png"
            alt="Character"
            style={{
              borderRadius: '10px',
              border: '1px solid #e5e7eb',
              width: '120px',
              height: '120px',
              objectFit: 'cover',
            }}
          />
          <div>
            <Heading
              as="h1"
              className="hero__title"
              style={{ fontWeight: 'bold' }}
            >
              🧙‍♂️ {siteConfig.title}
            </Heading>
            <p
              className="hero__subtitle"
              style={{ color: 'var(--ifm-font-color-base)' }}
            >
              {siteConfig.tagline}
            </p>
          </div>
        </div>

        <div style={{ margin: '30px 0 10px', textAlign: 'center' }}>
          <p
            style={{
              fontSize: '1.2rem',
              maxWidth: '800px',
              margin: '0 auto 20px',
            }}
          >
            Welcome to my{' '}
            <strong style={{ color: '#D9934C' }}>
              Frontend Knowledge Grimoire
            </strong>{' '}
            - a magical tome documenting my adventures through the JavaScript
            realm!
          </p>
        </div>

        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            style={{
              backgroundColor: '#D9934C',
              color: '#2e3440',
              fontWeight: 'bold',
              borderColor: '#D9934C',
              boxShadow: '0 4px 6px rgba(217,147,76,0.3)',
              marginTop: '1.5rem',
            }}
            to="/docs/notes/deploy/cicd"
          >
            📚 Begin Your Adventure
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Frontend Adventurer's Log`}
      description="A magical collection of web development knowledge, tricks, and tutorials from my journeys through the JavaScript realm."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
