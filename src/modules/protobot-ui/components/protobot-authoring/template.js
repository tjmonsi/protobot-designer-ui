import { html } from 'lit-element';
import '../conversational-flow-topic';
import 'weightless/button';

// @ts-ignore
import styles from './style.css';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { topics, swap } = this;

  return html`
    <style>
      ${styles}
    </style>

    <h1 style="text-align: center">
      Conversational Flow
    </h1>
    <div class="empty-box"></div>
    ${topics.map((topic, index) => html`
      <conversational-flow-topic topicId="${topic.id}" .sub="${topic.sub}" index="${index}"></conversational-flow-topic>

      ${index !== topics.length - 1 ? html`
        <div style="text-align: center">
          <wl-button class="swap-button" style="text-align: center" type="button" @click="${swap.bind(this)}" index="${index}">Swap</wl-button>
        </div>
      ` : ''}
    `)}
  `;
}.bind(self)();
