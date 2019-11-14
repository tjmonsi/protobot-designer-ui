// Import the LitElement base class and html helper function
import { LitElement, customElement } from 'lit-element';
import { template } from './template.js';
import { GetMemoMixin } from '../../mixins/get-memo';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-memo-all')
class ProtobotMemoAll extends GetMemoMixin(LitElement) {
  render () {
    return template(this);
  }

  /**
   *
   * @param {String} memoId
   */
  async gettingMemo (memoId) {
    // console.log(`${id}`);
    return (await database.ref(`memos/data/${memoId}/text`).once('value')).val();
  }

}

export { ProtobotMemoAll };