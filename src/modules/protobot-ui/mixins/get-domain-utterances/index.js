// @ts-ignore
import { property } from 'lit-element';
import { database } from '../../../firebase';
import { GetPathMixin } from '../get-path';

/**
 *
 * @param {*} base
 */
export const GetDomainUtterancesMixin = (base) => (class extends GetPathMixin(base) {
  // @ts-ignore
  @property({ type: String })
  setId = '';

  // @ts-ignore
  @property({ type: String })
  crowdId = '';

  // @ts-ignore
  @property({ type: Array })
  utterances = [];

  constructor () {
    super();
    this.boundSaveDomainUtterances = this.saveDomainUtterances.bind(this);
  }

  connectedCallback () {
    super.connectedCallback();

    // @ts-ignore
    const { domain, crowdId, set } = this.queryObject || { domain: null, crowdId: null };

    if (domain) {
      this.getDomainUtterances(domain, crowdId, set);
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

    if (this.domainUtterancesRef) {
      this.domainUtterancesRef.off('value', this.boundSaveDomainUtterances);
    }
  }

  /**
   *
   * @param {String} id
   */
  getDomainUtterances (id, crowdId = '-Lr7LknQcW1sqZd1dzDZ', set = '1') {
    this.disconnectRef();

    // console.log(id, crowdId);
    this.crowdId = crowdId;
    this.setId = set;

    if (id && crowdId && set) {
      this.domainUtterancesRef = database.ref(`users/lists/domain-utterances/${crowdId}/${id}/${set}`);
      this.domainUtterancesRef.on('value', this.boundSaveDomainUtterances);
    } else {
      console.log('No values for id-crowdId: ', id, crowdId);
    }
  }

  saveDomainUtterances (snap) {
    const data = snap.val() || null;
    // console.log(data);
    const array = [];
    if (data) {
      for (const utterance in data) {
        array.push({ utterance, order: data[utterance] });
      }
      this.utterances = array.sort((i, j) => (i.order - j.order)).map(i => ({ id: i.utterance }));
      this.domainUtterancesChanged(this.utterances);
    }
  }

  domainUtterancesChanged (data) { console.log(data); }
});
