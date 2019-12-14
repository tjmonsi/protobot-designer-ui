// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetDomainVersionsMixin } from '../../mixins/get-domain-versions';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('version-managable-list2')
class VersionList2 extends LitElement {
  @property ({type: Object})
  versions

  @property({type: String})
  lastDeployedDomainVersion

  render () {
    return template(this);
  }

  async changeVersion(event){
    this.dispatchEvent(new window.CustomEvent('change-version', {detail: event.target.value}))
  }
}

export { VersionList2 };
