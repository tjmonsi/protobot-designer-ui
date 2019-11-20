import { html } from 'lit-element';
import '../topic-list-item';
import 'weightless/textarea';
import 'weightless/button';

// @ts-ignore
import styles from './style.css';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { topicList, deploy, domain, handleCommitMsg } = this;
  const { commitMessage } = domain || {};

  return html`
    <style>
      ${styles}
    </style>
    <h3>Current topic list</h3>

    <ul class ="topic-list">
    ${topicList.map(topic => html`
      <li>
        <topic-list-item class="item" topicId="${topic.id}" .included="${topic.included}">
        </topic-list-item>
      </li>
    `)}
    </ul>

    <div>
      <h3>Leave Message Here</h3>
      <wl-textarea outlined
        class = "commit-input"
        value="${commitMessage}"
        @change="${handleCommitMsg.bind(this)}"
        @submit="${deploy.bind(this)}">
      </wl-textarea outlined>
    </div>

    <div class="button-container">
      <wl-button class="button" type="button" @click="${deploy.bind(this)}">Deploy</wl-button>
    </div>
  `;
}.bind(self)();
