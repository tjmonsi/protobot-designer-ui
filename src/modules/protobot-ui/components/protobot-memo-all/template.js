import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
import { until } from 'lit-html/directives/until';
import '@vaadin/vaadin-checkbox';


/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { gettingMemo, memos, gettingMemoPage } = this;

  return html`
    <style>
      ${styles}
      @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap');
    </style>

    <h3>All memos</h3>
    <div class = "memo-list">
      ${memos ? memos.map(item => html`
      <vaadin-checkbox class = "${until(gettingMemoPage(item.memoId), '')}">
        ${until(gettingMemo(item.memoId), 'Loading...')}
      </vaadin-checkbox>`) : ''}
    </div>

  `;
}.bind(self)();
