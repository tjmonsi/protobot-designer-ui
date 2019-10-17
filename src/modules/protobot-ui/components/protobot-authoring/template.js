import { html } from 'lit-element';
import '../conversational-flow-topic';

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

    ${topics.map((topic, index) => html`
      <conversational-flow-topic topicId="${topic.id}" .sub="${topic.sub}" index="${index}"></conversational-flow-topic>

      ${index !== topics.length - 1 ? html`
        <div style="text-align: center">
          <button style="text-align: center" type="button" @click="${swap.bind(this)}" index="${index}">Swap</button>
        </div>
      ` : ''}
    `)}
  `;
}.bind(self)();
