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

  @property({type: Boolean})
  dialogVisible;

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

  async deploy () { // need to update all the testing parameters(numUser, otherResponse, numSession, amt) in last-deployed
    const updates = {};
    const { domain } = this;

    if (domain) {
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

  async toggleDialog (e) {
    this.dialogVisible = !this.dialogVisible
  }

  async closeDialog (e) {
    this.dialogVisible = false
  }

  async urlGenerator (e) {
    // with the domainId and chosen parameters, generating the URL

    // domainID
    // param1: num-users (number)
    // param2: num-sessions (number)
    // [x] param3: amt (boolean) -- we do not need for link
    //                              but we need it for showing the link or not
    //                              amt = true: just deploying, amt = false: showing up link
    // param4: other-response (boolean)

    // example URL:
    // https://protobot-rawdata.firebaseapp.com/?domain={domainId}&numUser={N}&numSession={N}&otherResponse=true
  }

}

export { ProtobotAuthoringSidebar };
