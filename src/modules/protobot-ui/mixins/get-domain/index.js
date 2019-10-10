// @ts-ignore
import { property } from 'lit-element';
import { database } from '../../../firebase';
import { GetPathMixin } from '../get-path';

/**
 *
 * @param {*} base
 */
export const GetDomainMixin = (base) => (class extends GetPathMixin(base) {
  // @ts-ignore
  @property({ type: Object })
  domain = null;

  // @ts-ignore
  @property({ type: String })
  domainId = null;

  // @ts-ignore
  @property({ type: Array })
  topics = [];

  connectedCallback () {
    super.connectedCallback();

    // @ts-ignore
    const { domain } = this.queryObject || { domain: null };

    if (domain) {
      this.getDomainName(domain);
    }
  }

  /**
   *
   * @param {String} id
   */
  async getDomainName (id) {
    if (id) {
      const snap = await database.ref(`domains/data/${id}`).once('value');
      this.domainId = id;
      this.domain = snap.val() || null;
      const { topics } = this.domain;
      const array = [];
      for (let topic in topics) {
        array.push({ topic, order: topics[topic] });
      }
      this.topics = array.sort((i, j) => (i.order - j.order)).map(i => i.topic);
      this.domainChanged(this.domain);
    }
  }

  domainChanged (domain) { console.log(domain); }
});
