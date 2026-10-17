import React from 'react';
import Link from '@docusaurus/Link';
import Admonition from '@theme/Admonition';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function ReasonIcon({ children }) {
  return (
    <svg className={styles.reasonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

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
          <li><h3>Share the setup<ReasonIcon><circle cx="6" cy="12" r="3" /><circle cx="18" cy="5" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" /></ReasonIcon></h3><p>Keep the environment definition in the repository so contributors can reproduce it with minimal prerequisites and consistent tool versions.</p></li>
          <li><h3>Isolate your workspaces<ReasonIcon><rect x="3" y="5" width="7" height="14" rx="2" /><rect x="14" y="5" width="7" height="14" rx="2" /></ReasonIcon></h3><p>Run multiple devcontainer stacks on the same machine, each with its own tools and versions, without conflicts or interference.</p></li>
          <li><h3>Easy setup<ReasonIcon><path d="m5 13 4 4L19 7" /></ReasonIcon></h3><p>The setup-workspace skill guides your agent through project tools, services, and documentation branding, with build and stack checks.</p></li>
          <li><h3>Survive rebuilds<ReasonIcon><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></ReasonIcon></h3><p>Named volumes preserve Codex data, the agent skill store, the Treehouse pool, and DiD data across devcontainer rebuilds.</p></li>
          <li><h3>Make room for tasks<ReasonIcon><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><path d="M14 17.5h7m-3.5-3.5v7" /></ReasonIcon></h3><p>Flexible tool combinations. Treehouse enables parallel agent workflows, Docker-in-Docker (DiD) supports building and testing Docker images, and the Compose stack allows interactions between services.</p></li>
        </ol>
        <br></br>
        <Admonition type="note">Codex is currently the only natively supported coding agent.</Admonition>
      </section>
    </div>
  );
}
