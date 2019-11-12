// @ts-ignore
import { property } from 'lit-element';

// Extend the LitElement base class
/**
 *
 * @param {*} base
 */
export const GetPathMixin = (base) => (class extends base {
  // @ts-ignore
  @property({ type: String })
  path = '';

  // @ts-ignore
  @property()
  query = '';

  // @ts-ignore
  @property()
  queryObject = {};

  connectedCallback () {
    super.connectedCallback();
    this.updatePath();
  }

  updatePath () {
    const { location } = window;
    const { pathname, search } = location;
    this.path = decodeURIComponent(pathname);
    this.query = search.slice(1);
    this.queryObject = this.decodeParams(this.query);
  }

  /**
   *
   * @param {string} paramString
   */
  decodeParams (paramString) {
    const params = {};
    // Work around a bug in decodeURIComponent where + is not
    // converted to spaces:
    paramString = (paramString || '').replace(/\+/g, '%20');
    const paramList = paramString.split('&');
    for (let i = 0; i < paramList.length; i++) {
      const param = paramList[i].split('=');
      if (param[0]) {
        // @ts-ignore
        params[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || '');
      }
    }
    return params;
  }
});
