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
    const { utteranceId, utterance } = this;
    const { domain } = utterance;
    const updates = {};
    this.textInputVisible = false;
    if (value === 'new-topic') {
      this.textInputVisible = true;
      return;
    }

    // topic.utterances[utteranceId] = true;

    utterance.topics[value] = true;

    updates[`labels/data/${value}/utterances/${utteranceId}`] = true;
    updates[`utterances/data/${utteranceId}`] = utterance;
    updates[`domains/data/${domain}/topicList/${value}`] = true;

    await database.ref().update(updates);
  }

  async appendTopic (event) {
    const { target } = event;
    const { value: name } = target;
    const { utteranceId, utterance } = this;
    const { domain } = utterance;
    const updates = {};

    if (name && name !== 'new label') {
      const { key: topicId } = database.ref('labels/data').push();

      const topic = {
        domain,
        name,
        required: false,
        mainUtterance: utteranceId,
        utterances: {}
      };

      topic.utterances[utteranceId] = true;

      utterance.topics[topicId] = true;

      updates[`labels/data/${topicId}`] = topic;
      updates[`utterances/data/${utteranceId}`] = utterance;
      updates[`domains/data/${domain}/topicList/${topicId}`] = true;

      await database.ref().update(updates);
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
