import { LitElement, customElement } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
import { database } from '../../../firebase';

@customElement('protobot-history-sidebar')
class ProtobotHistorySidebar extends GetDomainMixin(LitElement) {
  render () {
    return template(this);
  }
}

export { ProtobotHistorySidebar };
