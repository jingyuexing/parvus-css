import { generatorClss, globalVariant } from "./variant"

const { append } = globalVariant;

append(/(h|height)-(\d+\w+|full)/, (className: string,_ ,width) => {
  if (className.includes("full")) {
    return `${generatorClss(className)}{
  height:100%;
}` }
  return `
${generatorClss(className)}{
  height:${width};
}`
})
append(/(h|height)-(\d+)/, (className, rule) => {
  let width = parseInt(rule) * 0.25
  return `
${generatorClss(className)}{
  height:${width}rem;
}`
})
append(/(h|height)-(min|max|fit)/,(className,_,rule)=>{
  return `
${generatorClss(className)}{
  height: ${rule}-content;
}`
})

append(/(h|height)-(\d+\/\d+)/,(className,_,rule)=>{
  let result = (rule.split("/").map(Number) as number[]).reduce((a:number, b:number) => a / b).toFixed(6);
  return `
${generatorClss(className)}{
  height:${parseFloat(result)*100}%;
}`
})

append(/-(h|height)-(\d+\/\d+)/,(className,_,height)=>{
let result = (height.split("/").map(Number) as number[]).reduce((a:number, b:number) => a / b).toFixed(6);
return `
${generatorClss(className)}{
  height:-${parseFloat(result)*100}%;
}`
})

append(/(h|height)--(\d+\/\d+)/,(className,_,height)=>{
let result = (height.split("/").map(Number) as number[]).reduce((a:number, b:number) => a / b).toFixed(6);
return `
${generatorClss(className)}{
  height:-${parseFloat(result)*100}%;
}`
})
append(/-(h|height)-(\d+)/, (className, rule) => {
  let width = parseInt(rule) * 0.25
  return `
${generatorClss(className)}{
  height:-${width}rem;
}`
})
append(/(h|height)--(\d+)/, (className, rule) => {
  let width = parseInt(rule) * 0.25
  return `
${generatorClss(className)}{
  height:-${width}rem;
}`
})
append(/(h|height)-\[(.+)\]/, (className,_, rule) => {
  return `
${generatorClss(className)}{
  height:${rule};
}`
})