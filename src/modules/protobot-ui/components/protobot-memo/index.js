import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
import { database } from '../../../firebase';


// @ts-ignore
@customElement('protobot-memo')
class ProtobotMemo extends GetDomainMixin(LitElement) {

  render () {
    return template(this);
  }

  // need function for
  // link done with labeling button for auto save
  // cleanUp
  //
}

export { ProtobotMemo };