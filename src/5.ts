// Insertion sort
function sort(arr: number[]) {
    arr.forEach((current, i, arr) => {
        let pos = i - 1

        while (pos >= 0 && arr[pos] > current) {
            arr[pos + 1] = arr[pos]
            pos--
        }

        arr[pos + 1] = current
    })

    return arr
}

const readline = require('node:readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
rl.question(`Insert array \n`, (input: string) => {
    const defaultArray = Array.from(
        { length: 4000 },
        () => Math.random() * 1000
    )
    const inputArr = input.split(' ').map((n) => +n)
    const arr = inputArr.length > 1 ? inputArr : defaultArray

    const tStart = performance.now()
    const res = sort(arr)
    const tEnd = performance.now()
    console.log(`Took time: ${tEnd - tStart}ms \n`, res)

    rl.close()
})
