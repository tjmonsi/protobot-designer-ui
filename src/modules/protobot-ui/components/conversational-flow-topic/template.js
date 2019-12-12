import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
import 'weightless/button';


import '../conversational-flow-utterance';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { topic, topicNameChanged, mainUtteranceId, newTopic, subTopic, deleteTopic, sub, readonly } = this;
  const { name } = topic || {};

  return html`
    <style>
      ${styles}
    </style>

    <div class="flex-area ${sub ? 'sub' : ''}">
      <div class="flex-1">
        <input class="text-area" type="text" value="${name}" placeholder="topic" readonly=${readonly} @change="${topicNameChanged.bind(this)}">
      </div>


      <conversational-flow-utterance .utteranceId="${mainUtteranceId}" ?readonly=${readonly} class="${sub ? 'sub-utter': ''}"></conversational-flow-utterance>



      ${!readonly ? html`
        ${!sub ? html`
          <wl-button type="button" @click="${newTopic.bind(this)}">New</wl-button>
          <wl-button type="button" @click="${subTopic.bind(this)}">Sub</wl-button>
        ` : html`
          <wl-button type="button" @click="${subTopic.bind(this)}">New</wl-button>
        `}
        <wl-button type="button" @click="${deleteTopic.bind(this)}">Delete</wl-button>
      `:``}



    </div>
  `;
}.bind(self)();
