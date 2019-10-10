// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetPathMixin } from '../../mixins/get-path';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-designer-intro')
class ProtobotDesignerIntro extends GetPathMixin(LitElement) {
  @property()
  x = 1;

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
}

export { ProtobotDesignerIntro };
