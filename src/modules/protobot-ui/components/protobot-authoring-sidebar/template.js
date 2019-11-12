import { html } from 'lit-element';
import '../topic-list-item';
import 'weightless/textarea';

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
    <h3>Topic list</h3>

    <ul class ="topic-list">
    ${topics.map(topic => html`
      <li>
        <topic-list-item class="item" topicId="${topic.id}">
        </topic-list-item>
      </li>
    `)}
    </ul>

    <div>
      <h3>Leave Message Here</h3>
      <!-- <textarea class="commit-input" placeholder="Write here ..."></textarea> -->
      <wl-textarea outlined
        class = "commit-input"
        placeholder="Write here ...">
      </wl-textarea outlined>
    </div>

    <div class="button-container">
      <button class="button" type="button" @click="${deploy.bind(this)}">Deploy</button>
    </div>
  `;
}.bind(self)();
