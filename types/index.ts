export type typ = {
    name: string
    pattern: pattern_
}
export type pattern_ = {
    match: typ
    next: { [key: string]: pattern_ }
    goto: () => pattern_
}