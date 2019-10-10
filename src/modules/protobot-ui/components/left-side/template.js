import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { domainName, changeDomainName, designerName, changeDesignerName } = this;

  return html`
    <style>
      ${styles}
    </style>

    <h1>Domain</h1>
    <input class="left-side-text" type="text" value="${domainName}" @change="${changeDomainName.bind(this)}">

    <h1>Designer</h1>
    <input class="left-side-text" type="text" value="${designerName}" @change="${changeDesignerName.bind(this)}">
  `;
}.bind(self)();
