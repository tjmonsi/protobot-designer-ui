import { html } from 'lit-element';
import '../protobot-header';
import '../protobot-sidebar';
import '../protobot-start';
import '../protobot-authoring';
import '../protobot-authoring-sidebar';
import '../protobot-micro';
import '../protobot-macro';
import '../protobot-history';
import '../protobot-design-history'
import '../protobot-macro-sidebar';
import '../protobot-micro-sidebar';
import '../protobot-history-sidebar';
import '../protobot-design-history-sidebar';
import '../protobot-deploy';
import 'weightless/ripple';


// @ts-ignore
import styles from './style.css';

// @ts-ignore
import startStyles from './start_style.css'

/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { queryObject, lastDeployedDomainParameters, lastDeployedDomainCommitMessage, lastDeployedDomainVersion, lastDeployedDomainTopics, lastDeployedDomainTopicList, changeVersion, versionsDetail } = this;
  const { domain, page } = queryObject;

  return html`

    ${domain ? html`
      <style>
        ${styles}
        @import url('https://fonts.googleapis.com/css?family=Miriam+Libre:700&display=swap');
      </style>

      <protobot-header></protobot-header>

      <div class="center" style="overflow:scroll;">
        ${page === 'authoring' ? html`
          <protobot-authoring style="height:100%;"></protobot-authoring>
        ` : ''}

        ${page === 'macro' || !page ? html`
          <protobot-macro lastDeployedDomainVersion=${lastDeployedDomainVersion}></protobot-macro>
        ` : ''}

        ${page === 'test' ? html`
          <protobot-deploy></protobot-deploy>
        ` : ''}

        ${page === 'micro' ? html`
          <protobot-micro></protobot-micro>
        ` : ''}

        ${page === 'design-history' ? html`
          <protobot-design-history .lastDeployedDomainParameters=${lastDeployedDomainParameters} lastDeployedDomainVersion=${lastDeployedDomainVersion} .lastDeployedDomainTopics=${lastDeployedDomainTopics}></protobot-design-history>
        ` : ''}
      </div>

      <div class="right">
        <div class="right-scrollable">
        ${page === 'authoring' ? html`
          <protobot-authoring-sidebar style="display:flex; flex-direction:column; height:100%; padding: 10px;"></protobot-authoring-sidebar>
        ` : ''}
        ${page === 'macro' || !page ? html`
          <protobot-macro-sidebar style="display:flex; flex-direction:column; height:100%; padding: 10px;"
          .versionsDetail=${versionsDetail} lastDeployedDomainVersion=${lastDeployedDomainVersion} .lastDeployedDomainTopicList=${lastDeployedDomainTopicList} @change-version=${changeVersion.bind(this)}
          ></protobot-macro-sidebar>
        ` : ''}
        ${page === 'micro' ? html`
          <protobot-micro-sidebar style="display:flex; flex-direction:column; height:100%; padding: 10px;"></protobot-micro-sidebar>
        ` : ''}
        ${page === 'design-history' ? html`
          <protobot-design-history-sidebar lastDeployedDomainCommitMessage=${lastDeployedDomainCommitMessage} .versionsDetail=${versionsDetail} lastDeployedDomainVersion=${lastDeployedDomainVersion} .lastDeployedDomainTopicList=${lastDeployedDomainTopicList} @change-version=${changeVersion.bind(this)}></protobot-design-history-sidebar>
        ` : ''}
        </div>
      </div>

    ` : html`
      <style>
        ${startStyles}
        @import url('https://fonts.googleapis.com/css?family=Miriam+Libre:700&display=swap');
      </style>
      <protobot-start></protobot-start>
    `}

  `;
}.bind(self)();
