// Import the LitElement base class and html helper function
import { LitElement, customElement } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-authoring-sidebar')
class ProtobotAuthoringSidebar extends GetDomainMixin(LitElement) {
  render () {
    return template(this);
  }

  async deploy () {
    const updates = {};
    const { key: deployedVersion } = database.ref(`deployed-history/data/${this.domainId}/`).push();
    updates[`last-deployed/data/${this.domainId}/`] = { ...this.domain, deployedVersion };
    updates[`deployed-history/data/${this.domainId}/${deployedVersion}`] = { ...this.domain, deployedVersion };
    updates[`domains/data/${this.domainId}/deployed`] = false;
    await database.ref().update(updates);
  }
}

export { ProtobotAuthoringSidebar };
