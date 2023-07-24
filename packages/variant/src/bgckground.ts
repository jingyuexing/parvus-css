import { generatorClss, globalVariant } from "./variant"

const { append } = globalVariant;

append(/bg-clip-(border|padding|content|text)/, (className, rule) => {
  if (rule === "text") {
    return `
${generatorClss(className)}{
  background-clip: ${rule};
}`
  }
  return `
${generatorClss(className)}{
  background-clip: ${rule}-box;
}`
})

append(/bg-\[(.+)]/, (className, color) => {
  return `
${generatorClss(className)}{
  background-color:${color};
}`
})