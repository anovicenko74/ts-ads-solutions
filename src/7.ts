// Shell sort
// Insertion sort
function sort(arr: number[]) {
    // https://oeis.org/A102549
    let h = [1750, 701, 301, 132, 57, 23, 10, 4, 1]

    h.forEach((gap) => {
        for (let i = gap; i < arr.length - gap; i++) {
            const current = arr[i]
            let pos = i - gap

            while (pos >= 0 && arr[pos] > current) {
                arr[pos + gap] = arr[pos]
                pos -= gap
            }

            arr[pos + gap] = current
        }
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