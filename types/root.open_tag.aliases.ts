import {pattern, typ} from "./index.ts";
import {alias} from "./root.open_tag.aliases.alias.ts";

let root_pattern: pattern
export let aliases = <typ>{
    name: "aliases",
    pattern: root_pattern = {
        catch: alias,
        next: {
            ",": {
                match: alias,
                goto: () => root_pattern
            }
        }
    }
}