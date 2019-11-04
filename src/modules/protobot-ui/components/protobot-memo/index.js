import { LitElement, customElement, property } from 'lit-element';
import { template } from './template.js';
import { GetDomainMixin } from '../../mixins/get-domain';
import { database } from '../../../firebase';


// @ts-ignore
@customElement('protobot-memo')
class ProtobotMemo extends GetDomainMixin(LitElement) {
  @property()
  memoContent;

  @property()
  updateMemo; // need to be function call

  render () {
    // updateMemo(this, this.idx);
    console.log(this.memoContent)
    return template(this);
  }

  async handleMemo (event) {
    const { target } = event;
    const { value } = target;

    // this.memoContent = value;
    // console.log(this.memoContent);
    console.log(this.updateMemo);
    this.updateMemo(value);
  }


  // this is where you get the unique memo id
  // const { key: memoId } = database.ref('memo/data').push();

  // const memo = {
  //   text,
  //   domainId,
  //   crowId, // can be null
  //   page: // macro/micro
  //   deployedVersion: // think how to add this one
  // };

  // updates[`memo/data/${memoId}`] = memo;
  // updates[`memo/lists/domain-memo/${domainId}/${memoId}`] = true;

  // this saves the memo in db
  // await database.ref().update(updates);

  // -------------------------

  // need function for
  // link done with labeling button for auto save
  // cleanUp
  //
}

export { ProtobotMemo };
