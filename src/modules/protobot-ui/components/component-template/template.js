import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { index } = this;

  return html`
    <style>
      ${styles}
    </style>

    ${index}
  `;
}.bind(self)();
