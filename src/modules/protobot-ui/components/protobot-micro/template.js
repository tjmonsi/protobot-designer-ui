import { html } from 'lit-element';
// @ts-ignore
import styles from './style.css';
import '../topic-list-item';
import '../utterance-review-item';
/**
 *
 * @param {any} self
 */
export const template = self => function () {
  // @ts-ignore
  const { crowdID, topics, utterances } = this;
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
<<<<<<< HEAD
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

=======
>>>>>>> 60e65de98a1d84eec0acebc3b8c697c2b0665c16

    ${utterances && utterances.length ? utterances.map(item => html`
      <utterance-review-item .utteranceId="${item.id}"></utterance-review-item>
    `) : ''}
  `;
}.bind(self)();

// ${[ t[0], t[1], t[2], t[3], t[4], t[5] ].map(item => html`<vaadin-item>${item.id}</vaadin-item>`)}
