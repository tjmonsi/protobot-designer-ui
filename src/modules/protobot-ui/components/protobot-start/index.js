// Import the LitElement base class and html helper function
import { LitElement, customElement } from 'lit-element';
import { template } from './template.js';
import { GetPathMixin } from '../../mixins/get-path';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-start')
class ProtobotStart extends GetPathMixin(LitElement) {
  render () {
    return template(this);
  }

  submit (event) {
    event.preventDefault();
    const { target } = event;
    const { domain } = target;

    if (domain.value) {
      window.location.href = `/?domain=${domain.value}`;
    }
  }

  async newDomain () {
    // const { key } = database.ref('domains/data').push();
    const { key: utteranceId } = database.ref('utterances/data').push();
    const { key: topicId } = database.ref('labels/data').push();
    let flag = false;
    let number = 0;

    do {
      // @ts-ignore
      number = parseInt(Math.random() * 100);
      console.log(number);
      const snap = await database.ref(`labales/data/domain${number}`).once('value');
      flag = snap.exists();
    } while (flag);

    const key = `domain${number}`;

    const { key: deployedVersion } = database.ref(`domains-history/data/${key}`).push();
    // return;
    // const snap = await database.ref(`domains/data/${domain}`).once('value');
    const updates = {};

    const obj = {
      deployed: false,
      designer: '',
      name: '',
      topics: {},
      topicList: {},
      deployedVersion,
      subs: {}
    };

    obj.topics[topicId] = 0;
    obj.topicList[topicId] = true;
    obj.subs[topicId] = false;

    const topic = {
      domain: key,
      name: 'Topic',
      required: true,
      mainUtterance: utteranceId,
      utterances: {}
    };

    topic.utterances[utteranceId] = true;

    const utterance = {
      bot: true,
      domain: key,
      required: true,
      text: 'Utterance',
      version: deployedVersion,
      topics: {}
    };

    utterance.topics[topicId] = true;

    const newTopics = {};
    newTopics[topicId] = 0;

    updates[`labels/data/${topicId}`] = topic;
    updates[`utterances/data/${utteranceId}`] = utterance;
    updates[`domains/data/${key}`] = obj;
    updates[`domains/lists/domain-list/${key}`] = obj.name;

    await database.ref().update(updates);
    window.location.href = `/?domain=${key}`;
  }
}

export { ProtobotStart };
