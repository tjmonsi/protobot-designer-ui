// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-deploy')
class ProtobotDeployModal extends GetDomainMixin(LitElement) {
  @property({ type: Boolean })
  opened = true;

  @property()
  numUser = '';

  @property()
  numSession = '';

  @property({ type: Boolean })
  otherResponse

  @property({ type: Boolean })
  amtOption

  @property({ type: Number })
  stage = 0;

  @property()
  deployUrl;

  render () {
    return template(this);
  }


  async nextDialogStage () {
    this.stage++;
    this.stage = Math.max(this.stage, 1);
    // window.location.reload();
  }

  async confirmAMT(){
    console.log("TODO")
  }

  async cancelAMT() {
    this.stage = 0
    this.deployUrl = ''
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
      updates[`last-deployed/data/${this.domainId}/`] = obj;
      updates[`deployed-history/data/${this.domainId}/${key}`] = obj;
      updates[`domains/data/${this.domainId}/deployed`] = false;
      updates[`domains/data/${this.domainId}/deployedVersion`] = key;
      updates[`domains/data/${this.domainId}/commitMessage`] = '';
      updates[`deployed-history/lists/${this.domainId}/${key}`] = true;
      await database.ref().update(updates);

      this.urlGenerator(obj)
      // this.dispatchEvent(new window.CustomEvent('dialog-accept', { detail: obj }));
    }
  }

  async urlGenerator (obj) {
    const { numUser, numSession, otherResponse } = obj.parameters;
    // with the domainId and chosen parameters, generating the URL

    // domainID
    // param1: num-users (number)
    // param2: num-sessions (number)
    // param3: other-response (boolean)

    // [x] param4: amt (boolean) -- we do not need for link
    //                              but we need it for showing the link or not
    //                              amt = true: just deploying, amt = false: showing up link

    // example URL:
    this.deployUrl = `https://protobot-rawdata.firebaseapp.com/?domain=${this.domainId}&deployedVersion=${obj.deployedVersion}&numUser=${numUser}&numSession=${numSession}&otherResponse=${otherResponse}`
    console.log(this.deployUrl)
    // this.stage++;
    // this.stage = Math.max(this.stage, 1);
    this.nextDialogStage();
    // this.closeDialog();
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
