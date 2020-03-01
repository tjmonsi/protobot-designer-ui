import { html } from 'lit-element';
import '../conversational-flow-topic';
import 'weightless/button';
import '../protobot-topic';
import '../protobot-subtopic';

// @ts-ignore
import styles from './style.css';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { topics, swap, newTopic, subTopic, hello } = this;
  return html`
    <style>
      ${styles}
    </style>

    <div class = "authoring-left">
      <wl-button class="topic-button" style="text-align: center" type="button" @click="${newTopic.bind(this)}">Message</wl-button>
      <wl-button class="sub-button" style="text-align: center" type="button" @click="${subTopic.bind(this)}">Sub-Message</wl-button>
    </div>

    <div class = "authoring-center">
      <protobot-topic></protobot-topic>
      <protobot-subtopic></protobot-subtopic>
    </div>
  `;
}.bind(self)();
