// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
// import { GetDomainVersionsMixin } from '../../mixins/get-domain-versions';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-design-history')
class ProtobotDesignHistory extends GetDomainMixin(LitElement) {
  @property({type: String})
  lastDeployedDomainVersion

  @property ({type: Array})
  lastDeployedDomainTopics = []

  @property({ type: Object })
  lastDeployedDomainParameters = {};

  render () {
    return template(this);
  }


}

export { ProtobotDesignHistory };
