// Bitwise sort
function sort(array: number[]) {
    for (let j = 1; j < 3; j++) {
        let buffer = Array.from({ length: 10 }, () => [] as number[])

        for (let i = 0; i < array.length; i++) {
            const n = array[i]
            const m = Math.pow(10, j - 1)
            const digit = Math.floor(n / m) % 10
            buffer[digit].push(n)
        }

        array = buffer.reduce((acc, pocket) => {
            acc.push(...pocket)
            return acc
        }, [])
        console.log(array)
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
