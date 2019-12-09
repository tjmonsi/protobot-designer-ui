import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
import { until } from 'lit-html/directives/until';
import '../protobot-memo';
import '../protobot-memo-all';

/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { domainName, changeDomainName, designerName, changeDesignerName, users, gettingCrowdId, queryObject } = this;
  const { page } = queryObject;

  return html`
    <style>
      ${styles}
      @import url('https://fonts.googleapis.com/css?family=Noto+Sans&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Miriam+Libre:700&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap');
    </style>
    <h1>PROTOBOT</h1>
    <h3>Domain</h3>
    <input class="left-side-text" type="text" value="${domainName}" @change="${changeDomainName.bind(this)}">
    <h3>Designer</h3>
    <input class="left-side-text" type="text" value="${designerName}" @change="${changeDesignerName.bind(this)}">
    <br>
    <h3>Pages</h3>
    <ul class = "review-link">
      <li><a href="/?domain=${this.domainId}&page=micro">Micro Review</a></li>
      <li><a href="/?domain=${this.domainId}&page=macro">Macro Review</a></li>
      <li><a href="/?domain=${this.domainId}&page=authoring">Design and Revise</a></li>
      <!-- <li><a href="/?domain=${this.domainId}&page=history">History review</a></li> -->
    </ul>
    ${page === 'micro' ? html`
      <h3>Crowd list</h3>
      <ul class = "crowd-link">
        ${users ? users.map(item => html`
        <li>
          <a href="/?domain=${this.domainId}&page=micro&crowdId=${item.user}&set=1">${until(gettingCrowdId(item.user), 'Loading...')}</a> ${item.data ? Object.keys(item.data).map(i => html`
              <a href="/?domain=${this.domainId}&page=micro&crowdId=${item.user}&set=${i}">${i}</a>
          `) : ''}
        </li>`) : ''}
      </ul>
    ` : ''}

    ${page === 'authoring' ? html`
      <protobot-memo-all></protobot-memo-all>
    ` : ''}
  `;
}.bind(self)();
