export type typ = {
    name: string
    pattern: pattern
}
export type pattern = {
    match?: typ
    next?: { [key: string]: pattern }
    // 对于 next pattern 的选择相当于 switch
    catch?: typ | number
    // catch 相当于 switch 的 default
    // 默认值 undefined
    // 可选值： typ{}, 0, -1
    // 触发 catch 时， "-1" 和 undefined 会抛出错误，表示没能正常捕捉到 next 预计的字符
    //                "0" 表示可以接收没能捕捉到的情况，正常退出程序；
    //                typ{} 即指定了最后的字符串所属的 token 类型

    goto?: () => pattern
}