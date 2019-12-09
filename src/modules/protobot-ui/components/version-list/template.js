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
  const { versions, gettingDomainName, changeVersion } = this;
  // const { name } = topic || {};

  return html`
    <style>
      ${styles}
    </style>

    <h2>Versions: </h2>
    <ul>
    ${versions && versions.length ? versions.map(item => html`
      <li>
        <a href="#" @click="${changeVersion}" data-id="${item}">${until(gettingDomainName(item, this.domainId), 'Loading...')}</a>
      </li>
    `) : ''}
    </ul>
  `;
}.bind(self)();
