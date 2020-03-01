// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetTopicMixin } from '../../mixins/get-topic';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-draft-utterance')
class ProtobotDraftUtterance extends GetTopicMixin(LitElement) {
  @property ({ type: Boolean })
  readonly = false;

  render () {
    return template(this);
  }

  async utteranceTextChanged (event) {
    if(this.readonly){
      return;
    }
    const { target } = event;
    const { value } = target;

    if (this.utterance.text !== value) {
      await database.ref(`utterances/data/${this.utteranceId}/text`).set(value);
    }
  }
}
export { ProtobotDraftUtterance };
