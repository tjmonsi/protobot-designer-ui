import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';

import '../conversational-flow-utterance';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { topic, topicNameChanged, mainUtteranceId, newTopic, subTopic, deleteTopic } = this;
  const { name, sub } = topic || {};

  return html`
    <style>
      ${styles}
    </style>

    <div class="flex-area ${sub ? 'sub' : ''}">
      <div class="flex-1">
        <input class="text-area" type="text" value="${name}" placeholder="topic" @change="${topicNameChanged.bind(this)}">
      </div>

      <div class="flex-2">
        <conversational-flow-utterance .utteranceId="${mainUtteranceId}" ></conversational-flow-utterance>
      </div>

      <button type="button" @click="${newTopic.bind(this)}">New</button>

      <!-- ternary expression -->
      ${!sub
    ? html`<button type="button" @click="${subTopic.bind(this)}">Sub</button>`
    : ''}

      <button type="button" @click="${deleteTopic.bind(this)}">Delete</button>
    </div>
  `;
}.bind(self)();
