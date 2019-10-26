// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
// import { GetTopicMixin } from '../../mixins/get-topic';
// import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('component')
class CompleteTemplate extends (LitElement) {
  // @ts-ignore
  @property({ type: Number })
  index;

  render () {
    return template(this);
  }
}

export { CompleteTemplate };
