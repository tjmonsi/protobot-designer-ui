import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
import 'weightless/button';
import 'weightless/textarea';
import { classMap } from 'lit-html/directives/class-Map';
import '@vaadin/vaadin-radio-button';
import '@vaadin/vaadin-button';


/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { deployedVersion, submit, newDomain, numUser, changeNumUser, numSession, changeNumSession, opened, changeOtherResponse, changeAmtOption } = this;

  return html`
    <style>
      ${styles}
      @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap');
    </style>

    <div class ="${classMap({dialog: true, opened: opened, closed: !opened})}">
      <div class="dialog-window">
        <h1 class="title">How to deploy?</h1>
        <div class = "param1">
          <h3>Number of users<h3>
          <input class="num-users" type="text" value="${numUser}" @change="${changeNumUser.bind(this)}">
        </div>
        <div class = "param2">
          <h3>Number of sessions<h3>
          <input class="num-session" type="text" value="${numSession}" @change="${changeNumSession.bind(this)}">
        </div>
        <div class = "param3">
          <h3>Show other's responses?</h3>
          <vaadin-radio-group class= "other-response" @click="${changeOtherResponse.bind(this)}">
            <vaadin-radio-button class="show">Show</vaadin-radio-button>
            <vaadin-radio-button class="hide">Hide</vaadin-radio-button>
          </vaadin-radio-group>
        </div>
        <div class = "param4">
          <h3>Testing methods</h3>
          <vaadin-radio-group class = "amt" @click="${changeAmtOption.bind(this)}">
            <vaadin-radio-button class="mturk">Amazon Mechanical Turk</vaadin-radio-button>
            <vaadin-radio-button class="link-share">Share Online by myself</vaadin-radio-button>
          </vaadin-radio-group>
        </div>

        <div class="button-container">
          <vaadin-button class="cancel" @click="${() => this.dispatchEvent(new CustomEvent('dialog.cancel'))}">Cancel</vaadin-button>
          <vaadin-button class="deploy" @click="${() => this.dispatchEvent(new CustomEvent('dialog.accept'))}">Deploy</vaadin-button>
        </div>
        </div>
      </div>
    </div>
  `;
}.bind(self)();
