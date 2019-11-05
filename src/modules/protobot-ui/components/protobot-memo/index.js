import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
import { database } from '../../../firebase';


// @ts-ignore
@customElement('protobot-memo')
class ProtobotMemo extends GetDomainMixin(LitElement) {
  @property()
  memoContent;

  @property()
  updateMemo; // need to be function call

  render () {
    return template(this);
  }

  async handleMemo (event) {
    this.saveMemo();
    const { target } = event;
    const { value } = target;

    // this dispatch event called update-memo
    this.dispatchEvent(new window.CustomEvent('update-memo', { detail: value }));
  }

  async saveMemo () {
    console.log("saved!")
    // this is where you get the unique memo id
    const { key: memoId } = database.ref('memos/data').push();
    const updates = {};
    const memo = {
      text: this.memoContent,
      domainId: this.domainId,
      crowdId: this.crowdId // can be null
      // page: macro || micro// macro/micro
      // deployedVersion: // think how to add this one
    };

    console.log(memo);
    console.log(updates);

    updates[`memos/data/${memoId}`] = memo;
    updates[`memos/lists/domain-memo/${this.domainId}/${memoId}`] = true;

    // this saves the memo in db
    await database.ref().update(updates);
  }
}

export { ProtobotMemo };
