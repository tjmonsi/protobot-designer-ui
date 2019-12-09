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

  async addTopic ({ target }) {
    const topicId = target.getAttribute('data-id');
    const { domain } = this.queryObject;
    const snap = await database.ref(`domains/data/${domain}`).once('value');
    const { topics } = snap.val() || { topics: {} };
    const array = [];
    for (const topic in topics) {
      array.push({ topic, order: topics[topic] });
    }
    const topicArray = array.sort((i, j) => (i.order - j.order)).map(i => i.topic);

    topicArray.push(topicId);

    const newTopics = {};

    for (const i in topicArray) {
      newTopics[topicArray[i]] = parseInt(i);
    }

    const updates = {};

    updates[`domains/data/${domain}/topics`] = newTopics;
    updates[`domains/data/${domain}/subs/${topicId}`] = false;
    updates[`domains/data/${domain}/topicList/${topicId}`] = true;

    // console.log(updates);
    await database.ref().update(updates);
  }
}

export { TopicListItem };
