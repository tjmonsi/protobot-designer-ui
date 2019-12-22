import { html } from 'lit-element';
import '../topic-list-item';
import 'weightless/textarea';
import 'weightless/button';
import 'weightless/radio';
import '@vaadin/vaadin-radio-button';
import '../protobot-deploy-modal';
import '../version-list';
import '../protobot-memo-all'
import '../version-managable-list2';
// import '@vaadin/vaadin-radio-group';

// @ts-ignore
import styles from './style.css';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { versionsDetail, changeVersion, lastDeployedDomainVersion, lastDeployedDomainTopicList, lastDeployedDomainCommitMessage } = this;

  return html`
    <style>
      ${styles}
    </style>
    <version-managable-list2
      .versions=${versionsDetail}
      lastDeployedDomainVersion=${lastDeployedDomainVersion}
      @change-version=${changeVersion.bind(this)}
      ></version-managable-list2>

      <h3>Existing Topic List</h3>

      <ul class ="topic-list">
        ${lastDeployedDomainTopicList.map(topic => html`
          <li>
            <topic-list-item class="item" topicId="${topic.id}" .included="${topic.included}"></topic-list-item>
          </li>

        `)}
      </ul>

      <div>
        <h3>Commit Message</h3>
        <div class="commit-msg">
          ${lastDeployedDomainCommitMessage}
        </div>
      </div>

  `;
}.bind(self)();
