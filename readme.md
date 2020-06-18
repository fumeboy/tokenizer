# tokenizer

简单但原创的分词器

## 运行环境和启动命令

仅依赖一个 typescript 解释器，这里是 deno

命令是 `deno run test.ts`

## 在该程序里

token 具有嵌套结构，每个 token 可以是 "sub-token" 的集合

typ 表示 token 的种类，具有 pattern

pattern 负责从 token 中划分出 sub-token

## about pattern

下面是一颗 pattern 树，从 token 中划分出 sub-token

```
pattern: {
    next: {
        "```": {
            match: txt,
            next: {
                "```": {
                    match: safe,
                    goto: () => root.pattern,
                }
            }
        },
        "</": {
            match: txt,
            next: {
                ">": {
                    match: close_tag,
                    goto: () => root.pattern,
                }
            }
        },
        "<": {
            match: txt,
            next: {
                ">": {
                    match: open_tag,
                    goto: () => root.pattern,
                }
            }
        },
    }
}
```

根据 next 和 goto，tokenizer 可以在一颗 pattern 树中切换 pattern 来应对不同的场景

+ next： 接下来会遇到的符号，和遇到该符号后应该切换的 pattern

+ goto： 指定切换的 pattern，如果 pattern 持有 goto 属性，那么它的 next 属性将不会生效

match 对应一个 typ，当 tokenizer 切换到该 pattern 时，使用该 typ 创建一个 sub-token

当 tokenizer 切换到该 pattern 时，分割现在持有的字符串为两部分，左部分将属于该 sub-token，右部分继续作为 tokenizer 持有的字符串
