// @ts-nocheck

class TreeNode {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

class Calculator {
    constructor() {
        this.operators = ['+', '-', '*', '/']
    }

    // Токенизация: разбиваем строку на токены
    tokenize(input) {
        const regex = /(\d+(\.\d*)?|\+|\-|\*|\/|\(|\))/g
        const tokens = input.match(regex)
        return tokens.map((token) => {
            // Преобразуем числа в тип Number, остальные оставляем как есть
            if (this.isNumber(token)) {
                return Number(token)
            }
            return token
        })
    }

    // Построение дерева выражений из токенов
    buildExpressionTree(tokens) {
        const operatorPrecedence = { '+': 1, '-': 1, '*': 2, '/': 2 }

        const operatorStack = []
        const operandStack = []

        while (tokens.length > 0) {
            const token = tokens.shift()

            if (this.isNumber(token)) {
                // Если токен - число, добавляем в стек операндов
                operandStack.push(new TreeNode(token))
            } else if (token === '(') {
                // Если токен - открывающая скобка, добавляем в стек операторов
                operatorStack.push(token)
            } else if (token === ')') {
                // Если токен - закрывающая скобка, обрабатываем стек до открывающей скобки
                while (operatorStack[operatorStack.length - 1] !== '(') {
                    this.processOperator(operandStack, operatorStack.pop())
                }
                operatorStack.pop() // Убираем '(' из стека
            } else if (this.operators.includes(token)) {
                // Если токен - оператор, обрабатываем стек операторов по приоритету
                while (
                    operatorStack.length &&
                    operatorPrecedence[
                        operatorStack[operatorStack.length - 1]
                    ] >= operatorPrecedence[token]
                ) {
                    this.processOperator(operandStack, operatorStack.pop())
                }
                operatorStack.push(token)
            }
        }

        // Обрабатываем оставшиеся операторы в стеке
        while (operatorStack.length) {
            this.processOperator(operandStack, operatorStack.pop())
        }

        return operandStack.pop() // Возвращаем корень дерева
    }

    // Процесс обработки оператора
    processOperator(operandStack, operator) {
        const right = operandStack.pop()
        const left = operandStack.pop()
        const node = new TreeNode(operator)
        node.left = left
        node.right = right
        operandStack.push(node)
    }

    // Проверка, является ли токен числом
    isNumber(token) {
        return typeof token === 'number'
    }

    // Оценка выражения по дереву
    evaluateExpressionTree(node) {
        if (!node) return 0

        if (this.isNumber(node.value)) {
            return node.value
        }

        const leftValue = this.evaluateExpressionTree(node.left)
        const rightValue = this.evaluateExpressionTree(node.right)

        switch (node.value) {
            case '+':
                return leftValue + rightValue
            case '-':
                return leftValue - rightValue
            case '*':
                return leftValue * rightValue
            case '/':
                return leftValue / rightValue
            default:
                return 0
        }
    }

    // Основной метод для вычисления выражения
    calculate(expression) {
        // Добавляем пробелы между операторами и числами, чтобы правильно токенизировать
        const spacedExpression = expression
            .replace(/([+\-*/()])/g, ' $1 ')
            .replace(/\s+/g, ' ')
            .trim()
        const tokens = this.tokenize(spacedExpression)
        const tree = this.buildExpressionTree(tokens)
        return this.evaluateExpressionTree(tree)
    }
}

// Пример использования
const calculator = new Calculator()
const expression = '(2+2)*-2'
const result = calculator.calculate(expression)
console.log(`${expression} = ${result}`)
