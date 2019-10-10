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
  const { topics, refreshList } = this;

  return html`
    <style>
      ${styles}
    </style>

    <h1 style="text-align: center">
      Conversational Flow
    </h1>

    ${topics.map((topic, index) => html`
      <conversational-flow-topic topicId="${topic}" index="${index}" @refresh-list="${refreshList.bind(this)}"></conversational-flow-topic>
    `)}
  `;
}.bind(self)();
