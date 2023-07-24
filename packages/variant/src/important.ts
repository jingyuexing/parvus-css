import { generatorClss, globalVariant } from "./variant"

const { append, generator } = globalVariant;

append(/[!](.+)/, (className, instruction) => {
    console.warn(className, instruction)
    let resultCSS = generator(instruction)
    if (resultCSS && resultCSS != "") {
        console.log()
        let [_, styled, end] = resultCSS.replace(";", " !important;").split("\n").filter((val)=>val!== "")
        return [`${generatorClss(className)}{`, styled, end].join("\n")
    } else {
        console.warn("没有这个规则" + instruction)
        return ""
    }
})