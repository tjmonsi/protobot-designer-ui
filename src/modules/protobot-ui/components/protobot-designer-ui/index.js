// Import the LitElement base class and html helper function
import { LitElement, customElement } from 'lit-element';
import { template } from './template.js';
import { GetPathMixin } from '../../mixins/get-path';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-designer-ui')
class ProtobotDesignerUI extends GetPathMixin(LitElement) {
  render () {
    return template(this);
  }
}

export { ProtobotDesignerUI };
