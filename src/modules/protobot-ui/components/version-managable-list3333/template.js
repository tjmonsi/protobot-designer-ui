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
  const { versions, changeVersion, gettingDomainVersion, lastDeployedDomainVersion } = this;
  // const { name } = topic || {};

  return html`
    <style>
      ${styles}
    </style>
    <select class="select-box" placeholder="Topic" @change=${changeVersion}>
      ${versions && versions.map(item => html`
      <option value="${item}" ?selected="${lastDeployedDomainVersion === item}">
      ${until(gettingDomainVersion(item, this.domainId), 'Loading...')}
      </option>`)}
    </select>


  `;
}.bind(self)();

/*
${versions && versions.map(item => {
        return until(gettingLatestVersion(this.domainId), false) !== false ?
        html`
      <option value="${item}" ?selected="${gettingDomainVersion(item, this.domainId) == item}">
      ${until(gettingDomainVersion(item, this.domainId), 'Loading...')}
      </option>` : ``
      })}

      */
