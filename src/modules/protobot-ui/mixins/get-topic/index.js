// @ts-ignore
import { property } from 'lit-element';
import { database } from '../../../firebase';

/**
 *
 * @param {*} base
 */
export const GetTopicMixin = (base) => (class extends base {
  // @ts-ignore
  @property({ type: String })
  topicId;

  // @ts-ignore
  @property({ type: Object })
  topic;

  // @ts-ignore
  @property({ type: String })
  mainUtteranceId;

  updated (changedProps) {
    if (changedProps.has('topicId')) {
      this.getTopic(this.topicId);
    }
  }

  async getTopic (topicId) {
    const snap = await database.ref(`labels/data/${topicId}`).once('value');
    this.topic = snap.val() || null;
    const { mainUtterance, utterances } = this.topic;
    let utteranceId;
    for (const utterance in utterances) {
      utteranceId = utterance;
      break;
    }
    this.mainUtteranceId = mainUtterance || utteranceId;
  }

  // /**
  //  *
  //  * @param {String} id
  //  */
  // async getDomainName (id) {
  //   if (id) {
  //     const snap = await database.ref(`domains/data/${id}`).once('value');
  //     this.domainId = id;
  //     this.domain = snap.val() || null;
  //     const { topics } = this.domain;
  //     const array = [];
  //     for (let topic in topics) {
  //       array.push({ topic, order: topics[topic] });
  //     }
  //     this.topics = array.sort((i, j) => (i.order - j.order)).map(i => i.topic);
  //     this.domainChanged(this.domain);
  //   }
  // }

  // domainChanged (domain) { console.log(domain); }
});
