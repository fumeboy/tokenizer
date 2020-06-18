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
    goto?: () => pattern

    regexp?: RegExp
}

// * . ? + $ ^ [ ] ( ) { } | \ /
let safe_regexp = /\*|\.|\?|\+|\$|\^|\[|\]|\(|\)|\{|\}|\||\\/g;

export function init(p: pattern) {
    if(p.regexp)return;
    if (p.next) {
        let keys = Object.keys(p.next)
        for (let i = 0, l = keys.length; i < l; i++) {
            init(p.next[keys[i]])
            keys[i] = keys[i].replace(safe_regexp, (word)=>"\\"+word)
        }
        p.regexp = new RegExp(keys.join("|"))
    }
    if (p.match && p.match.pattern) {
        init(p.match.pattern)
    }
}