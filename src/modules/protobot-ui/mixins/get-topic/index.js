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
});
