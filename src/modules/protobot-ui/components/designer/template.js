import { html } from 'lit-element';
import '../left-side';
import '../intro';
import '../ui-one';
// @ts-ignore
import styles from './style.css';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { queryObject } = this;
  const { domain } = queryObject;

  console.log(queryObject);

  return html`
    <style>
      ${styles}
    </style>

    ${domain ? html`
      <div class="left">
        <protobot-left-side></protobot-left-side>
      </div>
      <div class="center">
        <protobot-designer-ui-one></protobot-designer-ui-one>
      </div>
      <div class="right">
        Right
      </div>
    ` : html`
      <div style="background: white"></div>
      <protobot-designer-intro></protobot-designer-intro>
    `}

  `;
}.bind(self)();
