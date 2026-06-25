/**
 * Definition for a binary tree node.
 * class TreeNode {
 * constructor(val = 0, left = null, right = null) {
 * this.val = val;
 * this.left = left;
 * this.right = right;
 * }
 * }
 */

class Solution {
    /**
     * @param {TreeNode} root
     * @return {boolean}
     */
    isValidBST(root) {
        const dfs = (node, minVal, maxVal) => {
            if (node === null) {
                return true;
            }

            // Check karo kya current node boundaries tod raha hai?
            if (minVal !== null && node.val <= minVal) {
                return false;
            }
            if (maxVal !== null && node.val >= maxVal) {
                return false; 
            }

            return dfs(node.left, minVal, node.val) && dfs(node.right, node.val, maxVal);
        };

        return dfs(root, null, null);
    }
}
