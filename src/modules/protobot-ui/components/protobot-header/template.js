import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
import { until } from 'lit-html/directives/until';
import '../protobot-memo';
import '../protobot-memo-all';
import '../version-managable-list';

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

      <div class="header-item-group">
        <label>Version</label>
        <version-managable-list></version-managable-list>
      </div>
      <ul class = "review-link">
        <!-- <li><a href="/?domain=${this.domainId}&page=micro">Micro Review</a></li> -->
        ${[
          ['authoring', 'Design'],
          ['test', 'Test'],
          ['macro', 'Review']].map(([page_name, page_label]) => (
          html`<li class="${page == page_name && 'active'}"><a href="/?domain=${this.domainId}&page=${page_name}">${page_label}</a></li>`
        ))}

        <!-- <li><a href="/?domain=${this.domainId}&page=history">History review</a></li> -->
      </ul>


      <div class="header-item-group">
        <label html-for="domain">Domain</label>
        <input id="domain" class="left-side-text" type="text" value="${domainName}" @change="${changeDomainName.bind(this)}">
      </div>

      <div class="header-item-group">
        <label html-for="designerName">Designer</label>
        <input id="designerName" class="left-side-text" type="text" value="${designerName}" @change="${changeDesignerName.bind(this)}">
      </div>


  `;
}.bind(self)();
