// Внешняя многофазная
import fs from 'fs'

const readStream = fs.createReadStream('src/assets/soobig.txt')

readStream.on('data', (chunk) => {
    console.log(chunk)
})

// function readChunk(filename: string, start: number, end: number) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(filename, { start, end }, (err, data) => {
//             if (err) reject(err)
//             resolve(data)
//         })
//     })
// }

// // Функция для записи части файла
// function writeChunk(filename, data, offset) {
//     return new Promise((resolve, reject) => {
//         fs.write(filename, data, offset, (err) => {
//             if (err) reject(err)
//             resolve()
//         })
//     })
// }

// let words: string[] = []
// try {
//     words = fs.readFileSync('src/assets/soobig.txt', 'utf-8').split(/\s+/)
//     words.length % 2 != 0 ? (words.length -= 1) : words.length
// } catch (e) {
//     console.error(e)
// }
