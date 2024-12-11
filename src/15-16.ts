class TreeNode {
    value: any
    left: TreeNode | null
    right: TreeNode | null

    constructor(value: any) {
        this.value = value
        this.left = null
        this.right = null
    }
}

class BinaryTree {
    root: TreeNode | null

    constructor() {
        this.root = null
    }

    buildTree(input: string) {
        const tokens = this.tokenize(input)
        if (!tokens) throw new Error('Не получилось создать токены из строки')
        const [tree, _] = this.buildTreeFromTokens(tokens)
        this.root = tree
    }

    tokenize(input: string) {
        const regex = /(\()|(\))|(\d+)|\,/g
        return input.match(regex)
    }

    buildTreeFromTokens(tokens: string[]): [TreeNode | null, string[]] {
        if (tokens.length === 0) {
            return [null, tokens]
        }

        const value = tokens.shift()
        if (value === null || value === ')' || value === ',') {
            return [null, tokens]
        }

        const node = new TreeNode(Number(value))

        if (tokens[0] === '(') {
            tokens.shift()
            const [tree, tokensAfterLeft] = this.buildTreeFromTokens(tokens)
            node.left = tree
            tokens = tokensAfterLeft
            if (tokens[0] === ',') {
                tokens.shift()
                const [tree, tokensAfterRight] =
                    this.buildTreeFromTokens(tokens)
                node.right = tree
                tokens = tokensAfterRight
            }
            if (tokens[0] === ')') {
                tokens.shift()
            }
        }

        return [node, tokens]
    }

    // NLR
    preOrderTraversal(node: TreeNode | null, result: any[] = []) {
        if (node) {
            result.push(node.value)
            this.preOrderTraversal(node.left, result)
            this.preOrderTraversal(node.right, result)
        }
        return result
    }

    // LNR
    inOrderTraversal(node: TreeNode | null, result: any[] = []) {
        if (node) {
            this.inOrderTraversal(node.left, result)
            result.push(node.value)
            this.inOrderTraversal(node.right, result)
        }
        return result
    }

    // LRN
    postOrderTraversal(node: TreeNode | null, result: any[] = []) {
        if (node) {
            this.postOrderTraversal(node.left, result)
            this.postOrderTraversal(node.right, result)
            result.push(node.value)
        }
        return result
    }

    iterativePreOrderTraversal(node: TreeNode | null): any[] {
        const result: any[] = []
        if (!node) return result

        const stack: TreeNode[] = [node]
        while (stack.length > 0) {
            const current = stack.pop()!
            result.push(current.value)

            if (current.right) stack.push(current.right)
            if (current.left) stack.push(current.left)
        }

        return result
    }
}

const readline = require('node:readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
rl.question(`Insert tree \n`, (input: string) => {
    rl.close()
    const binaryTree = new BinaryTree()
    binaryTree.buildTree(input || '8 (3 (1, 6 (4, 7)))')
    console.log('Прямой обход:', binaryTree.preOrderTraversal(binaryTree.root))
    console.log(
        'Центровой обход:',
        binaryTree.inOrderTraversal(binaryTree.root)
    )
    console.log(
        'Концевой обход:',
        binaryTree.postOrderTraversal(binaryTree.root)
    )
    console.log(
        'Прямой обход (нерекурсивный):',
        binaryTree.iterativePreOrderTraversal(binaryTree.root)
    )
})
