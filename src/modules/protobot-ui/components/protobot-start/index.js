// Import the LitElement base class and html helper function
import { LitElement, customElement } from 'lit-element';
import { template } from './template.js';
import { GetPathMixin } from '../../mixins/get-path';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-start')
class ProtobotStart extends GetPathMixin(LitElement) {
  render () {
    return template(this);
  }

  submit (event) {
    event.preventDefault();
    const { target } = event;
    const { domain } = target;

    if (domain.value) {
      window.location.href = `/?domain=${domain.value}`;
    }
  }

  async newDomain () {
    const { key } = database.ref('domains/data').push();
    const updates = {};

    updates[`domains/data/${key}`] = {
      deployed: false,
      designer: '',
      name: ''
    };

    await database.ref().update(updates);
    window.location.href = `/?domain=${key}`;
  }
}

export { ProtobotStart };
