// Import the LitElement base class and html helper function
import { LitElement, customElement } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
import { GetDomainUtterancesMixin } from '../../mixins/get-domain-utterances';
import { database } from '../../../firebase';
// import { GetTopicMixin } from '../../mixins/get-topic';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-micro')
class ProtobotMicro extends GetDomainUtterancesMixin(GetDomainMixin(LitElement)) {
  render () {
    return template(this);
  }

  /**
   *
   * @param {String} id
   */
  async gettingCrowdId (id) {
    // console.log("here", id);
    return (await database.ref(`users/data/${id}/name`).once('value')).val();
  }

  // async createTopic (sub) {
  //   const { key: topicId } = database.ref('labels/data').push();
  //   const { key: utteranceId } = database.ref('utterances/data').push();
  //   const { domain } = this.topic;
  //   const updates = {};
  //   const snap = await database.ref(`domains/data/${domain}`).once('value');
  //   const { topics } = snap.val() || { topics: {} };
  //   const array = [];
  //   for (const topic in topics) {
  //     array.push({ topic, order: topics[topic] });
  //   }
  //   const topicArray = array.sort((i, j) => (i.order - j.order)).map(i => i.topic);

  //   const topic = {
  //     domain,
  //     name: 'Topic',
  //     required: true,
  //     mainUtterance: utteranceId,
  //     utterances: {}
  //   };

  //   topic.utterances[utteranceId] = true;

  //   const utterance = {
  //     bot: true,
  //     domain,
  //     required: true,
  //     text: 'Utterance',
  //     topics: {}
  //   };

  //   utterance.topics[topicId] = true;

  //   topicArray.splice(this.index + 1, 0, topicId);

  //   const newTopics = {};

  //   for (const i in topicArray) {
  //     newTopics[topicArray[i]] = parseInt(i);
  //   }

  //   updates[`labels/data/${topicId}`] = topic;
  //   updates[`utterances/data/${utteranceId}`] = utterance;
  //   updates[`domains/data/${domain}/topics`] = newTopics;
  //   updates[`domains/data/${domain}/subs/${topicId}`] = sub || false;
  //   updates[`domains/data/${domain}/topicList/${topicId}`] = true;

  //   await database.ref().update(updates);
  // }
}

export { ProtobotMicro };
