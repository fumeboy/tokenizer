import {root} from "./types/root.ts";
import {token, tokenize} from "./index.ts";

let test_txt = `
txt txt txt txt txt
\`\`\`
safe container
safe container
\`\`\`
<open_tag>
txt txt txt txt txt
</close_tag>

<open_tag>
txt txt txt txt txt

\`\`\`
safe container
safe container
\`\`\`
</close_tag>
txt txt txt txt txt
`

let root_token = <token>{
    type: root,
    inner_text: test_txt,
    children: []
}
tokenize(root_token)
console.log(root_token)