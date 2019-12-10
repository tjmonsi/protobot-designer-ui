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
  const { topicList, save, addMemo, memos, domain } = this;
  const { deployedVersion: dv } = domain || { deployedVersion: null };
  const { page: pageId, crowdId: crowd } = this.queryObject || { page: null };

  console.log(dv)

  return html`
    <style>
      ${styles}
      @import url('https://fonts.googleapis.com/css?family=Noto+Sans&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap');
    </style>

    <div class = "instruction">
      <h3>Instruction</h3>
      <p>In Macro Review, you can explore the whole conversation flows which are followed and prototyped by crowds.</p>
    </div>
    <br>
    <h3>Existing Topic List</h3>
    <ul class ="topic-list">
    ${topicList.map(topic => html`
      <li>
        <topic-list-item class="item" topicId="${topic.id}" .included="${topic.included}">
        </topic-list-item>
      </li>
    `)}
    </ul>
    <br>
    <br>
    <h3>Add Message</h3>
    ${memos.map(({ page, crowdId, memoId, deployedVersion }) => page === pageId && crowdId === crowd && deployedVersion === dv ? html`
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
