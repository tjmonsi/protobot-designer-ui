// Import the LitElement base class and html helper function
import { LitElement, customElement } from 'lit-element';
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
      crowdId: crowdId || null
    };

    if (this.crowdId) {
      updates[`memos/lists/domain-crowdid-memo/${this.domainId}/${this.crowdId}/${memoId}`] = page;
    }

    updates[`memos/data/${memoId}`] = memo;

    // this saves the memo in db
    await database.ref().update(updates);
  }
}

export { ProtobotMacroSidebar };
