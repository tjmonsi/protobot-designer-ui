// Import the LitElement base class and html helper function
import { LitElement, customElement } from 'lit-element';
import { template } from './template.js';
import { GetDomainMemosMixin } from '../../mixins/get-domain-memos';
import { database } from '../../../firebase';
// import { ProtobotMemo } from '../../components/protobot-memo';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-micro-sidebar')
class ProtobotMicroSidebar extends GetDomainMemosMixin(LitElement) {
  // @property({ type: Array })
  // memos = [''];

  render () {
    return template(this);
  }

  save () {}

  async addMemo () {
    const updates = {};
    const { key: memoId } = database.ref('memos/data').push();
    const { page, crowdId } = this.queryObject || { page: null };
    const { deployedVersion } = this.domain;

    const memo = {
      text: '',
      domainId: this.domainId,
      crowdId: crowdId || null, // can be null
      page,
      deployedVersion: deployedVersion || null
    };
    // console.log(this.memos)
    updates[`memos/lists/domain-memo/${this.domainId}/${memoId}`] = {
      page,
      crowdId: crowdId || null,
      deployedVersion: deployedVersion || null
    };

    if (crowdId) {
      updates[`memos/lists/domain-crowdid-memo/${this.domainId}/${this.crowdId}/${memoId}`] = page;
    }

    updates[`memos/data/${memoId}`] = memo;

    // this saves the memo in db
    await database.ref().update(updates);
  }

  // async save () {
  //   const updates = {};
  //   // updates[`last-deployed/data/${this.domainId}/`] = this.domain;
  //   // updates[`domains/data/${this.domainId}/deployed`] = false;
  //   // await database.ref().update(updates);
  // }

  // async addMemo (event) {
  //   const { target } = event;
  //   const { value } = target;

  //   this.memos.push('');
  //   this.requestUpdate();
  //   // console.log(this.memos)
  // }

  // async updateMemo (idx, { detail: value }) {
  //   this.memos[idx] = value;
  //   console.log(this.memos);
  // }
}

export { ProtobotMicroSidebar };
