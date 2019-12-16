// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
import { database } from '../../../firebase';
// import { ProtobotMemo } from '../../components/protobot-memo';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-macro-sidebar')
class ProtobotMacroSidebar extends GetDomainMixin(LitElement) {
  @property({ type: String })
  lastDeployedDomainVersion = ''

  @property({ type: Array })
  lastDeployedDomainTopicList = []

  @property({ type: Array })
  versionsDetail = []

  @property({ type: Array })
  memos = []

  render () {
    return template(this);
  }

  save () {}

  updated (changedProps) {
    if (super.updated) super.updated(changedProps);
    if (changedProps.has('domainId')) {
      this.loadMemo(this.lastDeployedDomainVersion);
    }

  }

  async addMemo () {
    const updates = {};
    const { key: memoId } = database.ref('memos/data').push();
    const { page, crowdId } = this.queryObject || { page: null };

    const memo = {
      text: '',
      domainId: this.domainId,
      crowdId: crowdId || null, // can be null
      page,
      deployedVersion: this.lastDeployedDomainVersion || null
    };
    // console.log(this.memos)
    updates[`memos/lists/domain-memo/${this.domainId}/${memoId}`] = {
      page,
      crowdId: crowdId || null,
      deployedVersion: this.lastDeployedDomainVersion || null
    };

    if (crowdId) {
      updates[`memos/lists/domain-crowdid-memo/${this.domainId}/${this.crowdId}/${memoId}`] = page;
    }

    updates[`memos/data/${memoId}`] = memo;

    // this saves the memo in db
    await database.ref().update(updates);
    // console.log({...memo, memoId})
    await this.loadMemo(this.lastDeployedDomainVersion)
    // this.memos.push({
    //   page,
    //   memoId,
    //   crowdId: crowdId || null,
    //   deployedVersion: this.lastDeployedDomainVersion || null
    // })
  }

  async changeVersion ({ detail: versionId }) {
    this.dispatchEvent(new window.CustomEvent('change-version', { detail: versionId }));
    this.loadMemo(versionId);
  }

  async loadMemo (versionId) {
    const snap = await database.ref(`memos/lists/domain-memo/${this.domainId}`).orderByChild('deployedVersion').equalTo(versionId).once('value');
    const data = snap.val() || null;
    const array = [];
    if (data) {
      for (const memoId in data) {
        array.push({ ...data[memoId], memoId });
      }
      this.memos = array;
    } else {
      this.memos = [];
    }
    console.log(this.memos)
  }
}

export { ProtobotMacroSidebar };
