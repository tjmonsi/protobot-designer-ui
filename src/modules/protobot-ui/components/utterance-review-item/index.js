// Import the LitElement base class and html helper function
import { LitElement, customElement } from 'lit-element';
import { template } from './template.js';
import { GetUtteranceMixin } from '../../mixins/get-utterance';
import { GetDomainMixin } from '../../mixins/get-domain';
// import { GetTopicMixin } from '../../mixins/get-topic';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('utterance-review-item')
class UtteranceReviewItem extends GetUtteranceMixin(GetDomainMixin(LitElement)) {
  textInputVisible = false;

  render () {
    return template(this);
  }

  selectedTopic ({ target }) {

    const { value } = target;
    const updates = {};
    if (value === 'new-topic') {
      this.textInputVisible = true;
      console.log("new topic selected")
    }
    else {
      this.textInputVisible = false;
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
