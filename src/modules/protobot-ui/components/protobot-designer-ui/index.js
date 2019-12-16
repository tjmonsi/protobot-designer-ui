// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
// import { GetPathMixin } from '../../mixins/get-path';
import { GetDomainVersionsMixin } from '../../mixins/get-domain-versions';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-designer-ui')
class ProtobotDesignerUI extends GetDomainVersionsMixin(LitElement) {
  @property({ type: String })
  lastDeployedDomainVersion

  @property({ type: Array })
  lastDeployedDomainTopics = []

  @property({ type: Array })
  lastDeployedDomainTopicList = []

  @property({ type: String })
  lastDeployedDomainCommitMessage = ''

  @property({ type: Object })
  lastDeployedDomainParameters = {};

  render () {
    return template(this);
  }

  async changeVersion ({ detail: id }) {
    super.updateLatestDeployedDomainVersion(id)
  }
}

export { ProtobotDesignerUI };
