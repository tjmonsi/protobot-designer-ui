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

  // @ts-ignore
  @property({ type: Array })
  topicList = [];

  constructor () {
    super();
    this.boundSaveDomain = this.saveDomain.bind(this);
  }

  connectedCallback () {
    super.connectedCallback();

    // @ts-ignore
    const { domain } = this.queryObject || { domain: null };

    if (domain) {
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

    if (this.domainRef) {
      this.domainRef.off('value', this.boundSaveDomain);
    }
  }

  /**
   *
   * @param {String} id
   */
  getDomainName (id) {
    this.disconnectRef();

    if (id) {
      this.domainRef = database.ref(`domains/data/${id}`);
      this.domainRef.on('value', this.boundSaveDomain);
    }
  }

  saveDomain (snap) {
    this.domainId = snap.key;
    this.domain = snap.val() || { topics: {}, subs: [] };
    const { topics, subs, topicList } = this.domain;
    const array = [];
    for (const topic in topics) {
      array.push({ topic, order: topics[topic], sub: subs[topic] || false });
    }
    this.topics = array.sort((i, j) => (i.order - j.order)).map(i => ({ id: i.topic, sub: i.sub }));

    const arraytwo = [];
    for (const topic in topics) {
      arraytwo.push({ id: topic, included: true });
    }

    for (const topic in topicList) {
      if (arraytwo.findIndex(item => item.id === topic) < 0) {
        arraytwo.push({ id: topic, included: false });
      }
    }

    this.topicList = arraytwo;

    this.domainChanged(this.domain);
  }

  domainChanged (domain) {}
});
