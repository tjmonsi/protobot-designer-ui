import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-select';
import 'listbox-combobox';
import '../topic-list-item';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { crowdID, topics, selectedTopic } = this;
  console.log(topics);
  const t = [];
  for (const i in topics) {
    t.push(html`<vaadin-item>${topics[i].id}</vaadin-item>`);
  }
  return html`
    <style>
      ${styles}
      @import url('https://fonts.googleapis.com/css?family=Noto+Sans&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
    </style>

    <h1>Micro Review</h1>
    <h3>Crowd name: ${crowdID}</h3>
    <br>
    <div class="feed feed__right">
      <div>
        <div class="label">User</div>
        <vaadin-button
          theme= "primary"
          class = "user-say"
          @click = "$this.addLabel"> User said!
        </vaadin-button>

        <div class="button-container button-container__right">
          <select @change=${selectedTopic.bind(this)}>
            ${topics ? topics.map(item => html`<option value="${item.id}">${item.id}</option>`) : ''}
            <option value="new-topic">New Topic</option>
          </select>
        </div>
      </div>
    </div>
    <br>
    <div class="feed">
      <div>
        <div class="label">Bot</div>
        <!-- ${topics.map(item => html`${item}`)} -->
        <vaadin-button
          theme= "contrast primary"
          class= "bot-say"> Bot said!
        </vaadin-button>
        <div class="select-container">
          <vaadin-select class="topic-select">
            <template>
              <vaadin-list-box>
              </vaadin-list-box>
            </template>
          </vaadin-select>
        </div>
      </div>
    </div>


  `;
}.bind(self)();

// ${[ t[0], t[1], t[2], t[3], t[4], t[5] ].map(item => html`<vaadin-item>${item.id}</vaadin-item>`)}
