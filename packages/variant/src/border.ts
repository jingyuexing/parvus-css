import { generatorClss, globalVariant } from "./variant"

const { append } = globalVariant;

append(/(rounded|r)-(t|b|l|r)-(\d+)/, (className, _, postion, rule) => {
    const radius = parseFloat(rule)
    switch (postion) {
        case "t":
            return `
${generatorClss(className)}{
    border-top-left-radius: ${radius * 0.25}rem; 
    border-top-right-radius: ${radius * 0.25}rem;
}`
        case 'b':
            return `
${generatorClss(className)}{
    border-bottom-left-radius: ${radius * 0.25}rem; 
    border-bottom-right-radius: ${radius * 0.25}rem;
}` 
        case 'l':
            return `
${generatorClss(className)}{
    border-top-left-radius: ${radius * 0.25}rem; 
    border-bottom-left-radius: ${radius * 0.25}rem;
}`
        case 'r':
            return `
${generatorClss(className)}{
    border-top-right-radius: ${radius * 0.25}rem; 
    border-bottom-right-radius: ${radius * 0.25}rem;
}`
        default:
            return ""
    }
})
append(/(rounded|r)-(\d+)/, (className, _, rule) => {
    const border = parseInt(rule)
    return `
${generatorClss(className)}{
    border-radius: ${border * 0.25}rem;
}`
})

append(/outline-(\d+)/,(className,outline)=>{
return `
${generatorClss(className)}{
    outline-width: ${outline}px;
}`
})
append(/outline-\[(.+)\]/,(className,outline)=>{
return `
${generatorClss(className)}{
    outline-width: ${outline};
}`
})