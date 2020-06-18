import {typ} from "./types/index.ts";
import {root} from "./types/root.ts";

type token = {
    type: typ
    inner_text: string
    children: token[]
}

let test_txt = `
txt txt txt txt txt
\`\`\`
safe container
safe container
\`\`\`
<im open_tag>
txt txt txt txt txt
</im open_tag>

<parent:open_tag>
txt txt txt txt txt

\`\`\`
safe container
safe container
\`\`\`
</open_tag>

<parent:open_tag(alias, alias2)>
txt txt txt txt txt
</open_tag>
txt txt txt txt txt
`

function tokenize(token: token) {
    let pattern = token.type.pattern
    if(!pattern)return;
    let text = token.inner_text
    while(true){
        if (pattern.goto == undefined) {
            if(!pattern.next)return;
            let next_meet = text.match(new RegExp(Object.keys(pattern.next).join("|")))
            if(!next_meet){
                return
            }
            let next_symbol = next_meet[0]
            pattern = pattern.next[next_symbol]
            let match = pattern.match

            if(match){
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

let root_token = <token>{
    type: root,
    inner_text: test_txt,
    children: []
}
tokenize(root_token)
console.log(root_token)