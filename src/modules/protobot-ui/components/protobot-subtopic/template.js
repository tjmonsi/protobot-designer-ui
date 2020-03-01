import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
// import 'weightless/button';
import '../protobot-draft-topic';
import '../protobot-draft-utterance';

/**
 *
 * @param {any} self
 */

export const template = self => function () {
  // const { topicUtterance } = this;

  return html`
    <style>
      ${styles}
      @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap');

    </style>

    <div class = "topic-utterance-set">
      <protobot-draft-topic></protobot-draft-topic>
      <protobot-draft-utterance></protobot-draft-utterance>
    </div>


  `;
}.bind(self)();
