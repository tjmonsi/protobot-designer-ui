import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
import 'weightless/textarea';
/**
 *
 * @param {any} self
 */

export const template = self => function () {

  return html`
    <style>
      ${styles}
      @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap');

    </style>

    <wl-textarea outlined class="memo" style="--primary-hue: 46;  --primary-saturation: 100%;"
    label="Leave Memo Here" > </wl-textarea>

  `;
}.bind(self)();
