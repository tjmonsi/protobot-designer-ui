import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { domainName, changeDomainName, designerName, changeDesignerName, goMacro, goMicro, goHistory } = this;

  return html`
    <style>
      ${styles}
    </style>

    <h1>Domain</h1>
    <input class="left-side-text" type="text" value="${domainName}" @change="${changeDomainName.bind(this)}">

    <h1>Designer</h1>
    <input class="left-side-text" type="text" value="${designerName}" @change="${changeDesignerName.bind(this)}">
    <br>
    <br>
    <br>
    <h1>Review pages</h1>
    <ul class = "review-link">
      <li><a href="/?domain=${this.domainId}&page=macro">Macro review</a></li>
      <li><a href="/?domain=${this.domainId}&page=micro">Micro review</a></li>
      <li><a href="/?domain=${this.domainId}&page=history">History review</a></li>
    </ul>
  `;
}.bind(self)();
