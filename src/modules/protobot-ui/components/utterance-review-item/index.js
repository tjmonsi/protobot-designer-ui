// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetUtteranceMixin } from '../../mixins/get-utterance';
import { GetDomainMixin } from '../../mixins/get-domain';
// import { GetTopicMixin } from '../../mixins/get-topic';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('utterance-review-item')
class UtteranceReviewItem extends GetUtteranceMixin(GetDomainMixin(LitElement)) {
  @property({ type: Boolean })
  textInputVisible = false;

  render () {
    return template(this);
  }

  async selectedTopic ({ target }) {
    const { value } = target;
    const updates = {};
    if (value === 'new-topic') {
      this.textInputVisible = true;
    }
    else {
      this.textInputVisible = false;
    }
  }

  async appendTopic (event) {
    const { target } = event;
    const { value } = target;
    const { key: utteranceId } = database.ref('utterances/data').push();

    if (value !== 'new label') {
      await database.ref(`utterances/data/${utteranceId}/topics`).set(value);
      console.log(value)
    }
  }


  /**
   *
   * @param {String} id
   */
  async gettingTopic (id) {
    return (await database.ref(`labels/data/${id}/name`).once('value')).val();
  }
}

export { UtteranceReviewItem };
