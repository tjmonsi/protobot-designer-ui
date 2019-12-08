// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetTopicMixin } from '../../mixins/get-topic';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('conversational-flow-topic')
class ConversationalFlowTopic extends GetTopicMixin(LitElement) {
  // @ts-ignore
  @property({ type: Number })
  index;

  @property({ type: Boolean })
  sub = false;

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

  newTopic () {
    this.createTopic();
  }

  subTopic () {
    this.createTopic(true);
  }

  async createTopic (sub) {
    const { key: topicId } = database.ref('labels/data').push();
    const { key: utteranceId } = database.ref('utterances/data').push();
    const { domain } = this.topic;
    const updates = {};
    const snap = await database.ref(`domains/data/${domain}`).once('value');
    const { topics, deployedVersion } = snap.val() || { topics: {} };
    const array = [];
    for (const topic in topics) {
      array.push({ topic, order: topics[topic] });
    }
    const topicArray = array.sort((i, j) => (i.order - j.order)).map(i => i.topic);

    const topic = {
      domain,
      name: 'Topic',
      required: true,
      mainUtterance: utteranceId,
      utterances: {}
    };

    topic.utterances[utteranceId] = true;

    const utterance = {
      bot: true,
      domain,
      required: true,
      text: 'Utterance',
      version: deployedVersion,
      topics: {}
    };

    utterance.topics[topicId] = true;

    topicArray.splice(this.index + 1, 0, topicId);

    const newTopics = {};

    for (const i in topicArray) {
      newTopics[topicArray[i]] = parseInt(i);
    }

    updates[`labels/data/${topicId}`] = topic;
    updates[`utterances/data/${utteranceId}`] = utterance;
    updates[`domains/data/${domain}/topics`] = newTopics;
    updates[`domains/data/${domain}/subs/${topicId}`] = sub || false;
    updates[`domains/data/${domain}/topicList/${topicId}`] = true;

    await database.ref().update(updates);
  }

  async deleteTopic () {
    const { topic } = this;
    const { domain } = topic;
    const updates = {};
    const snap = await database.ref(`domains/data/${domain}`).once('value');
    const { topics } = snap.val() || { topics: {} };
    const array = [];
    for (const topic in topics) {
      array.push({ topic, order: topics[topic] });
    }
    const topicArray = array.sort((i, j) => (i.order - j.order)).map(i => i.topic);

    topicArray.splice(this.index, 1);

    const newTopics = {};

    for (const i in topicArray) {
      newTopics[topicArray[i]] = parseInt(i);
    }

    // updates[`labels/data/${topicId}`] = null;
    updates[`domains/data/${domain}/topics`] = newTopics;
    // updates[`domains/data/${domain}/topicList/${topicId}`] = null;

    await database.ref().update(updates);
  }
}

export { ConversationalFlowTopic };
