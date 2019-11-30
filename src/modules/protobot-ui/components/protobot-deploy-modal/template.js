import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
import 'weightless/button';
import 'weightless/textarea';
import { classMap } from 'lit-html/directives/class-Map';
import '@vaadin/vaadin-radio-button';

/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { submit, newDomain, numUser, changeNumUser, numSession, changeNumSession} = this;

  return html`
    <style>
      ${styles}
      @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap');
    </style>

    <div class ="${classMap({dialog: true, opened: !this.opened, closed: this.opened})}">
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
        <h3>Testing methods</h3>
        <vaadin-radio-group>
          <vaadin-radio-button class="mturk">Amazon Mechanical Turk</vaadin-radio-button>
          <vaadin-radio-button class="link-share">Share Online by myself</vaadin-radio-button>
        </vaadin-radio-group>
      </div>
      <div class = "param4">
        <h3>Show other's responses?</h3>
        <vaadin-radio-group>
          <vaadin-radio-button class="show">Show</vaadin-radio-button>
          <vaadin-radio-button class="hide">Hide</vaadin-radio-button>
        </vaadin-radio-group>
      </div>
      <div class="button-container">
        <button class="save-button" @click="${() => this.dispatchEvent(new CustomEvent('dialog.cancel'))}">Save</button>
      </div>
  `;
}.bind(self)();
