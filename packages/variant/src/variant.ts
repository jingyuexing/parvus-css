function variantMatch(text: string, regexp: RegExp, cb: (...args: any[]) => string) {
  let regexp_ = new RegExp(regexp)
  let match = regexp_.exec(text)
  if (match !== null) {
    let result = [...match]
    result.shift()
    return cb(match[0], ...result)
  }
}
export const generatorClss = (className: string) => {
  for (let char of className) {
    if (['[', ']', "#", ":", "(", ")", ",", "/","!","%","@"].includes(char)) {
      className = className.replace(char, `\\${char}`)
    }
  }
  return `.${className}`
}

export function variant() {
  let rules = new Map<RegExp, (...args: any[]) => string>()
  let appendRule = (rule: RegExp, cb: (...args: any[]) => string) => {
    rules.set(rule, cb)
  }
  let generator = (text: string) => {
    for (const [rule, gen] of rules) {
      let match = rule.exec(text)
      if (rule.test(text) && match && match[0] === text) {
        return variantMatch(text, rule, gen)
      }
    }
  }
  return {
    append: appendRule,
    generator,
    rules
  }
}
const globalVariant = variant()

export { globalVariant };
export let /* @__PURE__ */ variantGenerator = (text: string) => {
  let cssRule: string[] = []
  for (let instruction of text.split(" ")) {
    let cssText = globalVariant.generator(instruction)
    if (cssText != undefined) {
      cssRule.push(cssText)
    }
  }
  return cssRule.join("\n")
}
