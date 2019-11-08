// @ts-ignore
import { property } from 'lit-element';
import { database } from '../../../firebase';

/**
 *
 * @param {*} base
 */
export const GetUtteranceMixin = (base) => (class extends base {
  // @ts-ignore
  @property({ type: String })
  utteranceId;

  // @ts-ignore
  @property({ type: Object })
  utterance;

  updated (changedProps) {
    if (super.updated) super.updated(changedProps);
    if (changedProps.has('utteranceId')) {
      this.getUtterance(this.utteranceId);
    }
  }

  async getUtterance (utteranceId) {
    const snap = await database.ref(`utterances/data/${utteranceId}`).once('value');
    this.utterance = snap.val() || null;
  }
});
