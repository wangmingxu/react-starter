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
    Promise.all([p, delay(ms)])
)

export const minDelayForLazy = (p: Promise<any>, ms: number) => (
    pMinDelay(p, ms).then(([mod, dl]) => mod)
)