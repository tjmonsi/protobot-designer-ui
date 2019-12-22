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
  // eslint-disable-next-line camelcase
  versions_detail = [];

  // @ts-ignore
  @property({ type: String })
  domainId;

  // @property({ type: String})
  // latestEditedDomainVersion = '';

  // @ts-ignore
  @property({ type: String })
  lastDeployedDomainVersion = '';

  // @ts-ignore
  @property({ type: Array })
  lastDeployedDomainTopics = [];

  // @ts-ignore
  @property({ type: Array })
  lastDeployedDomainTopicList = [];

  // @ts-ignore
  @property({ type: String })
  lastDeployedDomainCommitMessage = '';

  // @ts-ignore
  @property({ type: Object })
  lastDeployedDomainParameters = {};

  constructor () {
    super();
    this.boundSaveDomainVersions = this.saveDomainVersions.bind(this);
    this.boundSaveDomainVersionsDetail = this.saveDomainVersionsDetail.bind(this);
    this.boundSaveLatestDeployedDomainVersion = this.saveLatestDeployedDomainVersion.bind(this);
    this.boundSaveLatestDeployedDomain = this.saveLatestDeployedDomain.bind(this);
  }

  connectedCallback () {
    super.connectedCallback();

    // @ts-ignore
    const { domain, deployedVersion } = this.queryObject || { domain: null, deployedVersion: null };

    if (domain) {
      this.domainId = domain;
      this.getDomainName(domain, deployedVersion);
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
      this.LatestDeployedDomainRef.off('value', this.boundSaveLatestDeployedDomain);
    }
  }

  /**
   *
   * @param {String} id
   */
  getDomainName (id, deployedVersion) {
    this.disconnectRef();

    if (id) {
      this.domainVersionsRef = database.ref(`deployed-history/lists/${id}`);
      this.domainVersionsRef.on('value', this.boundSaveDomainVersions);

      this.domainVersionsDetailRef = database.ref(`deployed-history/data/${id}`);
      this.domainVersionsDetailRef.on('value', this.boundSaveDomainVersionsDetail);

      if (deployedVersion) {
        this.LatestDeployedDomainVersionRef = database.ref(`deployed-history/data/${id}/${deployedVersion}/deployedVersion`);
        this.LatestDeployedDomainVersionRef.on('value', this.boundSaveLatestDeployedDomainVersion);

        this.LatestDeployedDomainRef = database.ref(`deployed-history/data/${id}/${deployedVersion}`);
        this.LatestDeployedDomainRef.on('value', this.boundSaveLatestDeployedDomain);

        this.LatestDeployedDomainRef = database.ref(`deployed-history/data/${id}/${deployedVersion}`);
        this.LatestDeployedDomainRef.on('value', this.boundSaveLatestDeployedDomain);
      } else {
        this.LatestDeployedDomainVersionRef = database.ref(`last-deployed/data/${id}/deployedVersion`);
        this.LatestDeployedDomainVersionRef.on('value', this.boundSaveLatestDeployedDomainVersion);

        this.LatestDeployedDomainRef = database.ref(`last-deployed/data/${id}`);
        this.LatestDeployedDomainRef.on('value', this.boundSaveLatestDeployedDomain);

        this.LatestDeployedDomainRef = database.ref(`last-deployed/data/${id}`);
        this.LatestDeployedDomainRef.on('value', this.boundSaveLatestDeployedDomain);
      }
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
    // console.log(data);
    if (data) {
      this.lastDeployedDomainVersion = data;
    }
  }

  saveLatestDeployedDomain (snap) {
    const domain = snap.val() || { topics: {}, subs: [] };
    const { topics, subs, topicList, commitMessage, parameters } = domain;
    const array = [];
    for (const topic in topics) {
      array.push({ topic, order: topics[topic], sub: subs[topic] || false });
    }
    this.lastDeployedDomainTopics = array.sort((i, j) => (i.order - j.order)).map(i => ({ id: i.topic, sub: i.sub }));

    const arraytwo = [];
    for (const topic in topics) {
      arraytwo.push({ id: topic, included: true });
    }

    for (const topic in topicList) {
      if (arraytwo.findIndex(item => item.id === topic) < 0) {
        arraytwo.push({ id: topic, included: false });
      }
    }

    this.lastDeployedDomainTopicList = arraytwo;
    this.lastDeployedDomainCommitMessage = commitMessage;
    this.lastDeployedDomainParameters = {
      'Number of users': parameters.numUser,
      'Number of sessions': parameters.numSession,
      'Show other\'s responses?': parameters.otherResponse,
      'Testing Methods': parameters.ampOption ? 'Amazon Mechanical Turk' : 'Share Online by myself'
    };
  }

  async updateLatestDeployedDomainVersion (version) {
    this.lastDeployedDomainVersion = version;

    window.history.pushState({ domain: this.queryObject.domain, deployedVersion: version, page: this.queryObject.page }, '', `/?domain=${this.queryObject.domain}&page=${this.queryObject.page}&deployedVersion=${version}`);
    const snap = await database.ref(`deployed-history/data/${this.domainId}/${version}`).once('value');
    this.saveLatestDeployedDomain(snap);
  }

  domainChanged (domain) {}
});
