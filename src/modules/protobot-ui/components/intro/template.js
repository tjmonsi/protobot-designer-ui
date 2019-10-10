import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
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
    </style>

    <div class="center-modal">
      <form @submit="${submit.bind(this)}">
        <p>
          For Researchers:
        </p>
        <label>
          Put in the domain id of an existing user.<br>
        </label>
        <input id="domain" name="domain" type="text">
        <button>Submit</button>
      </form>
      <div style="padding-top: 48px">
        <p>
          Or click on any of the buttons for a blank domain
        </p>
        <button type="button">New Blank Domain</button>
      </div>
    </div>


  `;
}.bind(self)();
