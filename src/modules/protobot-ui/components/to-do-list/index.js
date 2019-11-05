import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
import { database } from '../../../firebase';

// @ts-ignore
@customElement('to-do-list')
class ToDoList extends GetDomainMixin(LitElement) {
  @property()
  todos = [];

  @property()
  task = '';

  render () {
    return template(this)
  }

  async addTodo() {
    if (this.task) {
      this.todos = [...this.todos, {
          task: this.task,
          // complete: false
      }];
      this.task = '';
    }
  }

  async updateTask (event) {
    const { target } = event;
    const { value } = target;
    this.task = value;
  }

  async updateTodoStatus(updatedTodo) {
    this.todos = this.todos.map(todo =>
      updatedTodo === todo ? { ...updatedTodo } : todo
    );
  }
}

export { ToDoList };