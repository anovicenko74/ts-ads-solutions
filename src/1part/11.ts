// Quick sort
function partition(a: number[], l: number, r: number) {
    const v = a[(l + r) / 2]
    let i = l
    let j = r
    while (i <= j) {
        while (a[i] < v) i++
        while (a[j] > v) j--
        if (i >= j) break
        const temp = a[i]
        a[i++] = a[j]
        a[j--] = temp
    }

    return j
}

function sort(a: number[], l: number = 0, r: number = a.length) {
    if (l < r) {
        const q = partition(a, l, r)
        sort(a, l, q)
        sort(a, q + 1, r)
    }

    return a
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
    const res = sort(arr, 0, arr.length)
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
