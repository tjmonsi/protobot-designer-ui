import { html } from 'lit-element';
import '../protobot-sidebar';
import '../protobot-start';
import '../protobot-authoring';
import '../protobot-authoring-sidebar';
import '../protobot-micro';
import '../protobot-macro';
import '../protobot-history';
import '../protobot-micro-sidebar';
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
    </style>

    ${domain ? html`
      <div class="left">
        <protobot-sidebar></protobot-sidebar>
      </div>
      <div class="center" style="overflow:scroll;">
        ${page === 'authoring' || !page ? html`
          <protobot-authoring></protobot-authoring>
        ` : ''}

        ${page === 'macro' ? html`
          <protobot-macro></protobot-macro>
        ` : ''}

        ${page === 'micro' ? html`
          <protobot-micro></protobot-micro>
        ` : ''}

        ${page === 'history' ? html`
          <protobot-history></protobot-history>
        ` : ''}
      </div>
      <div class="right">
        ${page === 'authoring' || !page ? html`
          <protobot-authoring-sidebar></protobot-authoring-sidebar>
        ` : ''}
        ${page === 'micro' ? html`
          <protobot-micro-sidebar style="display:flex; flex-direction:column; height:100%; padding: 10px;"></protobot-micro-sidebar>
        ` : ''}
      </div>
    ` : html`
      <div style="background: white"></div>
      <protobot-start></protobot-start>
    `}

  `;
}.bind(self)();
