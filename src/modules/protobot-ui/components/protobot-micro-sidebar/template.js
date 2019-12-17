import { html } from 'lit-element';
import '../topic-list-item';
import '../protobot-memo';
import { until } from 'lit-html/directives/until';
import '../version-list';



// @ts-ignore
import styles from './style.css';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { topicList, save, addMemo, memos, domain, users, gettingCrowdId } = this;
  const { queryObject } = this;
  const { deployedVersion: dv } = domain || { deployedVersion: null };
  const { page: pageId, crowdId: crowd } = queryObject;

  return html`
    <style>
      ${styles}
      @import url('https://fonts.googleapis.com/css?family=Noto+Sans&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap');
    </style>

    <div class = "instruction">
      <h3>Instruction</h3>
      <p>In this stage, you can label the topic for each utterance.
        Please click the select-box to label the topic.</p>
    </div>
    <br>
    <h3>Current Topic List</h3>
    <ul class ="topic-list">
    ${topicList.map(topic => html`
      <li>
        <topic-list-item class="item" .topicId="${topic.id}" .included="${topic.included}">
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
    <h3>Crowd list</h3>
    <ul class = "crowd-link">
      ${users ? users.map(item => html`
      <li>
        <a href="/?domain=${this.domainId}&page=micro&crowdId=${item.user}&set=1">${until(gettingCrowdId(item.user), 'Loading...')}</a> ${item.data ? Object.keys(item.data).map(i => html`
            <a href="/?domain=${this.domainId}&page=micro&crowdId=${item.user}&set=${i}">${i}</a>
        `) : ''}
      </li>`) : ''}
    </ul>
    <version-list></version-list>

  `;
}.bind(self)();
