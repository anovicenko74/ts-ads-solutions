import fs from 'fs'

class HashMap {
    table: [string, any][][] = []
    filled: number = 0

    constructor(obj: Record<string, any> = {}) {
        this.table.length = 10
        Object.entries(obj).map(([key, value]) => {
            this.set(key, value)
        })
    }

    public set(key: string, value: any) {
        const hash = this._hash(key)
        if (!this.table[hash]) {
            this.table[hash] = []
        }
        this.table[hash].push([key, value])
        this.filled++
        this._computeCapacity()
        return
    }
    public get(key: string) {
        const hash = this._hash(key)

        return this.table[hash]
            ?.find(([k]) => {
                return k === key
            })
            ?.at(1)
    }
    public delete(key: string) {
        const hash = this._hash(key)
        this.table[hash] = this.table[hash]?.filter(([k]) => {
            return k !== key
        })
        return
    }
    private _extend() {
        this.table.length = this.table.length * 2
    }
    private _computeCapacity() {
        if (this.filled / this.table.length > 0.85) {
            this._extend()
        }
    }
    private _hash(s: string) {
        let hash = 0

        if (s.length == 0) return hash

        for (let i = 0; i < s.length; i++) {
            const char = s.charCodeAt(i)
            hash = (hash << 5) - hash + char
            hash = hash & hash
        }
        return Math.abs(hash % this.table.length)
    }
}

let words: string[] = []
try {
    words = fs.readFileSync('src/assets/lorem.txt', 'utf-8').split(/\s+/)
    words.length % 2 != 0 ? (words.length -= 1) : words.length
} catch (e) {
    console.error(e)
}

const hashMap = new HashMap({
    default: 'value',
})
const keys = words.slice(0, words.length / 2)
const values = words.slice(words.length / 2)
keys.forEach((key, i) => {
    hashMap.set(key, values[i])
})
hashMap.delete('quia')

console.log(`default: ${hashMap.get('default')}`)
keys.forEach((key) => {
    console.log(`${key}: ${hashMap.get(key)}`)
})
console.log(hashMap)
