import { html } from 'lit-element';
import '../protobot-sidebar';
import '../protobot-start';
import '../protobot-authoring';
import '../protobot-authoring-sidebar';
import '../protobot-micro';
import '../protobot-macro';
import '../protobot-history';
import '../protobot-macro-sidebar';
import '../protobot-micro-sidebar';
import '../protobot-history-sidebar';
import 'weightless/ripple';


// @ts-ignore
import styles from './style.css';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { queryObject } = this;
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
      <div class="left" style="overflow:scroll;">
        <protobot-sidebar></protobot-sidebar>
      </div>
      <div class="center" style="overflow:scroll;">
        ${page === 'authoring' ? html`
          <protobot-authoring></protobot-authoring>
        ` : ''}

        ${page === 'macro' ? html`
          <protobot-macro></protobot-macro>
        ` : ''}

        ${page === 'micro' || !page ? html`
          <protobot-micro></protobot-micro>
        ` : ''}

        ${page === 'history' ? html`
          <protobot-authoring></protobot-authoring>
        ` : ''}
      </div>
      <div class="right" style="overflow:scroll;">
        ${page === 'authoring' || !page ? html`
          <protobot-authoring-sidebar style="display:flex; flex-direction:column; height:100%; padding: 10px;"></protobot-authoring-sidebar>
        ` : ''}
        ${page === 'macro' ? html`
          <protobot-macro-sidebar style="display:flex; flex-direction:column; height:100%; padding: 10px;"></protobot-macro-sidebar>
        ` : ''}
        ${page === 'micro' ? html`
          <protobot-micro-sidebar style="display:flex; flex-direction:column; height:100%; padding: 10px;"></protobot-micro-sidebar>
        ` : ''}
        ${page === 'history' ? html`
          <protobot-history-sidebar></protobot-history-sidebar>
        ` : ''}
      </div>
    ` : html`
      <div style="background: white"></div>
      <protobot-start></protobot-start>
    `}

  `;
}.bind(self)();
