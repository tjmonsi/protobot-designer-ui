import { html } from "lit-element";
// @ts-ignore
import styles from './style.css';
import '../to-do-list';

/**
 *
 * @param {any} self
 */

export const template = self => function () {

  // const {} = this;
  return html`
    <style>
      ${styles}
    </style>

    <to-do-list></to-do-list>

  `;
}.bind(self)();