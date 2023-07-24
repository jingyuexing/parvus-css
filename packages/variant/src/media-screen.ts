import { template } from "./utils";
import { generatorClss, globalVariant } from "./variant"

const { append, generator } = globalVariant;

append(/@(\d+):(.+)/, (className, screen, rule) => {
    let result = generator(rule)
    const media = `
@media (min-width:${screen}px) {
    {template}
}`
    if (result && result != "") {
        let [_, styled, end] = result.split("\n").filter((val) => val !== "")
        let classSelector = [`${generatorClss(className)}{`, styled, end].join("\n")
        let result_ = template(media, {
            template: classSelector
        })
        return result_
    } else {
        console.warn("can't support rule :" + rule)
        return ""
    }
})

append(/-@(\d+):(.+)/, (className, screen, rule) => {
    let minScreen = parseInt(screen) - 1
    let result = generator(rule)
    const media = `
@media (max-width:${minScreen}px) {
    {template}
}`
    if (result && result != "") {
        let [_, styled, end] = result.split("\n").filter((val) => val !== "")
        let classSelector = [`${generatorClss(className)}{`, styled, end].join("\n")
        let result_ = template(media, {
            template: classSelector
        })
        return result_
    } else {
        console.warn("can't support rule :" + rule)
        return ""
    }
})