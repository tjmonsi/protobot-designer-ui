import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
import 'weightless/button';
import 'weightless/textarea';


/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { submit } = this;

  return html`
    <style>
      ${styles}
      @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap');
    </style>

    <div class="center-modal">
      <form @submit="${submit.bind(this)}">
        <p>
          For Designers:
        </p>
        <label>
          Fill in the domain id of an existing user.<br>
        </label>
        <input class= "domain-id" id="domain" name="domain" type="text">
        <wl-button class ="submit-button">Submit</wl-button>
      </form>
      <div style="padding-top: 48px">
        <p>
          Or click on any of the buttons for a blank domain
        </p>
        <wl-button class ="new-button">New Blank Domain</wl-button>
      </div>
    </div>


  `;
}.bind(self)();
