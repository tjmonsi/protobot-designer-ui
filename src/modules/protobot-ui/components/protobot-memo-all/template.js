import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';

/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { gettingMemo } = this;

  return html`
    <style>
      ${styles}
      @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap');
    </style>

    <h3>All memos</h3>
    <!-- <ul class = "memo-list">
      ${users ? users.map(item => html`
      <li>
        ${until(gettingCrowdId(item), 'Loading...')}
      </li>`) : ''}
    </ul> -->

  `;
}.bind(self)();