import {typ} from "./types/index.ts";

export type token = {
    type: typ
    inner_text: string
    children: token[]
}

export function tokenize(token: token) {
    let pattern = token.type.pattern
    if (!pattern) return;
    let text = token.inner_text
    while (true) {
        if (pattern.goto == undefined) {
            if (!pattern.next) return;
            let next_meet = text.match(new RegExp(Object.keys(pattern.next).join("|")))
            if (!next_meet) {// 没有遇到期望的 next
                if (pattern.catch != undefined) {
                    if(pattern.catch == -1){
                        throw ""
                    }
                    if(pattern.catch == 0){
                        return;
                    }
                    let child = <token>{
                        type: pattern.catch,
                        inner_text: text.slice(0),
                        children: []
                    }
                    token.children.push(child)
                    tokenize(child)
                }
                throw ""
            }
            let next_symbol = next_meet[0]
            pattern = pattern.next[next_symbol]
            let match = pattern.match

            if (match) {
                let child = <token>{
                    type: match,
                    inner_text: text.slice(0, next_meet.index),
                    children: []
                }
                token.children.push(child)
                tokenize(child)
            }
            text = text.slice(next_meet.index! + next_symbol.length)
        } else {
            pattern = pattern.goto()
        }
    }
}