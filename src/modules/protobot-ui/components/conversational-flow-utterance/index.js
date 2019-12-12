// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetUtteranceMixin } from '../../mixins/get-utterance';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('conversational-flow-utterance')
class ConversationalFlowUtterance extends GetUtteranceMixin(LitElement) {
  @property ({type: Boolean})
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

export { ConversationalFlowUtterance };
