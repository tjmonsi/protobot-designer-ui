// Import the LitElement base class and html helper function
import { LitElement, customElement } from 'lit-element';
import { template } from './template2.js/index.js';
import { GetDomainMixin } from '../../mixins/get-domain';
// import { GetTopicMixin } from '../../mixins/get-topic';
// import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-micro')
class ProtobotMicro extends GetDomainMixin(LitElement) {
  render () {
    return template(this);
  }

  addLabel() {
    if (this.click) {
    }
  }

  addNewLabel() {
  }


  showUtterance() {
    // if there's utterance, then automatically generate this button a lot
  }
}

export { ProtobotMicro };
