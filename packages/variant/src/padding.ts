import { generatorClss, globalVariant } from "./variant"

const { append } = globalVariant;


append(/px-\[(.+)\]/, (className, rule) => {
  return `
${generatorClss(className)}{
  padding-left: ${rule};
  padding-right: ${rule};
}`
})
append(/p-(\d+)/, (className, rule) => {
  let padding = parseInt(rule) * 0.25
  return `
${generatorClss(className)}{
  padding:${padding}rem;
}`
})

append(/p-\[(.+)\]/, (className, rule) => {
  return `
${generatorClss(className)}{
  padding:${rule};  
}`
})

append(/py-\[(.+)\]/, (className, rule) => {
  return `
${generatorClss(className)}{
  padding-top: ${rule};
  padding-bottom: ${rule};
}`
})