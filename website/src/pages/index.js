import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Easy to Use',
    imageUrl: 'img/remotework.svg',
    description: (
      <>
        SpeSQL was designed in a way to be easily installed and used by
        researchers unfamiliar with SQL syntax.
      </>
    ),
  },
  {
    title: 'Customizable Queries',
    imageUrl: 'img/customizable.svg',
    description: (
      <>
        SpeSQL supports both basic and advanced variants for issuing all the
        fundamendal CRUD database operations (create, read, update and delete).
      </>
    ),
  },
  {
    title: 'Designed for Researchers',
    imageUrl: 'img/science.svg',
    description: (
      <>
        SpeSQL was thought of by and developed for the researchers at the
        McGuire Center for Lepidoptera and Biodiversity, at the Florida Museum
        of Natural History.
      </>
    ),
  },

  {
    title: 'Completely Open Source',
    imageUrl: 'img/opencc.svg',
    description: (
      <>
        SpeSQL was developed using TypeScript React and is publically hosted on
        a GitHub repository.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--6 padding-vert--lg', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title="Welcome"
      description="Description will go into a meta tag in <head />"
    >
      <header className={clsx('hero', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted
              )}
              to={useBaseUrl('docs/')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
