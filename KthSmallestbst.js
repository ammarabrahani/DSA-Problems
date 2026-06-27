/**
 * 🌲 Kth Smallest Element in BST
 * 
 * Given the root of a BST and an integer k,
 * return the kth smallest value (1-indexed) in the tree.
 * 
 * Approach 1 - Simple   : O(n) time | O(n) space
 * Approach 2 - Optimal  : O(k) time | O(1) space  ✅
 */

// ─────────────────────────────────────────────
// Approach 1 — Store All (Simple)
// ─────────────────────────────────────────────

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
function kthSmallestSimple(root, k) {
    const result = [];

    function inOrder(node) {
        if (!node) return;

        inOrder(node.left);       // go left
        result.push(node.val);    // store value
        inOrder(node.right);      // go right
    }

    inOrder(root);

    return result[k - 1];         // return kth element
}


// ─────────────────────────────────────────────
// Approach 2 — Stop Early (Optimal) ✅
// ─────────────────────────────────────────────

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
function kthSmallestOptimal(root, k) {
    let result;

    function inOrder(node) {
        if (!node) return;

        inOrder(node.left);       // go left

        k--;                      // count down
        if (k === 0) {            // hit 0? this is the answer
            result = node.val;
            return;
        }

        inOrder(node.right);      // go right
    }

    inOrder(root);

    return result;
}
