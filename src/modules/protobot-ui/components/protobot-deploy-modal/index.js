// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-deploy-modal')
class ProtobotDeployModal extends GetDomainMixin(LitElement) {
  @property ({type: Boolean})
  opened;

  @property ()
  numUser = '';

  @property ()
  numSession = '';

  render () {
    return template(this);
  }

  async changeNumUser (event) {
    const { target } = event;
    const { value } = target;

    if (this.numUser !== value) {
      console.log(this.deployedVersion)
      await database.ref(`deployed-history/data/${this.domainId}/${this.deployedVersion}/parameters/numUser`).set(value);
    }
  }

  async changeNumSession (event) {
    const { target } = event;
    const { value } = target;

    if (this.numSession !== value) {
      await database.ref(`deployed-history/data/${this.domainId}/${this.deployedVersion}/parameter/numSession`).set(value);
    }
  }

  async changeOtherResponse () {

  }

  async changeAmtOption() {

  }
}

export { ProtobotDeployModal };
