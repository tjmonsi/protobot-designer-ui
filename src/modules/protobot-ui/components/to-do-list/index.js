import { LitElement, customElement } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
import { database } from '../../../firebase';

// @ts-ignore
@customElement('to-do-list')
class ToDoList extends GetDomainMixin(LitElement) {

  render () {
    return template(this)
  }
}

export { ToDoList };