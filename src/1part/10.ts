// Merge sort
function merge(a: number[], left: number, mid: number, right: number) {
    let it1 = 0
    let it2 = 0
    const result = []

    while (left + it1 < mid && mid + it2 < right) {
        if (a[left + it1] < a[mid + it2]) {
            result[it1 + it2] = a[left + it1]
            it1++
        } else {
            result[it1 + it2] = a[mid + it2]
            it2++
        }
    }

    while (left + it1 < mid) {
        result[it1 + it2] = a[left + it1]
        it1++
    }
    while (mid + it2 < right) {
        result[it1 + it2] = a[mid + it2]
        it2++
    }

    for (let i = 0; i < it1 + it2; i++) {
        a[left + i] = result[i]
    }
}

function sort(a: number[], left: number = 0, right: number = a.length) {
    if (left + 1 >= right) {
        return
    }

    const mid = Math.floor((left + right) / 2)
    sort(a, left, mid)
    sort(a, mid, right)
    merge(a, left, mid, right)

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
