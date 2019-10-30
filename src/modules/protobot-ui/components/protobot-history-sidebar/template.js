import { html } from "lit-element";
// @ts-ignore
import styles from './style.css';

/**
 *
 * @param {any} self
 */

export const template = self => function () {

  const {} = this;
  return html`
    <style>
      ${styles}
    </style>


  `;
}.bind(self)();