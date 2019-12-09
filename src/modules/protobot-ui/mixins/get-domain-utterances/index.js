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
    const { domain, crowdId, set, page } = this.queryObject || { domain: null, crowdId: null };

    if (!crowdId) {
      console.log(crowdId);
      // window.location.href = `/?page=${page || 'micro'}&domain=${domain}&crowdId=-Lr7LknQcW1sqZd1dzDZ&set=1`;
      this.getDefaultUser(domain, page);
      return;
    }

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

  async getDefaultUser (domainId, page) {

    if (domainId) {
      const dsnap = await database.ref(`domains/data/${domainId}`).once('value');
      const domain = dsnap.val() || null;
      if (domain) {
        const snap = await database.ref(`users/lists/domains/${domainId}/${domain.deployedVersion}`).once('value');
        const data = snap.val() || null;
        console.log(data, domain, domainId);
        if (data) {
          const array = Object.keys(data);
          window.location.href = `/?page=${page || 'micro'}&domain=${domainId}&crowdId=${array[0]}&set=1`;
        }
      }
    }
  }

  /**
   *
   * @param {String} id
   */
  getDomainUtterances (id, crowdId, set = '1') {
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

  domainUtterancesChanged (data) { }
});
