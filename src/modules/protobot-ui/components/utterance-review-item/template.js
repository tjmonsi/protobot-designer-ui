import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
import { until } from 'lit-html/directives/until';

import '@vaadin/vaadin-button';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { utterance, topics, selectedTopic, gettingTopic } = this;

  const { text, bot } = utterance || {};

  return html`
    <style>
      ${styles}
    </style>

    ${utterance ? html`
      <div class="feed ${!bot ? 'feed__right' : ''}">
        <div>
          <div class="label">${bot ? 'Bot' : 'User'}</div>
          <vaadin-button
            theme= "${bot ? 'contrast' : ''} primary"
            class = "user-say"> ${text}
          </vaadin-button>

          <div class="button-container ${!bot ? 'button-container__right' : ''}">
            <select placeholder="Topic" @change=${selectedTopic.bind(this)}>
              <option value="none"></option>
              ${topics ? topics.map(item => html`<option value="${item.id}">${until(gettingTopic(item.id), 'Loading...')}</option>`) : ''}
              <option value="new-topic">New Topic</option>
            </select>
            <!--  -->
          </div>
        </div>
      </div>
    ` : ''}


  `;
}.bind(self)();

/**
 * <select @change=${selectedTopic.bind(this)}>
            ${topics ? topics.map(item => html`<option value="${item.id}">${item.id}</option>`) : ''}
            <option value="new-topic">New Topic</option>
          </select>
 */
