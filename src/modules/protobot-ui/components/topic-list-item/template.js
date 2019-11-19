import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { topic, included } = this;
  const { name } = topic || {};

  return html`
    <style>
      ${styles}
    </style>

    ${name}

    ${!included ? ' - not included' : ''}
  `;
}.bind(self)();
