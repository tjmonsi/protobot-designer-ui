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
  const { versions, changeVersion, lastDeployedDomainVersion } = this;
  // const { name } = topic || {};

  return html`
    <style>
      ${styles}
    </style>
    <!-- ${lastDeployedDomainVersion} --!>
    <div class="version-container">Version
    <select class="select-box" placeholder="Topic" @change=${changeVersion}>
        ${versions && Object.keys(versions).map(item => html`
        <option value="${item}" ?selected="${lastDeployedDomainVersion == item}">
        ${versions[item].versionNumber}
        </option>`)}
    </div>
    </select>


  `;
}.bind(self)();
