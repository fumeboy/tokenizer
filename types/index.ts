export type typ = {
    name: string
    pattern: pattern
}
export type pattern = {
    match?: typ
    next?: { [key: string]: pattern }
    // 对于 next pattern 的选择相当于 switch
    final?: typ | number
    // final 相当于 switch 的 default
    goto?: () => pattern
}