// @ts-ignore
import { property } from 'lit-element';
import { database } from '../../../firebase';
import { GetDomainMixin } from '../get-domain';

/**
 *
 * @param {*} base
 */
export const GetDomainMemosMixin = (base) => (class extends GetDomainMixin(base) {
  // @ts-ignore
  @property({ type: Array })
  memos = [];

  constructor () {
    super();
    this.boundSaveDomainMemos = this.saveDomainMemos.bind(this);
  }

  disconnectedCallback () {
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }

    this.disconnectRef();
  }

  domainChanged (data) {
    super.domainChanged(data);
    if (data) {
      this.getDomainMemos(this.domainId);
    }
  }

  disconnectRef () {
    if (super.disconnectRef) super.disconnectRef();

    if (this.domainMemosRef) {
      this.domainMemosRef.off('value', this.boundSaveDomainMemos);
    }
  }

  /**
   *
   * @param {String} id
   */
  getDomainMemos (id) {
    this.disconnectRef();

    if (id) {
      console.log(id)
      this.domainMemosRef = database.ref(`memos/lists/domain-memo/${id}`);
      this.domainMemosRef.on('value', this.boundSaveDomainMemos);
    } else {
      console.log('No values for id-crowdId: ', id);
    }
  }

  saveDomainMemos (snap) {
    const data = snap.val() || null;
    const array = [];
    if (data) {
      for (const memoId in data) {
        array.push({ ...data[memoId], memoId });
      }
      this.memos = array;
      this.domainMemosChanged(this.memos);
    }
  }

  domainMemosChanged (data) { }
});
