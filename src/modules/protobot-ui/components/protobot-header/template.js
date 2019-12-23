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
    <div class="header-inner">
      <ul class = "review-link full-width">
        <!-- <li><a href="/?domain=${this.domainId}&page=micro">Micro Review</a></li> -->
        ${[
          ['design-history', 'History'],
          // ['test', 'Test'],
          // eslint-disable-next-line camelcase
          ['macro', 'Review']].map(([page_name, page_label]) => (
          // eslint-disable-next-line camelcase
          html`<li class="${page === page_name && 'active blue'}"><a href="/?domain=${this.domainId}&page=${page_name}${this.queryObject && this.queryObject.deployedVersion ? `&deployedVersion=${this.queryObject.deployedVersion}` : ''}">${page_label}</a></li>`
        ))}
        <!-- <li><a href="/?domain=${this.domainId}&page=history">History review</a></li> -->
      </ul>

      <ul class = "review-link">
        <li class="${page === 'authoring' && 'active'} orange"><a href="/?domain=${this.domainId}&page=authoring">Draft</a></li>
      </ul>
    </div>

    <div class="header-item-group">
      <div class="header-domain">
        <label html-for="domain">Domain</label>
        <input id="domain" class="left-side-text" type="text" value="${domainName}" @change="${changeDomainName.bind(this)}">
      </div>
      <div class="header-designer">
        <label html-for="designerName">Designer</label>
        <input id="designerName" class="left-side-text" type="text" value="${designerName}" @change="${changeDesignerName.bind(this)}">
      </div>
    </div>
  `;
}.bind(self)();
