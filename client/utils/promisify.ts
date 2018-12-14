export const delay = (ms: number) => (
    new Promise(resolve => {
        setTimeout(resolve, ms)
    })
)

export const timeout = (ms: number) => (
    new Promise((resolve, reject) => {
        setTimeout(reject, ms)
    })
)

export const pMinDelay = (p: Promise<any>, ms: number) => (
    Promise.all([p, delay(ms)]).then(([ret, ]) => ret)
)

export const pMaxTimeout = (p: Promise<any>, ms: number) => (
    Promise.race([p, timeout(ms)])
)