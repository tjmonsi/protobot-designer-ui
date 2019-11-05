import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
import 'weightless/textarea';
import 'weightless/button';
import 'weightless/checkbox';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';



/**
 *
 * @param {any} self
 */

export const template = self => function () {

  return html`
  <style>
    ${styles}
  </style>

  <h2>Planning for revision</h2>
  <div class = "plan-input">
    <wl-textfield outlined
      class = "new-input"
      placeholder="Plan"
      value="${this.task}"
      @change="${this.updateTask}">
    </wl-textfield outlined>
    <wl-button
      class = "button-input"
      @click="${this.addTodo}">Add
    </wl-button>
  </div>

  </div>
  <div class="plan-list">
  ${this.todos.map(
      todo => html`
        <div class="plan-item">
          <vaadin-checkbox
            ?checked="${todo.complete}"
            @change="${ e => this.updateTodoStatus(todo)}">
            ${todo.task}
          </vaadin-checkbox>
        </div>
      `
    )
  }
</div>


  `;
}.bind(self)();