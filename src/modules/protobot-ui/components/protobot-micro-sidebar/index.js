// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
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
    // console.log(this.memos)
    return template(this);
  }

  save () {}

  async addMemo () {
    const updates = {};
    const { key: memoId } = database.ref('memos/data').push();
    const memo = {
      text: '',
      domainId: this.domainId,
      crowdId: this.crowdId || null// can be null
      // page: macro || micro// macro/micro
      // deployedVersion: // think how to add this one
    };
    // console.log(this.memos)
    updates[`memos/lists/domain-memo/${this.domainId}/${memoId}`] = true;

    if (this.crowdId) {
      updates[`memos/lists/domain-crowdid-memo/${this.domainId}/${this.crowdId}/${memoId}`] = true;
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
