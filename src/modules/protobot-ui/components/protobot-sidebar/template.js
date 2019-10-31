import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
import { until } from 'lit-html/directives/until';
import '../protobot-memo';

/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { domainName, changeDomainName, designerName, changeDesignerName, goMacro, goMicro, goHistory, users, gettingCrowdId } = this;

  return html`
    <style>
      ${styles}
      @import url('https://fonts.googleapis.com/css?family=Noto+Sans&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap');
    </style>

    <h2>Domain</h2>
    <input class="left-side-text" type="text" value="${domainName}" @change="${changeDomainName.bind(this)}">
    <h2>Designer</h2>
    <input class="left-side-text" type="text" value="${designerName}" @change="${changeDesignerName.bind(this)}">
    <br>
    <br>
    <h2>Review pages</h2>
    <ul class = "review-link">
      <li><a href="/?domain=${this.domainId}&page=macro">Macro review</a></li>
      <li><a href="/?domain=${this.domainId}&page=micro">Micro review</a></li>
      <li><a href="/?domain=${this.domainId}&page=history">History review</a></li>
    </ul>
    <br>
    <br>
    <h2>Crowd list</h2>
    <ul class = "crowd-link">
    ${users? users.map(item => html`
      <li>
        <a href="/?domain=${this.domainId}&page=micro">"${until(gettingCrowdId(item.id), 'Loading...')}"</a>
      </li>`) : ''}
    </ul>
    <select class="select-box" placeholder="Topic">
    <option value="none">Choose the topic</option>
    ${users? users.map(item => html`<option value="${item.id}">${until(gettingCrowdId(item.id), 'Loading...')}</option>`) : ''}
    <option value="new-topic">New Topic</option>
    </select>
  `;
}.bind(self)();

