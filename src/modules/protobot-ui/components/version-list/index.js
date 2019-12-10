// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetDomainVersionsMixin } from '../../mixins/get-domain-versions';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('version-list')
class VersionList extends GetDomainVersionsMixin(LitElement) {
  render () {
    return template(this);
  }

  async changeVersion ({ target }) {
    const id = target.getAttribute('data-id');
    const updates = {};
    const snap = await database.ref(`deployed-history/data/${this.domainId}/${id}/`).once('value');
    const obj = snap.val();
    if (obj) {
      updates[`domains/data/${this.domainId}/`] = obj;
      await database.ref().update(updates);
      // window.location.reload();
    }
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
