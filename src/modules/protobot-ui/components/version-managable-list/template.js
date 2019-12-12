import { html } from 'lit-element';
import { until } from 'lit-html/directives/until';
// @ts-ignore
import styles from './style.css';
import 'weightless/button';


import '../conversational-flow-utterance';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { versions, changeVersion, gettingDomainVersion } = this;
  // const { name } = topic || {};

  return html`
    <style>
      ${styles}
    </style>
    <select class="select-box" placeholder="Topic" @change=${changeVersion}>
      <option value="none">Choose the version</option>
      ${versions && versions.map(item => html`
      <option value="${item}" ?selected="${gettingDomainVersion(item, this.domainId) == item}">
      ${until(gettingDomainVersion(item, this.domainId), 'Loading...')}
      </option>`)}
      <option value="new-topic">New Topic</option>

    </select>


  `;
}.bind(self)();
