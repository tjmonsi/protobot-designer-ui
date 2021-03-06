// Import the LitElement base class and html helper function
import { LitElement, customElement } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-authoring-sidebar')
class ProtobotAuthoringSidebar extends GetDomainMixin(LitElement) {
  render () {
    return template(this);
  }

  async deploy () {
    const updates = {};
    updates[`last-deployed/data/${this.domainId}/`] = this.domain;
    updates[`domains/data/${this.domainId}/deployed`] = false;
    await database.ref().update(updates);
  }
}

export { ProtobotAuthoringSidebar };
