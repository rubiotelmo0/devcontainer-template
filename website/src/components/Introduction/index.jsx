import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export default function Introduction() {
  return (
    <div className={styles.introduction}>
      <section className={styles.hero} aria-labelledby="introduction-title">
        <div className={styles.heroCopy}>
          <h1 id="introduction-title">Your workspace.<br /><span>Ready to build.</span></h1>
          <p className={styles.lead}>An opinionated devcontainer stack template for you and your coding agents. Bring your own tools and give each task its own space to work.</p>
          <Link className={styles.primaryLink} to="/getting-started/pre-creation">Set up your stack <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.artwork}>
          <div className={styles.artworkVisual}>
            <img src={useBaseUrl('/img/devcontainer-token.png')} alt="A friendly coding robot in an open blue devcontainer, surrounded by glowing cyan cubes." width="1254" height="1254" fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className={styles.reasons} aria-labelledby="why-title">
        <h2 id="why-title">Why devcontainer-template?</h2>
        <ol className={styles.reasonList}>
          <li><h3>Share the setup</h3><p>Keep the environment definition in the repository so contributors can reproduce it with minimal prerequisites and consistent tool versions.</p></li>
          <li><h3>Isolate your workspaces</h3><p>Run multiple devcontainer stacks on the same machine, each with its own tools and versions, without conflicts or interference.</p></li>
          <li><h3>Easy setup</h3><p>Follow the stack setup guides to adapt the template to your project. A repository setup skill is planned.</p></li>
          <li><h3>Survive rebuilds</h3><p>Named volumes preserve Codex data, the agent skill store, the Treehouse pool, and DiD data across devcontainer rebuilds.</p></li>
          <li><h3>Make room for tasks</h3><p>Flexible tool combinations. Treehouse enables parallel agent workflows, Docker-in-Docker (DiD) supports building and testing Docker images, and the Compose stack allows interactions between services.</p></li>
        </ol>
      </section>
    </div>
  );
}
