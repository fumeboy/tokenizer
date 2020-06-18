import {typ} from "./index.ts";
import {parent_name} from "./root.open_tag.parent_name.ts";
import {tag_name} from "./root.open_tag.tag_name.ts";
import {aliases} from "./root.open_tag.aliases.ts";

let pattern_tag_name

export let open_tag = <typ>{
    name: "open_tag",
    pattern: {
        catch: tag_name,
        next: {
            ":": {
                match: parent_name,
                catch: tag_name,
                next: {
                    "(": pattern_tag_name = {
                        match: tag_name,
                        next: {
                            ")": {
                                match: aliases
                            }
                        }
                    }
                }
            },
            "(":pattern_tag_name
        }
    }
}