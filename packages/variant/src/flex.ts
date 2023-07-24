import { generatorClss, globalVariant } from "./variant"

const { append } = globalVariant;

append(/flex-\[(.+)\]/, (className, rule) => {
    return `
${generatorClss(className)}{
    flex:${rule};
}`
})

append(/grow-(\d+)/, (className, rule) => {
    return `
${generatorClss(className)}{
    flex-grow: ${rule};
}`
})
append(/flex-(wrap|nowrap|wrap\-reverse)/,(className,rule)=>{
    return `
${generatorClss(className)}{
    flex-wrap: ${rule};
}`
})

append(/justify-items-(start|end|center|stretch)/, (className, rule) => {
    return `
${generatorClss(className)}{
    justify-items: ${rule};
}`
})
append(/gap-(x|y)-(\d+)/, (className, postion, gap) => {
    let gap_ = parseFloat(gap)
    if (postion === "x") {
        return `
${generatorClss(className)}{
    column-gap:${gap_ * 0.25}rem;
}
`
    } else {
        return `
${generatorClss(className)}{
    row-gap:${gap * 0.25}rem;
}`
    }
})

append(/gap-(\d+)/, (className, gap) => {
    let gap_ = parseFloat(gap)
    return `
${generatorClss(className)}{
    gap: ${gap_ * 0.25}rem;
}`
})