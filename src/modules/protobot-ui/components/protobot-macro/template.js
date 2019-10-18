import { html } from 'lit-element';

// @ts-ignore
import styles from './style.css';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  // const { topic } = this;
  console.log(this);

  return html`
    <style>
      ${styles}
    </style>

    Macro
  `;
}.bind(self)();
