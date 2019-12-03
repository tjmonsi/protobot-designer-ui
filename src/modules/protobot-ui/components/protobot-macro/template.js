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

    <h1>Macro Review</h1>
    <br>


    <div class="sankey"></div>

    <div class="tooltip" @click="${closeTooltip.bind(this)}">
    </div>
  `;
}.bind(self)();
