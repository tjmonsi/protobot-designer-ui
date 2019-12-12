import { html } from 'lit-element';
import '../conversational-flow-topic';
// import '../version-managable-list2';
import 'weightless/button';

// @ts-ignore
import styles from './style.css';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { lastDeployedDomainVersion, lastDeployedDomainTopics } = this;

  return html`
    <style>
      ${styles}
    </style>
    ${lastDeployedDomainVersion}
    ${lastDeployedDomainTopics.map((topic, index) => html`
      <div class="topic-container">
        <conversational-flow-topic topicId="${topic.id}" .sub="${topic.sub}" ?readonly=${true} index="${index}"></conversational-flow-topic>
      </div>
    `)}

  `;
}.bind(self)();
