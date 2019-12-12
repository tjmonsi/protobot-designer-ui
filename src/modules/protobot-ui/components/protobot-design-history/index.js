// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetDomainVersionsMixin } from '../../mixins/get-domain-versions';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-design-history')
class ProtobotDesignHistory extends GetDomainVersionsMixin(LitElement) {
  @property ({type: String})
  lastDeployedDomainVersion

  @property ({type: Array})
  deployedTopics = []


  render () {
    return template(this);
  }

  async changeVersion ({detail: id}) {
    super.updateLatestDeployedDomainVersion(id, this.fetchHistory.bind(this))
  }

  async fetchHistory(deployId){
    const snap = await database.ref(`deployed-history/data/${this.domainId}/${deployId}`).once('value');
    console.log(snap.val())
    const domain = snap.val() || { topics: {}, subs: [] };
    const { topics, subs } = domain;
    const array = [];
    for (const topic in topics) {
      array.push({ topic, order: topics[topic], sub: subs[topic] || false });
    }
    this.deployedTopics = array.sort((i, j) => (i.order - j.order)).map(i => ({ id: i.topic, sub: i.sub }));
    console.log(this.deployedTopics)
  }
}

export { ProtobotDesignHistory };
