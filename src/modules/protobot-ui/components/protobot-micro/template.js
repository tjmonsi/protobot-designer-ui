import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
import '@vaadin/vaadin-button';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { crowdID } = this;

  return html`
    <style>
      ${styles}
    </style>

    <h1>Micro Review</h1>
    <h3>Crowd name : ${crowdID}</h3>
    <br>
    <div class = "user-part">
      <div class = "user-label">User</div>
      <vaadin-button 
        theme="primary"
        class = "user-say"
        @click = "$this.addLabel">
      </vaadin-button>
    </div>
    <br>
    <div class = "bot-part">
      <div class = "bot-label">Bot</div>
      <vaadin-button 
        theme= "primary"
        class= "bot-say"
        @click="$this.addLabel">
      </vaadin-button>
    </div>


  `;
}.bind(self)();
