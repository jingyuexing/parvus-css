import { generatorClss, globalVariant } from "./variant"
const { append } = globalVariant
append(/(w|width)-(\d+\w+|full)/, (className: string,_ ,width) => {
  if (className.includes("full")) {
    return `${generatorClss(className)}{
  width:100%;
}` }
  return `
${generatorClss(className)}{
  width:${width};
}`
})
append(/(w|width)-(\d+)/, (className, _,rule) => {
  let width = parseInt(rule) * 0.25
  return `
${generatorClss(className)}{
  width:${width}rem;
}`
})
append(/(w|width)-(min|max|fit)/,(className,_,rule)=>{
  return `
${generatorClss(className)}{
  width: ${rule}-content;
}`
})

append(/(w|width)-(\d+\/\d+)/,(className,_,rule)=>{
  let result = (rule.split("/").map(Number) as number[]).reduce((a:number, b:number) => a / b).toFixed(6);
  return `
${generatorClss(className)}{
  width:${parseFloat(result)*100}%;
}`
})
append(/-(w|width)-(\d+\/\d+)/,(className,_,width)=>{
  let result = (width.split("/").map(Number) as number[]).reduce((a:number, b:number) => a / b).toFixed(6);
  return `
${generatorClss(className)}{
  width:-${parseFloat(result)*100}%;
}`
})
append(/-(w|width)-(\d+)/, (className,_, rule) => {
  let width = parseInt(rule) * 0.25
  return `
${generatorClss(className)}{
  width:-${width}rem;
}`
})
append(/(w|width)--(\d+)/, (className,_, rule) => {
  let width = parseInt(rule) * 0.25
  return `
${generatorClss(className)}{
  width:-${width}rem;
}`
})
append(/(w|width)-\[(.+)\]/,(className,_,width)=>{
  return `
${generatorClss(className)}{
  width:${width};
}`
})