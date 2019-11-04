import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
import 'weightless/textarea';
// import 'weightless/button';
/**
 *
 * @param {any} self
 */

export const template = self => function () {

  const { memoContent, handleMemo, updateMemo } = this;

  return html`
    <style>
      ${styles}
      @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap');

    </style>

    <wl-textarea outlined class="memo" style="--primary-hue: 46;  --primary-saturation: 100%;"
    label="Leave Memo Here" value="${memoContent}" @change="${handleMemo.bind(this)}"></wl-textarea>
    <br>
  `;
}.bind(self)();
