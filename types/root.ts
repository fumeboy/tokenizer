import {typ} from "./index.ts";
import {txt} from "./root.txt.ts"
import {safe} from "./root.safe.ts"
import {open_tag} from "./root.open_tag.ts"
import {close_tag} from "./root.close_tag.ts"

export let root = <typ>{
    name: "root",
    pattern: {
        catch: txt,
        next: {
            "```": {
                match: txt,
                next: {
                    "```": {
                        match: safe,
                        goto: () => root.pattern,
                    },
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
}