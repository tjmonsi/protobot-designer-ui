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
    console.log(this.commitMessage)
    return template(this);
  }

  async handleCommitMsg (event) {
    const { target } = event;
    const { value } = target;
    this.commitMessage = value;
  }


  async deploy () {
    const updates = {};
    const { key: deployedVersion } = database.ref(`deployed-history/data/${this.domainId}/`).push();
    const { value: commitMessage } = database.ref(`deployed-history/data/${this.domainId}/${this.deployedVersion}/`).push();

    updates[`last-deployed/data/${this.domainId}/`] = { ...this.domain, deployedVersion, commitMessage };
    updates[`deployed-history/data/${this.domainId}/${deployedVersion}`] = { ...this.domain, deployedVersion, commitMessage };
    updates[`domains/data/${this.domainId}/deployed`] = false;
    await database.ref().update(updates);
  }

}

export { ProtobotAuthoringSidebar };
