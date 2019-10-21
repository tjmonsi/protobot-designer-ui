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
  const { topics, deploy } = this;

  return html`
    <style>
      ${styles}
    </style>

    <ul>
    ${topics.map(topic => html`
      <li>
        <topic-list-item class="item" topicId="${topic.id}">
        </topic-list-item>
      </li>
    `)}
    </ul>

    <button class="button" type="button" @click="${deploy.bind(this)}">Deploy</button>
  `;
}.bind(self)();
