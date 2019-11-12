import { html } from 'lit-element';
import '../topic-list-item';
import '../protobot-memo';

// @ts-ignore
import styles from './style.css';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { topics, save, addMemo, memos } = this;
  const { page: pageId } = this.queryObject || { page: null };

  return html`
    <style>
      ${styles}
      @import url('https://fonts.googleapis.com/css?family=Noto+Sans&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap');
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
    <br>
    <br>
    ${memos.map(({ page, memoId }) => page === pageId ? html`
      <protobot-memo .memoId="${memoId}"></protobot-memo>
    ` : '')}
    <div class="add-container">
      <button class="add-button" @click="${addMemo.bind(this)}">+</button>
    </div>
    <!-- <div class="button-container">
      <vaadin-button class="button-save" type="button" @click="${save.bind(this)}">
        Done with Labeling
      </vaadin-button>
    </div> -->


  `;
}.bind(self)();
