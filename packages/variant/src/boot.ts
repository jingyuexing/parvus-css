import { globalVariant, variantGenerator } from "./variant"
export const scanPage /* @__PURE__ */=()=>{
  const classes = new Set<string>();
  document.querySelectorAll("*[class]").forEach((ele)=>{
    ele.classList.forEach((cls)=>{
      classes.add(cls)
    })
  })
  return [...classes]
}

document.onreadystatechange = function(){
  if(document.readyState === "complete"){
    let styled = document.createElement("style")
     let atomClass = scanPage()
     console.debug(`当前使用了${atomClass.length}条规则`)
     styled.setAttribute("type","text/css")
     styled.textContent = variantGenerator(atomClass.join(" ")).replace(/\s/g,"")
     document.head.appendChild(styled)
     console.debug(`当前总计规则数为: ${globalVariant.rules.size}条规则`)
  }
}
