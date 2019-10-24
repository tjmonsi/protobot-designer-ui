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
      @import url('https://fonts.googleapis.com/css?family=Noto+Sans&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
    </style>

    <h1>Micro Review</h1>
    <h3>Crowd name : ${crowdID}</h3>
    <br>
    <div class = "user-part">
      <div class = "user-label">User</div>
      <vaadin-button
        theme= "primary"
        class = "user-say"
        @click = "$this.addLabel"> User said!
      </vaadin-button>
    </div>
    <br>
    <div class = "bot-part">
      <div class = "bot-label">Bot</div>
      <vaadin-button
        theme= "contrast primary"
        class= "bot-say"
        @click="$this.addLabel"> Bot said!
      </vaadin-button>
    </div>
    <div class = "topic">
      <vaadin-button>
        <iron-icon icon="lumo:edit" slot="prefix"></iron-icon>
        topic
      </vaadin-button>
    </div>

  `;
}.bind(self)();
