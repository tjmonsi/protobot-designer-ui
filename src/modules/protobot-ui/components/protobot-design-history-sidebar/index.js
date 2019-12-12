// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-design-history-sidebar')
class ProtobotDesignHistorySidebar extends GetDomainMixin(LitElement) {
  @property({type: String})
  lastDeployedDomainVersion = ''

  @property({type: Array})
  lastDeployedDomainTopicList = []

  @property({type: Array})
  versionsDetail = []

  @property({type: String})
  lastDeployedDomainCommitMessage = ''

  render () {
    return template(this);
  }

  async changeVersion({detail: versionId}){
    this.dispatchEvent(new window.CustomEvent('change-version', {detail: versionId}))
  }

}

export { ProtobotDesignHistorySidebar };
