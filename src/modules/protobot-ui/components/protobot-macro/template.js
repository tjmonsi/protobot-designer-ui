import { html } from 'lit-element';

// @ts-ignore
import styles from './style.css';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { closeTooltip } = this;
  // console.log(this);

  return html`
    <style>
      ${styles}
      @import url('https://fonts.googleapis.com/css?family=Noto+Sans&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap');
    </style>

    <h1>Overview</h1>
    <br>
    <div class="sankey"></div>
    <div class="tooltip" style="display: none" @click="${closeTooltip.bind(this)}">
    </div>

    <!-- <div class="dashboard">
      <div class="no-label-utterance">
        <h3>Label topics below</h3>
      </div>
      <div class="new-topics">
        <h3>New topics</h3>
      </div>
    </div> -->
  `;
}.bind(self)();
