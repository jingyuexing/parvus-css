import { globalVariant, generatorClss } from "./variant"

const { append } = globalVariant;

append(/z-(\d+)/, (className, zIndex) => {
  return `
${generatorClss(className)}{
  z-index:${zIndex};
}`
})