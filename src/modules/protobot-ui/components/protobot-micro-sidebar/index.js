// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
import { database } from '../../../firebase';
// import { ProtobotMemo } from '../../components/protobot-memo';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-micro-sidebar')
class ProtobotMicroSidebar extends GetDomainMixin(LitElement) {
  @property({ type: Array })
  memos = ["hello", "world", "???"];

  render () {
    console.log(this.memos)
    return template(this);
  }

  async save () {
    const updates = {};
    // updates[`last-deployed/data/${this.domainId}/`] = this.domain;
    // updates[`domains/data/${this.domainId}/deployed`] = false;
    // await database.ref().update(updates);
  }

  async addMemo (event) {
    const { target } = event;
    const { value } = target;

    this.memos.push('');
    this.requestUpdate();
    // console.log(this.memos)
  }

  async updateMemo (idx, { detail: value }) {
    this.memos[idx] = value;
    console.log(this.memos);
  }
}

export { ProtobotMicroSidebar };
