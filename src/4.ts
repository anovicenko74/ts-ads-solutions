// Comb sort
function sort(arr: number[]) {
    const fact = 1.2473309
    let gap = Math.floor(arr.length / fact)

    while (gap >= 1) {
        for (let i = 0; i + gap < arr.length; i++) {
            if (arr[i] > arr[i + gap]) {
                const temp = arr[i]
                arr[i] = arr[i + gap]
                arr[i + gap] = temp
            }
        }

        gap = Math.floor(gap / fact)
    }

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