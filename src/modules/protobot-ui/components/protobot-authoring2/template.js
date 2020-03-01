import { html } from 'lit-element';
import '../conversational-flow-topic';
import 'weightless/button';
import '../protobot-topic';

// @ts-ignore
import styles from './style.css';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { topics, swap, addTopic, addSub, hello } = this;
  console.log(topics)
  return html`
    <style>
      ${styles}
    </style>

    <div class = "authoring-left">
      <wl-button class="topic-button" style="text-align: center" type="button" @click="${addTopic.bind(this)}">Message</wl-button>
      <wl-button class="sub-button" style="text-align: center" type="button" @click="${addSub.bind(this)}">Sub-Message</wl-button>
    </div>

    <div class = "authoring-center">
    <!-- ${topics.map((topic, index) => html`
      <conversational-flow-topic topicId="${topic.id}" .sub="${topic.sub}" index="${index}"></conversational-flow-topic>

      ${index !== topics.length - 1 ? html`
        <div style="text-align: center">
          <wl-button class="swap-button" style="text-align: center" type="button" @click="${swap.bind(this)}" index="${index}">Swap</wl-button>
        </div>
      ` : ''}
    `)} -->

    ${hello.map((topic, index) => html`${topic}`)}
      <protobot-topic></protobot-topic>
    </div>
  `;
}.bind(self)();
