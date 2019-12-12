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

  // @ts-ignore
  @property({ type: Array })
  versions_detail = [];

  // @ts-ignore
  @property({ type: String })
  domainId;

  // @property({ type: String})
  // latestEditedDomainVersion = '';

  // @ts-ignore
  @property({ type: String})
  lastDeployedDomainVersion = '';

  // @ts-ignore
  @property({ type: Array })
  lastDeployedDomainTopics = [];

  constructor () {
    super();
    this.boundSaveDomainVersions = this.saveDomainVersions.bind(this);
    this.boundSaveDomainVersionsDetail = this.saveDomainVersionsDetail.bind(this);
    this.boundSaveLatestDeployedDomainVersion = this.saveLatestDeployedDomainVersion.bind(this);
    this.boundSaveLatestDeployedDomainTopics = this.saveLatestDeployedDomainTopics.bind(this);
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
      this.domainVersionsDetailRef.off('value', this.boundSaveDomainVersionsDetail);
      this.LatestDeployedDomainVersionRef.off('value', this.boundSaveLatestDeployedDomainVersion);
      this.LatestDeployedDomainTopicsRef.off('value', this.boundSaveLatestDeployedDomainTopics);
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

      this.domainVersionsDetailRef = database.ref(`deployed-history/data/${id}`);
      this.domainVersionsDetailRef.on('value', this.boundSaveDomainVersionsDetail);

      this.LatestDeployedDomainVersionRef = database.ref(`last-deployed/data/${id}/deployedVersion`)
      this.LatestDeployedDomainVersionRef.on('value', this.boundSaveLatestDeployedDomainVersion);

      this.LatestDeployedDomainTopicsRef = database.ref(`last-deployed/data/${id}`)
      this.LatestDeployedDomainTopicsRef.on('value', this.boundSaveLatestDeployedDomainTopics);
    }
  }


  saveDomainVersions (snap) {
    const data = snap.val();
    if (data) {
      this.versions = Object.keys(data);
    }
  }

  saveDomainVersionsDetail (snap) {
    const data = snap.val();
    if (data) {
      this.versionsDetail = data;
    }
  }

  saveLatestDeployedDomainVersion (snap) {
    const data = snap.val();
    if (data) {
      this.lastDeployedDomainVersion = data;
    }
  }

  saveLatestDeployedDomainTopics (snap) {
    const domain = snap.val() || { topics: {}, subs: [] };
    const { topics, subs } = domain;
    const array = [];
    for (const topic in topics) {
      array.push({ topic, order: topics[topic], sub: subs[topic] || false });
    }
    this.lastDeployedDomainTopics = array.sort((i, j) => (i.order - j.order)).map(i => ({ id: i.topic, sub: i.sub }));
    console.log(this.lastDeployedDomainTopics)
  }

  async updateLatestDeployedDomainVersion (version) {
    this.lastDeployedDomainVersion = version
    const snap = await database.ref(`deployed-history/data/${this.domainId}/${version}`).once('value');
    this.saveLatestDeployedDomainTopics(snap)
  }

  domainChanged (domain) {}
});
