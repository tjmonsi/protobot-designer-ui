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
  // console.log(topics);
  // const t = [];
  // for (const i in topics) {
  //   t.push(html`<vaadin-item>${topics[i].id}</vaadin-item>`);
  // }
  return html`
    <style>
      ${styles}
      @import url('https://fonts.googleapis.com/css?family=Noto+Sans&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap');
    </style>

    <h1>Micro Review</h1>
    <h3>Crowd name: ${crowdID}</h3>
    <br>

    ${utterances && utterances.length ? utterances.map(item => html`
      <utterance-review-item .utteranceId="${item.id}"></utterance-review-item>
    `) : ''}
  `;
}.bind(self)();

// ${[ t[0], t[1], t[2], t[3], t[4], t[5] ].map(item => html`<vaadin-item>${item.id}</vaadin-item>`)}
