class Solution {
    /**
     * @param {TreeNode} root
     * @return {number[][]}
     */
    levelOrder(root) {
        if(!root) return [];
        const queue = [root];
        const result = [];

        while (queue.length > 0) {
            let levelSize = queue.length;
            let level = [];

            for (let i = 0; i < levelSize; i++) {
                let node = queue.shift();
                level.push(node.val);
                if(node.left) queue.push(node.left);
                if(node.right) queue.push(node.right);

            }
        result.push(level);
            
        }
        
    return  result;
    }

}
