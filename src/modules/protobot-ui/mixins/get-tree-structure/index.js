// @ts-ignore
import { property } from 'lit-element';
import { database } from '../../../firebase';
import { GetDomainMixin } from '../get-domain';

/**
 *
 * @param {*} base
 */
export const GetTreeStructureMixin = (base) => (class extends GetDomainMixin(base) {
  // @ts-ignore
  @property({ type: Object })
  tree;

  updated (changedProps) {
    if (super.updated) super.updated(changedProps);
    if (changedProps.has('domainId')) {
      this.getTreeStructure(this.domainId);
    }
  }

  async getTreeStructure (domainId) {
    // console.log(domainId);
    const snap = await database.ref('tree-structure/data/').orderByChild('domain').equalTo(domainId)
      // .limitToFirst(10)
      .once('value');
    this.tree = snap.val() || null;
    this.treeChanged(this.tree);
  }

  treeChanged (tree) {}
});
