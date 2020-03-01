import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
import '@material/mwc-textarea';
/**
 *
 * @param {any} self
 */

export const template = self => function () {
  // @ts-ignore
  const { topic, topicNameChanged, mainUtteranceId, newTopic, subTopic, deleteTopic, sub, readonly } = this;
  const { topicName } = topic || {};

  return html`
    <style>
      ${styles}
      @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap');

    </style>

    <!-- <textarea class="topic-input" type="text" value="${topicName}" placeholder="topic" @change="${topicNameChanged.bind(this)}"> -->
    <mwc-textarea outlined class="topic-input" placeholder="topic" value="${topicName}" @change="${topicNameChanged.bind(this)}"></mwc-textarea>

  `;
}.bind(self)();