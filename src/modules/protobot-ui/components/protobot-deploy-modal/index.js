// Import the LitElement base class and html helper function
import { LitElement, customElement } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
// import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-deploy-modal')
class ProtobotDeployModal extends GetDomainMixin(LitElement) {
  constructor () {
    super()
    this.opened = false;
  }

  static get properties () {
    return {
      opened: {type: Boolean}
    }
  }

  render () {
    return template(this);
  }






}

export { ProtobotDeployModal };
