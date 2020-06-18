import {root} from "./types/root.ts";
import {token, tokenize} from "./index.ts";
import {init} from "./types/index.ts";

let test_txt = `
txt txt txt txt txt
\`\`\`
safe container
safe container
\`\`\`
<open_tag>
txt txt txt txt txt
</close_tag>

<parent_name:tag_name>
txt txt txt txt txt

\`\`\`
safe container
safe container
\`\`\`
</close_tag>
txt txt txt txt txt
<parent_name:tag_name(alias1, alias2)>
</close_tag>
txt txt txt txt txt
`

let root_token = <token>{
    type: root,
    inner_text: test_txt,
    children: []
}
init(root.pattern)
tokenize(root_token)
console.log(JSON.stringify(root_token))