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
  const { utterance, topics, selectedTopic, gettingTopic, textInputVisible } = this;
  const { text, bot } = utterance || {};

  return html`
    <style>
      ${styles}
    </style>

    ${utterance ? html`
      <div class="feed ${!bot ? 'feed__right' : ''}">
        <div>
          <div class="label">${bot ? 'Bot' : 'User'}</div>
          <div class ="utterance ${!bot ? 'utterance__right' : ''}"> ${text}</div>

          <div class="select-container ${!bot ? 'select-container__right' : ''}">
            <div class = "select-topic">
              <select class="select-box" placeholder="Topic" @change=${selectedTopic.bind(this)}>
                <option value="none">Choose the topic</option>
                ${topics ? topics.map(item => html`<option value="${item.id}">${until(gettingTopic(item.id), 'Loading...')}</option>`) : ''}
                <option value="new-topic">New Topic</option>
              </select>
            </div>
            ${textInputVisible ? html`
              <div class="new-topic-input">
                <input type="text" class="input-box"  value="new label">
              </div>
              ` : ''}
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

// theme= "${bot ? 'contrast' : ''} primary"
