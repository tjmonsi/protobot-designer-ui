// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-authoring-sidebar')
class ProtobotAuthoringSidebar extends GetDomainMixin(LitElement) {
  @property()
  commitMessage;

  render () {
    return template(this);
  }

  async handleCommitMsg (event) {
    const { target } = event;
    const { value } = target;
    const updates = {};
    updates[`domains/data/${this.domainId}/commitMessage`] = value || '';
    await database.ref().update(updates);
  }

  async deploy () {
    const updates = {};
    const { domain } = this;
    const { commitMessage } = domain;
    const { key: deployedVersion } = database.ref(`deployed-history/data/${this.domainId}/`).push();

    updates[`last-deployed/data/${this.domainId}/`] = { ...this.domain, deployedVersion, commitMessage: commitMessage || '' };
    updates[`deployed-history/data/${this.domainId}/${deployedVersion}`] = { ...this.domain, deployedVersion, commitMessage: commitMessage || '' };
    updates[`domains/data/${this.domainId}/deployed`] = false;
    updates[`domains/data/${this.domainId}/deployedVersion`] = deployedVersion;
    updates[`domains/data/${this.domainId}/commitMessage`] = commitMessage || '';
    await database.ref().update(updates);
  }
}

export { ProtobotAuthoringSidebar };
