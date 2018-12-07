export const delay = (ms) => (
    new Promise(resolve => {
        setTimeout(resolve, ms)
    })
)

export const timeout = (ms) => (
    new Promise((resolve, reject) => {
        setTimeout(reject, ms)
    })
)