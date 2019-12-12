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

  constructor () {
    super();
    this.boundSaveDomainVersions = this.saveDomainVersions.bind(this);
    this.boundSaveDomainVersionsDetail = this.saveDomainVersionsDetail.bind(this);
    // this.boundSaveLatestEditedDomainVersion = this.saveLatestEditedDomainVersion.bind(this);
    this.boundSaveLatestDeployedDomainVersion = this.saveLatestDeployedDomainVersion.bind(this);
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
      // this.LatestEditedDomainVersionRef.off('value', this.boundSaveLatestEditedDomainVersion);
      this.LatestDeployedDomainVersionRef.off('value', this.boundSaveLatestDeployedDomainVersion);
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

      // this.LatestEditedDomainVersionRef = database.ref(`domains/data/${id}/deployedVersion`)
      // this.LatestEditedDomainVersionRef.on('value', this.boundSaveLatestEditedDomainVersion);

      this.LatestDeployedDomainVersionRef = database.ref(`last-deployed/data/${id}/deployedVersion`)
      this.LatestDeployedDomainVersionRef.on('value', this.boundSaveLatestDeployedDomainVersion);
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

  // saveLatestEditedDomainVersion (snap) {
  //   const data = snap.val();
  //   if (data) {
  //     this.latestEditedDomainVersion = data;
  //   }
  // }

  saveLatestDeployedDomainVersion (snap) {
    const data = snap.val();
    if (data) {
      this.lastDeployedDomainVersion = data;
    }
  }

  updateLatestDeployedDomainVersion (version, callback) {
    this.lastDeployedDomainVersion = version
    callback(version)
  }

  domainChanged (domain) {}
});
