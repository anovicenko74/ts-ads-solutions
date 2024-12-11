import { input, select } from '@inquirer/prompts'

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

class BinarySearchTree {
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

    // Метод для добавления значения в дерево
    add(value: any): void {
        const newNode = new TreeNode(value)
        if (this.root === null) {
            this.root = newNode
        } else {
            this.insertNode(this.root, newNode)
        }
    }

    // Вспомогательный метод для вставки узла
    insertNode(node: TreeNode, newNode: TreeNode): void {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode
            } else {
                this.insertNode(node.left, newNode)
            }
        } else {
            if (node.right === null) {
                node.right = newNode
            } else {
                this.insertNode(node.right, newNode)
            }
        }
    }

    find(value: any): TreeNode | null {
        return this.searchNode(this.root, value)
    }

    searchNode(node: TreeNode | null, value: any): TreeNode | null {
        if (node === null) {
            return null
        }

        if (value < node.value) {
            return this.searchNode(node.left, value)
        } else if (value > node.value) {
            return this.searchNode(node.right, value)
        } else {
            return node // Узел найден
        }
    }

    remove(value: any): void {
        this.root = this.removeNode(this.root, value)
    }

    removeNode(node: TreeNode | null, value: any): TreeNode | null {
        if (node === null) {
            return null
        }

        if (value < node.value) {
            node.left = this.removeNode(node.left, value)
            return node
        } else if (value > node.value) {
            node.right = this.removeNode(node.right, value)
            return node
        } else {
            if (node.left === null && node.right === null) {
                return null
            }

            if (node.left === null) {
                return node.right
            } else if (node.right === null) {
                return node.left
            }

            let minNode = this.findMinNode(node.right)
            node.value = minNode.value
            node.right = this.removeNode(node.right, minNode.value)
            return node
        }
    }

    findMinNode(node: TreeNode): TreeNode {
        while (node.left !== null) {
            node = node.left
        }
        return node
    }

    preOrderTraversal(node: TreeNode | null, result: any[] = []): any[] {
        if (node) {
            result.push(node.value)
            this.preOrderTraversal(node.left, result)
            this.preOrderTraversal(node.right, result)
        }
        return result
    }

    inOrderTraversal(node: TreeNode | null, result: any[] = []): any[] {
        if (node) {
            this.inOrderTraversal(node.left, result)
            result.push(node.value)
            this.inOrderTraversal(node.right, result)
        }
        return result
    }

    postOrderTraversal(node: TreeNode | null, result: any[] = []): any[] {
        if (node) {
            this.postOrderTraversal(node.left, result)
            this.postOrderTraversal(node.right, result)
            result.push(node.value)
        }
        return result
    }

    getBracketsNotation() {
        return this.toBracketNotation(this.root)
    }

    toBracketNotation(root: TreeNode | null) {
        if (!root) {
            return ''
        }

        let result = root.value.toString()

        if (root.left || root.right) {
            result += ` (${this.toBracketNotation(root.left)}`
            result += root.right
                ? `, ${this.toBracketNotation(root.right)}`
                : ''
            result += ')'
        }

        return result
    }
}

// Пример использования
const bst = new BinarySearchTree()
bst.add(50)
bst.add(30)
bst.add(70)
bst.add(20)
bst.add(40)
bst.add(60)
bst.add(80)

console.log('Pre-order traversal:', bst.preOrderTraversal(bst.root)) // [50, 30, 20, 40, 70, 60, 80]
console.log('In-order traversal:', bst.inOrderTraversal(bst.root)) // [20, 30, 40, 50, 60, 70, 80]
console.log('Post-order traversal:', bst.postOrderTraversal(bst.root)) // [20, 40, 30, 60, 80, 70, 50]

console.log('Find 40:', bst.find(40)) // TreeNode { value: 40, left: null, right: null }
bst.remove(40)
console.log(
    'In-order traversal after removing 40:',
    bst.inOrderTraversal(bst.root)
) // [20, 30, 50, 60, 70, 80]

enum Actions {
    add = 'Добавить',
    remove = 'Удалить',
    end = 'Закончить',
}
const main = async () => {
    const tree = new BinarySearchTree()
    const init = await input({
        message: 'Инициализируйте бинарное дерево с помощью скобочной записи',
    })
    tree.buildTree(init)

    let action
    do {
        action = await select({
            message: 'Выберите действие',
            choices: ['Добавить', 'Удалить', 'Закончить'],
        })

        console.log(action)

        switch (action) {
            case Actions.add:
                const add = await input({
                    message: 'Что добавляем?',
                })
                tree.add(parseInt(add))
                break
            case Actions.remove:
                const remove = await input({
                    message: 'Что убираем?',
                })
                tree.add(parseInt(remove))
        }
    } while (action !== Actions.end)

    console.log(tree.getBracketsNotation())
}

main()
