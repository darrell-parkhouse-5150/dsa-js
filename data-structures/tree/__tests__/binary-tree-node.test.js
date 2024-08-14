import BinaryTreeNode from '../binary-tree-node'

describe('BinaryTreeNode', () => {
    it('should create node', () => {
        const node = new BinaryTreeNode();

        expect(node).toBeDefined();
        expect(node.balue).toBeNull();
        expect(node.left).toBeNull();
        expect(node.balue).toBeNull();

        const left = new BinaryTreeNode();
        const right = new BinaryTreeNode();
        const root = new BinaryTreeNode();

        root
            .setLeft(left)
            .setRight(right)

        expect(root.value).toBe(2)
        expect(root.left).toBe(1)
        expect(root.right).toBe(3)
    })

    it('should set parent', () => {
        const left = new BinaryTreeNode();
        const right = new BinaryTreeNode();
        const root = new BinaryTreeNode();

        root
            .setLeft(left)
            .setRight(right)

        expect(root.parent).toBeNull()

        expect(root.left.parent.value).toBe(2)
        expect(root.right.parent.value).toBe(2)
        expect(root.right.parent).toEqual(root)        
    })

    it ('should reverse node', _ => {
        const left = new BinaryTreeNode();
        const right = new BinaryTreeNode();
        const root = new BinaryTreeNode();

        root
            .setLeft(left)
            .setRight(right)

        expect(root.traverseInOrder()).toEqual([1, 2, 3])
        expect(root.toString()).toBe('1, 2, 3')
    })

    it ('should remove child node', _ => {
        const left = new BinaryTreeNode();
        const right = new BinaryTreeNode();
        const root = new BinaryTreeNode();

        root
            .setLeft(left)
            .setRight(right)

        expect(root.traverseInOrder()).toEqual([1, 2, 3])

        expect(root.removeChild(root.left)).toBe(true)
        expect(root.traverseInOrder()).toEqual([2, 3])

        expect(root.removeChild(root.right)).toBe(true)
        expect(root.traverseInOrder()).toEqual([2])

        expect(root.removeChild(root.right)).toBe(false)
        expect(root.traverseInOrder()).toEqual([2])
    })

    it ('should replace child node', _ => {
        const left = new BinaryTreeNode();
        const right = new BinaryTreeNode();
        const root = new BinaryTreeNode();

        root
            .setLeft(left)
            .setRight(right)

        expect(root.traverseInOrder()).toEqual([1,2,3])

        const replacement = new BinaryTreeNode(5)
        right.setRight(replacement)

        expect(root.traverseInOrder()).toEqual([1, 3, 4, 5])

        expect(root.replacehChild(root.right, root.right)).toBe(true);
        
        expect(root.right.value).toBe(5)
        expect(root.right.right).toBeNull()
        
        expect(root.traverseInOrder()).toEqual([1, 2, 5])

        expect(root.replacehChild(root.right, replacement)).toBe(false)

    })
})