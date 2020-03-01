import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
import '@material/mwc-textfield';
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
      @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap');

    </style>

    <!-- <textarea class="utterance-input" type="text" value="${text}" placeholder="utterance" @change="${utteranceTextChanged.bind(this)}"> -->
    <mwc-textfield outlined class="utterance-input" placeholder="topic" value="${text}" @change="${utteranceTextChanged.bind(this)}"></mwc-textfield>

  `;
}.bind(self)();