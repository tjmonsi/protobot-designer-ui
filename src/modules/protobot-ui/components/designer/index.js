// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetPathMixin } from '../../mixins/get-path';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-designer-ui')
class ProtobotDesignerUI extends GetPathMixin(LitElement) {
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
}

export { ProtobotDesignerUI };
