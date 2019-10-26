import { html } from 'lit-element';
import '../topic-list-item';

// @ts-ignore
import styles from './style.css';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { topics, save } = this;

  return html`
    <style>
      ${styles}
    </style>
    <div class = "instruction">
      <h2>Instruction</h2>
      <p>In this stage, you can label the topic for each utterance.
        Please click the select-box to label the topic.</p>
    </div>
    <br>
    <h2>Current Topic List</h2>
    <ul class ="topic-list">
    ${topics.map(topic => html`
      <li>
        <topic-list-item class="item" topicId="${topic.id}">
        </topic-list-item>
      </li>
    `)}
    </ul>
    <div class="button-container">
      <vaadin-button class="button-save" type="button" @click="${save.bind(this)}">
        Done with Labeling
      </vaadin-button>
    </div>

  `;
}.bind(self)();
