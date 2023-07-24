import { generatorClss, globalVariant } from "./variant"
let { append } = globalVariant;

append(/text-(\d+)/, (className, textSize) => {
    const size = parseFloat(textSize) * 0.25
    return `
${generatorClss(className)}{
    font-size:${size}rem;
}`
})
append(/text-\[(#[0-9a-fA-F]{3,6}|(rgb|rgba)\((\d+,){2,3}\d+\))\]/, (className, color) => {
    return `
${generatorClss(className)}{
    color:${color};
}`
})
append(/text-(ellipsis|clip)/,(className,rule)=>{
    return `
${generatorClss(className)}{
    text-overflow: ${rule};
}`
})
append(/indent-(\d+)/, (className, indentSize) => {
    let size = parseInt(indentSize)
    return `
${generatorClss(className)}{
text-indent: ${indentSize * 0.25}rem;
}`
})

append(/indent-\[(.+)\]/, (className, indent) => {
    return `
${generatorClss(className)}{
text-indent: ${indent};
}`  
})
append(/font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/, (className, fontSize) => {
    let fontWeightMap = {
        "thin": 100,
        "extralight": 200,
        "light": 300,
        "normal": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800,
        "black": 900,
    }
    return `
${generatorClss(className)}{
    font-weight: ${fontWeightMap[fontSize as "thin" | "extralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black"]};
}`
})
append(/font-(\d+)/, (className, fontSize) => {
    return `
${generatorClss(className)}{
    font-weight: ${fontSize};
}`
})

append(/(uppercase|lowercase|capitalize|normal\-case)/, (className, rule) => {
    if (rule === "normal-case") {
        return `
text-transform: none;
`
    } else {
        return `
text-transform:${rule};
`
    }
})