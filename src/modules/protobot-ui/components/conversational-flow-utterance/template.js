import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { utterance, utteranceTextChanged, readonly} = this;
  const { text } = utterance || {};

  return html`
    <style>
      ${styles}
    </style>

    ${
      readonly ?
      html`
        <div class="text-area">
        ${text}
        </div>

      `:
      html`<input class="text-area" type="text" value="${text}" placeholder="utterance" @change="${utteranceTextChanged.bind(this)}">`
    }


  `;
}.bind(self)();
