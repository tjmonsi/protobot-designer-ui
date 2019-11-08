import { LitElement, customElement } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
import { GetMemoMixin } from '../../mixins/get-memo';
import { database } from '../../../firebase';

// @ts-ignore
@customElement('protobot-memo')
class ProtobotMemo extends GetMemoMixin(GetDomainMixin(LitElement)) {
  render () {
    return template(this);
  }

  async saveMemo ({ target }) {
    const { value } = target;
    console.log('saved!');
    // this is where you get the unique memo id
    const updates = {};
    updates[`memos/data/${this.memoId}/text`] = value;
    // this saves the memo in db
    await database.ref().update(updates);
  }
}

export { ProtobotMemo };
