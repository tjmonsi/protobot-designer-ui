// @ts-ignore
import { property } from 'lit-element';
import { database } from '../../../firebase';

/**
 *
 * @param {*} base
 */
export const GetMemoMixin = (base) => (class extends base {
  // @ts-ignore
  @property({ type: String })
  memoId;

  // @ts-ignore
  @property({ type: Object })
  memo;

  updated (changedProps) {
    if (super.updated) super.updated(changedProps);
    if (changedProps.has('memoId')) {
      this.getMemo(this.memoId);
    }
  }

  async getMemo (memoId) {
    console.log(memoId);
    const snap = await database.ref(`memos/data/${memoId}`).once('value');
    this.memo = snap.val() || null;
  }
});
