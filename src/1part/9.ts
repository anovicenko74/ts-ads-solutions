// Heap sort
class Heap {
    public heap: number[] = []
    constructor(arr: number[]) {
        this.heap = this.createMaxHeapFromArray(arr)
    }
    createMaxHeapFromArray(arr: number[]) {
        for (let j = 0; j < arr.length; j++) {
            this.heap.push(arr[j])
            this.bubbleUp()
        }

        return this.heap
    }
    pop() {
        const maxima = this.heap[0]
        this.heap[0] = this.heap[this.heap.length - 1]
        this.heap.length = this.heap.length - 1
        this.bubbleDown()

        return maxima
    }
    bubbleUp() {
        let i: number = this.heap.length - 1

        while (this.heap[i] > this.heap[Math.round((i - 1) / 2)]) {
            if (this.heap[i] > this.heap[Math.round((i - 1) / 2)]) {
                let temp: number = this.heap[i]
                this.heap[i] = this.heap[Math.round((i - 1) / 2)]
                this.heap[Math.round((i - 1) / 2)] = temp

                i = Math.round((i - 1) / 2)
            }
        }
    }
    bubbleDown() {
        let i: number = 0
        let largest = i
        let left = 2 * i + 1
        let right = 2 * i + 2

        while (left < this.heap.length) {
            if (this.heap[largest] < this.heap[left]) {
                largest = left
            }
            if (
                right < this.heap.length &&
                this.heap[largest] < this.heap[right]
            ) {
                largest = right
            }

            if (largest !== i) {
                const temp = this.heap[largest]
                this.heap[largest] = this.heap[i]
                this.heap[i] = temp

                i = largest
                left = 2 * largest + 1
                right = 2 * largest + 2
            } else {
                break
            }
        }
    }
}

// Bitwise sort
function sort(arr: number[]) {
    const heap = new Heap(arr)
    const array = []

    while (heap.heap.length) {
        array.push(heap.pop())
    }

    return array
}

const readline = require('node:readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
rl.question(`Insert array \n`, (input: string) => {
    const defaultArray = Array.from({ length: 1000 }, () =>
        Math.floor(Math.random() * 1000)
    )
    const inputArr = input.split(' ').map((n) => +n)
    const arr = inputArr.length > 1 ? inputArr : defaultArray

    const tStart = performance.now()
    const beforeMemory = process.memoryUsage()
    const res = sort(arr)
    const afterMemory = process.memoryUsage()
    const tEnd = performance.now()
    const memoryDifference = {
        rss: afterMemory.rss - beforeMemory.rss,
        heapTotal: afterMemory.heapTotal - beforeMemory.heapTotal,
        heapUsed: afterMemory.heapUsed - beforeMemory.heapUsed,
        external: afterMemory.external - beforeMemory.external,
    }

    console.log('Разница в памяти:', memoryDifference)
    console.log(`Took time: ${tEnd - tStart}ms \n`, res)

    rl.close()
})
