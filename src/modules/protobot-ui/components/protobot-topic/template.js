import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
// import 'weightless/button';
/**
 *
 * @param {any} self
 */

export const template = self => function () {
  const { topicUtterance } = this;

  return html`
    <style>
      ${styles}
      @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap');

    </style>

    <!-- <textarea class="topic-utterance" value="${topicUtterance}" @change="${saveTopic.bind(this)}"><textarea> -->
    <textarea class="topic-utterance" value="${topicUtterance}"><textarea>

    <br>
  `;
}.bind(self)();
