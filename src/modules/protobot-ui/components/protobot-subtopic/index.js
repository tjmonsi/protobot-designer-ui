// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetTopicMixin } from '../../mixins/get-topic';
// import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-subtopic')
class ProtobotSubtopic extends GetTopicMixin(LitElement) {

  render () {
    return template(this);
  }

}

export { ProtobotSubtopic };
