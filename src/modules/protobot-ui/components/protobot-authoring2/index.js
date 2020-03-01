// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
// import { GetTopicMixin } from '../../mixins/get-topic';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-authoring2')
class ProtobotAuthoring2 extends GetDomainMixin(LitElement) {
  @property({ type: Number })
  index;

  @property({ type: Boolean })
  sub = false;

  @property({ type: Boolean })
  readonly = false;

  render () {
    return template(this);
  }

  // render () {
  //   this.hello = ['a','b','c']
  //   return template(this);
  // }

  async domainChanged (domain) {
    if (!domain) {
      window.location.href = '/';
    } else {
      const { deployed } = domain;
      if (deployed) {
        const updates = {};
        updates[`domains/data/${this.domainId}/deployed`] = false;
        await database.ref().update(updates);
      }
    }
    // if there is a domain...
  }

  async topicNameChanged (event) {
    if(this.readonly){
      return;
    }
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

  async swap (event) {
    const { target } = event;
    const updates = {};
    const index = parseInt(target.getAttribute('index'));
    const next = index + 1;
    let swap1 = null;
    let swap2 = null;
    for (const i in this.domain.topics) {
      if (this.domain.topics[i] === index) {
        swap1 = i;
      }
      if (this.domain.topics[i] === next) {
        swap2 = i;
      }
    }

    if (swap1 && swap2) {
      this.domain.topics[swap1] = next;
      this.domain.topics[swap2] = index;
    }
    updates[`domains/data/${this.domainId}/topics`] = this.domain.topics;
    await database.ref().update(updates);
  }
}

export { ProtobotAuthoring2 };
