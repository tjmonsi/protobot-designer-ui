// @ts-ignore
import { property } from 'lit-element';
import { database } from '../../../firebase';
import { GetPathMixin } from '../get-path';

/**
 *
 * @param {*} base
 */
export const GetDomainVersionsMixin = (base) => (class extends GetPathMixin(base) {
  // @ts-ignore
  @property({ type: Array })
  versions = [];

  @property({ type: String })
  domainId

  constructor () {
    super();
    this.boundSaveDomainVersions = this.saveDomainVersions.bind(this);
  }

  connectedCallback () {
    super.connectedCallback();

    // @ts-ignore
    const { domain } = this.queryObject || { domain: null };

    if (domain) {
      this.domainId = domain;
      this.getDomainName(domain);
    }
  }

  disconnectedCallback () {
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }

    this.disconnectRef();
  }

  disconnectRef () {
    if (super.disconnectRef) super.disconnectRef();

    if (this.domainVersionsRef) {
      this.domainVersionsRef.off('value', this.boundSaveDomainVersions);
    }
  }

  /**
   *
   * @param {String} id
   */
  getDomainName (id) {
    this.disconnectRef();

    if (id) {
      this.domainVersionsRef = database.ref(`deployed-history/lists/${id}`);
      this.domainVersionsRef.on('value', this.boundSaveDomainVersions);
    }
  }

  saveDomainVersions (snap) {
    const data = snap.val();
    if (data) {
      this.versions = Object.keys(data);
    }
  }

  domainChanged (domain) {}
});
