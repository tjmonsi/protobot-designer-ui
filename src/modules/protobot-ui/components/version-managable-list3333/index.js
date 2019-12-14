// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetDomainVersionsMixin } from '../../mixins/get-domain-versions';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('version-managable-list')
class VersionList extends GetDomainVersionsMixin(LitElement) {
  // @property ({type: String})
  // lastDeployedDomainVersion


  render () {
    console.log(this.lastDeployedDomainVersion)
    return template(this);
  }

  async changeVersion ({ target }) {
    const {value: id} = target
    // const updates = {};
    // const snap = await database.ref(`deployed-history/data/${this.domainId}/${id}/`).once('value');
    // const obj = snap.val();
    // if (obj) {
    //   updates[`domains/data/${this.domainId}/`] = obj;
    //   await database.ref().update(updates);
    //   // window.location.reload();
    // }

    super.updateLatestDeployedDomainVersion(id)
    // this.lastDeployedDomainVersion = id
  }

  /**
   *
   * @param {String} id
   */
  async gettingDomainName (id, domainId) {
    // console.log(`${id}`);
    // console.log(`deployed-history/data/${domainId}/${id}/versionNumber`)
    return (await database.ref(`deployed-history/data/${domainId}/${id}/commitMessage`).once('value')).val();
  }

  async gettingDomainVersion (id, domainId) {
    // console.log(`${id}`);
    // console.log(`deployed-history/data/${domainId}/${id}/versionNumber`)
    return (await database.ref(`deployed-history/data/${domainId}/${id}/versionNumber`).once('value')).val();
  }
}

export { VersionList };
