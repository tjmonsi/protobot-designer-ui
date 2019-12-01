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
      @import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap');
    </style>

    ${name}

    <!-- ${!included ? ' - not included' : ''} -->
    ${!included ? html`<button class='new-label'>NEW</button>` : ''}

  `;
}.bind(self)();
