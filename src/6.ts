// choice sort
function sort(arr: number[]) {
    const answer = []
    for (let i = 0; i < arr.length; i++) {
        const current = arr[i]
        let min = arr[i]
        let minX = i
        for (let j = i; j < arr.length; j++) {
            if (arr[j] < min) {
                min = arr[j]
                minX = j
            }
        }
        arr[i] = min
        arr[minX] = current
    }

    return arr
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
