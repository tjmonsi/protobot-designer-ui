// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetTopicMixin } from '../../mixins/get-topic';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('topic-list-item')
class TopicListItem extends GetTopicMixin(LitElement) {
  // @ts-ignore
  @property({ type: Number })
  index;

  @property({ type: Boolean })
  sub = false;

  @property({ type: Boolean })
  included = false;

  render () {
    return template(this);
  }

  async topicNameChanged (event) {
    const { target } = event;
    const { value } = target;

    if (this.topic.name !== value) {
      await database.ref(`labels/data/${this.topicId}/name`).set(value);
    }
  }
}

export { TopicListItem };
