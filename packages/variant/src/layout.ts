import { template } from "./utils";
import { generatorClss, globalVariant } from "./variant"

const { append } = globalVariant;

append(/justify-(normal|start|end|center|between|around|evenly|stretch)/, (className, rule) => {
  if (["between", "around", "evenly"].includes(rule)) {
    return `
${generatorClss(className)}{
  justify-content: space-${rule};
}`
  }
  if (["start", "end"].includes(rule)) {
    return `
${generatorClss(className)}{
  justify-content: flex-${rule};
}`
  }
  return `
${generatorClss(className)}{
  justify-content:${rule};
}`
})
append(/justify-items-(start|end|center|stretch)/, (className, rule) => {
  return `
${generatorClss(className)}{
  justify-items: ${rule};
}`
})
append(/items-(start|end|center|baseline|stretch)/, (className, rule) => {
  if (["start", "end"].includes(rule)) {
    return `
${generatorClss(className)}{
    align-items: flex-${rule};
}`
  }
  return `
${generatorClss(className)}{
  align-items: flex-start;
}`
})

append(/self-(auto|start|end|center|stretch|baseline)/, (className, rule) => {
  if (["start", "end"].includes(rule)) {
    return `
${generatorClss(className)}{
  align-self: flex-${rule};
}`
  }
  return `
${generatorClss(className)}{
  align-self: ${rule};
}`
})

append(/place-content-(center|start|end|between|around|evenly|baseline|stretch)/, (className, rule) => {
  if (["between", "around", "evenly"].includes(rule)) {
    return `
${generatorClss(className)}{
  place-content: space-${rule};
}`
  }
  return `
${generatorClss(className)}{
    place-content: ${rule};
}`
})

append(/place-items-(start|end|center|baseline|stretch)/, (className, rule) => {
  return `
${generatorClss(className)}{
  place-items: ${rule};
}`
})
append(/display-(block|inline-block|inline|grid|flex|inline-flex|table|inline-table|table-caption)/, (className, display) => {
  return `
${generatorClss(className)}{
  display:${display};
}`
})
append(/(block|inline-block|inline|grid|flex|inline-flex|table|inline-table|table-caption)/, (className, rule) => {
  return `
${generatorClss(className)}{
  display:${rule}
}`
})
append(/(static|fixed|absolute|relative|sticky)/, (className, rule) => {
  return `
${generatorClss(className)}{
  position: ${rule};
}`
})

append(/place-items-(start|end|center|baseline|stretch)/, (className, rule) => {
  return `
${generatorClss(className)}{
  place-items: ${rule};
}`
})
append(/object-(contain|cover|fill|none|scale-down)/, (className, rule) => {
  return `
${generatorClss(className)}{
  object-fit: ${rule};
}`
})

append(/overflow-(auto|hidden|clip|visible|scroll)/, (className, rule) => {
  return `
${generatorClss(className)}{
overflow: ${rule};
}`
})
append(/overflow-(x|y)-(auto|hidden|clip|visible|scroll)/, (className, direction, rule) => {
  return `
${generatorClss(className)}{
  overflow-${direction}: ${rule};
}`
})

append(/float-(right|left|none)/, (className, rule) => {
  return `
${generatorClss(className)}{
  float:${rule};
}`
})

append(/f(r|l|n)/, (className, rule) => {
  let cssMap = {
    "r": "right",
    "l": "left",
    "n": "none",
  }
  return `
${generatorClss(className)}{
  float:${cssMap[rule as 'r' | 'l' | 'n']}
}`
})

append(/grid-(rows|cols)-(\d+)/, (className, direction, size) => {
  const gridMap = {
    "rows": `grid-template-rows: repeat({size}, minmax(0, 1fr));`,
    "cols": `grid-template-columns: repeat({size}, minmax(0, 1fr));`
  }
  return `
${generatorClss(className)}{
  ${template(gridMap[(direction as "rows" | "cols")], {
    size
  })}
}`
})
append(/grid-(rows|cols)-none/, (className, direction) => {
  const gridMap = {
    "rows": `grid-template-rows: none;`,
    "cols": `grid-template-columns: none;`
  }
  return `
${generatorClss(className)}{
  ${gridMap[(direction as "rows" | "cols")]}
}`
})
append(/grid-(rows|cols)-[(.+)]/, (className, direction, inline) => {
  const gridMap = {
    "rows": `grid-template-rows: {inline};`,
    "cols": `grid-template-columns: {inline};`
  }
  return `
  ${generatorClss(className)}{
  ${template(gridMap[direction as "rows" | "cols"], { inline })}
}`
})

append(/(left|right|top|bottom)-(auto|inherit|initial|revert|unset)/,(className,postion,rule)=>{
  return `
${generatorClss(className)}{
  ${postion}:${rule};
}`
})

append(/(left|right|top|bottom)-\[.+\]/,(className,postion,inline)=>{
  return `
  ${generatorClss(className)}{
    ${postion}:${inline};
}`
})

append(/(left|right|top|bottom)-(\d+)/,(className,postion,rule)=>{
  let size = parseInt(rule)
  return `
${generatorClss(className)}{
  ${postion}:${size * 0.25}rem;
}`
})