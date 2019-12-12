import { html } from 'lit-element';
import '../conversational-flow-topic';
import '../version-managable-list2';
import 'weightless/button';

// @ts-ignore
import styles from './style.css';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { versionsDetail, changeVersion, lastDeployedDomainVersion } = this;

  return html`
    <style>
      ${styles}
    </style>
    ${lastDeployedDomainVersion}
    <version-managable-list2
      .versions=${versionsDetail}
      lastDeployedDomainVersion=${lastDeployedDomainVersion}
      @change-version=${changeVersion.bind(this)}
      ></version-managable-list2>
  `;
}.bind(self)();
