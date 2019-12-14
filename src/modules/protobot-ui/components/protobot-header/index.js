// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetDomainUsersMixin } from '../../mixins/get-domain-users';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-header')
class ProtobotSidebar extends GetDomainUsersMixin(LitElement) {
  @property()
  domainName = '';

  @property()
  designerName = '';

  render () {
    return template(this);
  }

  domainChanged (domain) {
    super.domainChanged(domain);

    if (domain) {
      this.domainName = domain.name || '';
      this.designerName = domain.designer || '';
    }
  }

  async changeDomainName (event) {
    const { target } = event;
    const { value } = target;

    if (this.domainName !== value) {
      // saves the name
      await database.ref(`domains/data/${this.domainId}/name`).set(value);
    }
  }

  async changeDesignerName (event) {
    const { target } = event;
    const { value } = target;

    if (this.designerName !== value) {
      // saves the designer
      await database.ref(`domains/data/${this.domainId}/designer`).set(value);
    }
  }

  /**
   *
   * @param {String} id
   */
  async gettingCrowdId (id) {
    // console.log(`${id}`);
    return (await database.ref(`users/data/${id}/name`).once('value')).val();
  }

  // /**
  //  *
  //  * @param {String} memoId
  //  */
  // async gettingMemo (memoId) {
  //   // console.log(`${id}`);
  //   return (await database.ref(`memos/data/${memoId}/text`).once('value')).val();
  // }


}

export { ProtobotSidebar };
