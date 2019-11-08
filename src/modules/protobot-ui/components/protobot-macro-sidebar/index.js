// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetDomainMemosMixin } from '../../mixins/get-domain-memos';
import { database } from '../../../firebase';
// import { ProtobotMemo } from '../../components/protobot-memo';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-macro-sidebar')
class ProtobotMacroSidebar extends GetDomainMemosMixin(LitElement) {
  render () {
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
}

export { ProtobotMacroSidebar };
