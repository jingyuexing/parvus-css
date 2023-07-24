import { template } from "./utils";
import { generatorClss, globalVariant } from "./variant"

const { append } = globalVariant;

append(/(m|margin)-(\d)/, (className, _, marginsize) => {
    const size = parseInt(marginsize)
    return `
${generatorClss(className)}{
    margin:${size * 0.25}rem;
}`
})
append(/(m|margin)-\[(.+)\]/, (className, _, rule) => {
    return `
${generatorClss(className)}{
    margin:${rule};
}`
})

append(/(m|margin)(x|y)-(\d+)/, (className, _, direction: "x" | "y", size: `${number}`) => {
    const directionMap = {
        "x": `
margin-left: {size};
margin-right: {size};
`,
        "y": `
margin-top: {size};
margin-bottom:{size};
`
    }
    const marginSize = parseInt(size)
    return `
${generatorClss(className)}{
${template(directionMap[direction], {
        size: `${marginSize * 0.25}rem`
    })}
}`
})