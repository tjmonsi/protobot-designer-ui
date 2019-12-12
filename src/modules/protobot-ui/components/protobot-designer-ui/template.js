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
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { queryObject, lastDeployedDomainVersion, lastDeployedDomainTopics, changeVersion, versionsDetail } = this;
  const { domain, page } = queryObject;

  return html`
    <style>
      ${styles}
      @import url('https://fonts.googleapis.com/css?family=Miriam+Libre:700&display=swap');
    </style>

    ${domain ? html`
      <!-- <div class="top">
        <h2>protobot</h2>
      </div> -->
      <protobot-header></protobot-header>



      <div class="center" style="overflow:scroll;">
        ${page === 'authoring' ? html`
          <protobot-authoring></protobot-authoring>
        ` : ''}

        ${page === 'macro' ? html`
          <protobot-macro></protobot-macro>
        ` : ''}

        ${page === 'test' ? html`
          <protobot-deploy></protobot-deploy>
        ` : ''}

        ${page === 'micro' || !page ? html`
          <protobot-micro></protobot-micro>
        ` : ''}

        ${page === 'design-history' ? html`
          <protobot-design-history lastDeployedDomainVersion=${lastDeployedDomainVersion} .lastDeployedDomainTopics=${lastDeployedDomainTopics}></protobot-design-history>
        ` : ''}
      </div>

      <div class="left">
        <div class="left-scrollable">
        ${page === 'authoring' || !page ? html`
          <protobot-authoring-sidebar style="display:flex; flex-direction:column; height:100%; padding: 10px;"></protobot-authoring-sidebar>
        ` : ''}
        ${page === 'macro' ? html`
          <protobot-macro-sidebar style="display:flex; flex-direction:column; height:100%; padding: 10px;"></protobot-macro-sidebar>
        ` : ''}
        ${page === 'micro' ? html`
          <protobot-micro-sidebar style="display:flex; flex-direction:column; height:100%; padding: 10px;"></protobot-micro-sidebar>
        ` : ''}
        ${page === 'design-history' ? html`
          <protobot-design-history-sidebar .versionsDetail=${versionsDetail} lastDeployedDomainVersion=${lastDeployedDomainVersion} @change-version=${changeVersion.bind(this)}></protobot-design-history-sidebar>
        ` : ''}
        </div>
      </div>

    ` : html`
      <div style="background: white"></div>
      <protobot-start></protobot-start>
    `}

  `;
}.bind(self)();
