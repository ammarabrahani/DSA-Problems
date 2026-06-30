/**
 * Definition for a binary tree node.
 */
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class Solution {
  /**
   * Reconstructs a binary tree from preorder and inorder traversal arrays.
   *
   * Key insight:
   *   - preorder[0] is always the current root
   *   - Find that value in inorder → left of it = left subtree, right of it = right subtree
   *   - Recurse with the correctly sized slices of each array
   *
   * Time:  O(n²) naive (indexOf per call); O(n) with a Map index
   * Space: O(n) for the recursion stack + the Map
   *
   * @param {number[]} preorder
   * @param {number[]} inorder
   * @return {TreeNode}
   */
  buildTree(preorder, inorder) {
    // Build a value → index map for O(1) inorder lookups
    const inorderIndex = new Map();
    for (let i = 0; i < inorder.length; i++) {
      inorderIndex.set(inorder[i], i);
    }

    /**
     * @param {number} preStart - current window start in preorder
     * @param {number} inStart  - current window start in inorder
     * @param {number} size     - number of nodes in this subtree
     */
    const build = (preStart, inStart, size) => {
      if (size <= 0) return null;

      // The first element of the current preorder window is the root
      const rootVal = preorder[preStart];
      const root = new TreeNode(rootVal);

      // How many nodes are in the left subtree?
      const leftSize = inorderIndex.get(rootVal) - inStart;

      // Left subtree:  next element in preorder, same inorder start
      root.left = build(preStart + 1, inStart, leftSize);

      // Right subtree: skip past root + all left nodes in preorder
      root.right = build(preStart + 1 + leftSize, inStart + leftSize + 1, size - leftSize - 1);

      return root;
    };

    return build(0, 0, preorder.length);
  }
}

/* ─── Quick smoke test ───────────────────────────────────────────────────── */
// preorder = [3, 9, 20, 15, 7]
// inorder  = [9, 3, 15, 20, 7]


const s = new Solution();
const root = s.buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);

const inorderCheck = (node) => {
  if (!node) return [];
  return [...inorderCheck(node.left), node.val, ...inorderCheck(node.right)];
};

console.log(inorderCheck(root)); // → [9, 3, 15, 20, 7] ✓
