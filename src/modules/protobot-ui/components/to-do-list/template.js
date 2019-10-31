import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';

/**
 *
 * @param {any} self
 */

export const template = self => function () {

  return html`
  <style>
    ${styles}
  </style>

  <h2>Planning for revision</h2>


  `;
}.bind(self)();