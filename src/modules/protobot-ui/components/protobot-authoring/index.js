// Import the LitElement base class and html helper function
import { LitElement, customElement } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-authoring')
class ProtobotAuthoring extends GetDomainMixin(LitElement) {
  render () {
    return template(this);
  }

  async domainChanged (domain) {
    if (!domain) {
      window.location.href = '/';
    } else {
      const { deployed } = domain;
      if (deployed) {
        const updates = {};
        updates[`last-deployed/data/${this.domainId}/`] = domain;
        updates[`domains/data/${this.domainId}/deployed`] = false;
        await database.ref().update(updates);
      }
    }
    // if there is a domain...
  }

  async swap (event) {
    const { target } = event;
    const updates = {};
    const index = parseInt(target.getAttribute('index'));
    const next = index + 1;
    let swap1 = null;
    let swap2 = null;
    for (const i in this.domain.topics) {
      if (this.domain.topics[i] === index) {
        swap1 = i;
      }
      if (this.domain.topics[i] === next) {
        swap2 = i;
      }
    }

    if (swap1 && swap2) {
      this.domain.topics[swap1] = next;
      this.domain.topics[swap2] = index;
    }
    updates[`domains/data/${this.domainId}/topics`] = this.domain.topics;
    await database.ref().update(updates);
  }
}

export { ProtobotAuthoring };
