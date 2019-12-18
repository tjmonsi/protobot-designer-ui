import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';

/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { topic, included, addTopic } = this;
  const { name } = topic || {};

  return html`
    <style>
      ${styles}
      @import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap');
    </style>

    ${name}

    <!-- ${!included ? ' - not included' : ''} --!>
    ${!included ? html`
      ${this.queryObject.page === 'authoring' ? html`
        <button class='new-label' data-id="${this.topicId}" @click="${addTopic.bind(this)}">Insert</button>
      ` : html`
        <button class='new-label'>New</button>
      `}
    ` : ''}

  `;
}.bind(self)();
