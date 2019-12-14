// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-deploy-modal')
class ProtobotDeployModal extends GetDomainMixin(LitElement) {
  @property({ type: Boolean })
  opened;

  @property()
  numUser = '';

  @property()
  numSession = '';

  @property({ type: Boolean })
  otherResponse

  @property({ type: Boolean })
  amtOption

  @property({ type: Number })
  stage;

  @property()
  deployUrl;

  render () {
    return template(this);
  }


  async cancelAMT() {
    this.dispatchEvent(new window.CustomEvent('dialog-prev'))
  }


  async conditionalDeploy() {
    // console.log("fjkdsjfksdjfksdkjfjsdk", this.amtOption)
    if ( this.amtOption != 'amt' ) {
      this.deploy()
    } else {
      this.dispatchEvent(new window.CustomEvent('dialog-next'))
    }
  }

  async deploy () {
    const updates = {};
    const { domain } = this;
    const snap2 = await database.ref(`deployed-history/lists/${this.domainId}`).once('value');
    const list = snap2.val() || {};
    const { length } = Object.keys(list);

    if (domain) {
      const { commitMessage } = domain;
      const { key } = database.ref(`deployed-history/data/${this.domainId}/`).push();
      const obj = {
        ...this.domain,
        deployedVersion: key,
        commitMessage: commitMessage || '',
        versionNumber: length,
        parameters: {
          numUser: this.numUser,
          numSession: this.numSession,
          otherResponse: this.otherResponse === 'show',
          amtOption: this.amtOption === 'amt'
        }
      };
      console.log(obj)
      updates[`last-deployed/data/${this.domainId}/`] = obj;
      updates[`deployed-history/data/${this.domainId}/${key}`] = obj;
      updates[`deployed-history/lists/${this.domainId}/${key}`] = true;

      updates[`domains/data/${this.domainId}/versionNumber`] = length;
      updates[`domains/data/${this.domainId}/deployed`] = true;
      updates[`domains/data/${this.domainId}/deployedVersion`] = key;
      updates[`domains/data/${this.domainId}/commitMessage`] = '';

      await database.ref().update(updates);

      this.dispatchEvent(new window.CustomEvent('dialog-accept', { detail: obj }));
    }
  }

  async changeNumUser (event) {
    const { target } = event;
    const { value } = target;

    this.numUser = value;

    // if (this.numUser !== value) {
    //   console.log(this.deployedVersion)
    //   await database.ref(`deployed-history/data/${this.domainId}/${this.domain.deployedVersion}/parameters/numUser`).set(value);
    // }
  }

  async changeNumSession (event) {
    const { target } = event;
    const { value } = target;

    this.numSession = value;

    // if (this.numSession !== value) {
    //   await database.ref(`deployed-history/data/${this.domainId}/${this.domain.deployedVersion}/parameters/numSession`).set(value);
    // }
  }

  async changeOtherResponse (event) {
    const { target } = event;
    const { value } = target;
    this.otherResponse = value;

    // if (this.otherResponse == "show") {
    //   await database.ref(`deployed-history/data/${this.domainId}/${this.domain.deployedVersion}/parameters/otherResponse`).set("True");
    // }

    // if (this.otherResponse == "hide") {
    //   await database.ref(`deployed-history/data/${this.domainId}/${this.domain.deployedVersion}/parameters/otherResponse`).set("False");
    // }
  }

  async changeAmtOption (event) {
    const { target } = event;
    const { value } = target;
    this.amtOption = value;

    // if (this.amtOption == "amt") {
    //   await database.ref(`deployed-history/data/${this.domainId}/${this.domain.deployedVersion}/parameters/amtOption`).set("True");
    // }

    // if (this.amtOption == "link-share") {
    //   await database.ref(`deployed-history/data/${this.domainId}/${this.domain.deployedVersion}/parameters/amtOption`).set("False");
    // }
  }
}

export { ProtobotDeployModal };
