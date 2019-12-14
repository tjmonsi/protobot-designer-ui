import { html } from 'lit-element';
import '../topic-list-item';
import 'weightless/textarea';
import 'weightless/button';
import 'weightless/radio';
import '@vaadin/vaadin-radio-button';
import '../protobot-deploy-modal';
import '../version-list';
import '../protobot-memo-all'
// import '@vaadin/vaadin-radio-group';

// @ts-ignore
import styles from './style.css';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { topicList, deploy, domain, handleCommitMsg, dialogVisible, dialogStage, deployUrl, nextDialogStage, toggleDialog, closeDialog, urlGenerator, closeTwoDialog } = this;
  const { commitMessage } = domain || {};

  return html`
    <style>
      ${styles}
    </style>
    <h3>Existing Topic List</h3>

    <ul class ="topic-list">
    ${topicList.map(topic => html`
      <li>
        <topic-list-item class="item" topicId="${topic.id}" .included="${topic.included}">
        </topic-list-item>
      </li>
    `)}
    </ul>

    <div>
      <h3>Commit Message</h3>
      <wl-textarea outlined
        class = "commit-input"
        value="${commitMessage}"
        @change="${handleCommitMsg.bind(this)}"
        @submit="${handleCommitMsg.bind(this)}">
      </wl-textarea outlined>
    </div>

    <!-- <protobot-memo-all></protobot-memo-all> --!>

    <div class="button-container">
      <!-- <wl-button class="button" type="button" @click="${deploy.bind(this)}">Deploy</wl-button> -->
      <wl-button class="button" type="button" @click="${toggleDialog.bind(this)}">Ready to Deploy</wl-button>
      <protobot-deploy-modal ?opened="${dialogVisible}" stage="${dialogStage}" deployUrl="${deployUrl}"
        @dialog-next="${nextDialogStage.bind(this)}"
        @dialog-accept="${urlGenerator.bind(this)}"
        @dialog-cancel="${closeDialog.bind(this)}"
        @dialog-close-2="${closeTwoDialog.bind(this)}">
      </protobot-deploy-modal>

    </div>
  `;
}.bind(self)();
