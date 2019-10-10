// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-designer-ui-one')
class ProtobotDesignerUIOne extends GetDomainMixin(LitElement) {
  @property()
  x = 1;

  /**
   * Implement `render` to define a template for your element.
   *
   * You must provide an implementation of `render` for any element
   * that uses LitElement as a base class.
   */
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

  refreshList () {
    this.getDomainName(this.domainId);
  }
}

export { ProtobotDesignerUIOne };
