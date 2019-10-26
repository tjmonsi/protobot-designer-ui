import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-select'
import '../topic-list-item';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { crowdID, topics } = this;
  console.log(topics)
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
          class = "user-say"> User said!
        </vaadin-button>
        <div class="button-container button-container__right">
          <vaadin-select class="topic-select">
              <template>
                <vaadin-list-box>
                  <!-- wanna put topic here -->
                  <vaadin-item>Jose</vaadin-item>
                  <vaadin-item>Manolo</vaadin-item>
                  <vaadin-item>Pedro</vaadin-item>
                </vaadin-list-box>
              </template>
            </vaadin-select>
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
                <!-- wanna put topic here -->
                  ${["topic1", "topic2"].map(item => html`<vaadin-item>${item}</vaadin-item>`)}
                </vaadin-item>
                <vaadin-item class="new-item-input">Add new topic</vaadin-item>
              </vaadin-list-box>
              <!-- <vaadin-list-box>
                ${["topic4", "topic5"].map(item=> html`${item}`)}
              </vaadin-list-box> -->
            </template>
          </vaadin-select>
        </div>
      </div>
    </div>


  `;
}.bind(self)();
