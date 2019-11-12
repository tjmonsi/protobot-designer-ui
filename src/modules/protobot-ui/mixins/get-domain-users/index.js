// @ts-ignore
import { property } from 'lit-element';
import { database } from '../../../firebase';
import { GetDomainMixin } from '../get-domain';

/**
 *
 * @param {*} base
 */
export const GetDomainUsersMixin = (base) => (class extends GetDomainMixin(base) {
  // @ts-ignore
  @property({ type: Array })
  users = [];

  constructor () {
    super();
    this.boundSaveDomainUsers = this.saveDomainUsers.bind(this);
  }

  disconnectedCallback () {
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }

    this.disconnectRef();
  }

  domainChanged (data) {
    super.domainChanged(data);
    if (data) {
      this.getDomainUsers(data);
    }
  }

  disconnectRef () {
    if (super.disconnectRef) super.disconnectRef();

    if (this.domainUsersRef) {
      this.domainUsersRef.off('value', this.boundSaveDomainUsers);
    }
  }

  /**
   *
   * @param {String} id
   */
  getDomainUsers (id) {
    this.disconnectRef();

    if (id) {
      this.domainUsersRef = database.ref('users/lists/domain-utterances/');
      this.domainUsersRef.on('value', this.boundSaveDomainUsers);
    } else {
      console.log('No values for id-crowdId: ', id);
    }
  }

  saveDomainUsers (snap) {
    const data = snap.val() || null;
    const array = [];
    if (data) {
      for (const user in data) {
        if (data[user][this.domainId]) {
          array.push(user);
        }
      }
      this.users = array;
      this.domainUsersChanged(this.users);
    }
  }

  domainUsersChanged (data) { }
});
