// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetPathMixin } from '../../mixins/get-path';
// import { GetDomainVersionsMixin } from '../../mixins/get-domain-versions';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('version-managable-list2')
class VersionList2 extends GetPathMixin(LitElement) {
  @property({ type: Object })
  versions

  @property({ type: String })
  lastDeployedDomainVersion

  render () {
    return template(this);
  }

  async changeVersion (event) {
    this.dispatchEvent(new window.CustomEvent('change-version', { detail: event.target.value }));
    // console.log(event.target.value, this.queryObject.domain);
    // const updates = {};

    // if (this.queryObject.domain) {
    //   const snap = await database.ref(`deployed-history/data/${this.queryObject.domain}/${event.target.value}`).once('value');

    //   const data = snap.val();
    //   console.log(data);

    //   if (data) {
    //     updates[`domains/data/${this.queryObject.domain}`] = data;
    //     console.log(updates);
    //     await database.ref().update(updates);
    //   }
    // }
  }
}

export { VersionList2 };
