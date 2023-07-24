'use strict';

function variantMatch(text, regexp, cb) {
  let regexp_ = new RegExp(regexp);
  let match = regexp_.exec(text);
  if (match !== null) {
    let result = [...match];
    result.shift();
    return cb(match[0], ...result);
  }
}
const generatorClss = (className) => {
  for (let char of className) {
    if (["[", "]", "#", ":", "(", ")", ",", "/", "!", "%", "@"].includes(char)) {
      className = className.replace(char, "\\".concat(char));
    }
  }
  return ".".concat(className);
};
function variant() {
  let rules = /* @__PURE__ */ new Map();
  let appendRule = (rule, cb) => {
    rules.set(rule, cb);
  };
  let generator = (text) => {
    for (const [rule, gen] of rules) {
      let match = rule.exec(text);
      if (rule.test(text) && match && match[0] === text) {
        return variantMatch(text, rule, gen);
      }
    }
  };
  return {
    append: appendRule,
    generator,
    rules
  };
}
const globalVariant = variant();
let variantGenerator = (text) => {
  let cssRule = [];
  for (let instruction of text.split(" ")) {
    let cssText = globalVariant.generator(instruction);
    if (cssText != void 0) {
      cssRule.push(cssText);
    }
  }
  return cssRule.join("\n");
};

const { append: append$b } = globalVariant;
append$b(/bg-clip-(border|padding|content|text)/, (className, rule) => {
  if (rule === "text") {
    return "\n".concat(generatorClss(className), "{\n  background-clip: ").concat(rule, ";\n}");
  }
  return "\n".concat(generatorClss(className), "{\n  background-clip: ").concat(rule, "-box;\n}");
});
append$b(/bg-\[(.+)]/, (className, color) => {
  return "\n".concat(generatorClss(className), "{\n  background-color:").concat(color, ";\n}");
});

function template(text, values) {
  let textBack = text;
  Object.keys(values).forEach((key) => {
    const regex = new RegExp("{".concat(key, "}"), "g");
    textBack = textBack.replace(regex, values[key]);
  });
  return textBack;
}

const { append: append$a } = globalVariant;
append$a(/justify-(normal|start|end|center|between|around|evenly|stretch)/, (className, rule) => {
  if (["between", "around", "evenly"].includes(rule)) {
    return "\n".concat(generatorClss(className), "{\n  justify-content: space-").concat(rule, ";\n}");
  }
  if (["start", "end"].includes(rule)) {
    return "\n".concat(generatorClss(className), "{\n  justify-content: flex-").concat(rule, ";\n}");
  }
  return "\n".concat(generatorClss(className), "{\n  justify-content:").concat(rule, ";\n}");
});
append$a(/justify-items-(start|end|center|stretch)/, (className, rule) => {
  return "\n".concat(generatorClss(className), "{\n  justify-items: ").concat(rule, ";\n}");
});
append$a(/items-(start|end|center|baseline|stretch)/, (className, rule) => {
  if (["start", "end"].includes(rule)) {
    return "\n".concat(generatorClss(className), "{\n    align-items: flex-").concat(rule, ";\n}");
  }
  return "\n".concat(generatorClss(className), "{\n  align-items: flex-start;\n}");
});
append$a(/self-(auto|start|end|center|stretch|baseline)/, (className, rule) => {
  if (["start", "end"].includes(rule)) {
    return "\n".concat(generatorClss(className), "{\n  align-self: flex-").concat(rule, ";\n}");
  }
  return "\n".concat(generatorClss(className), "{\n  align-self: ").concat(rule, ";\n}");
});
append$a(/place-content-(center|start|end|between|around|evenly|baseline|stretch)/, (className, rule) => {
  if (["between", "around", "evenly"].includes(rule)) {
    return "\n".concat(generatorClss(className), "{\n  place-content: space-").concat(rule, ";\n}");
  }
  return "\n".concat(generatorClss(className), "{\n    place-content: ").concat(rule, ";\n}");
});
append$a(/place-items-(start|end|center|baseline|stretch)/, (className, rule) => {
  return "\n".concat(generatorClss(className), "{\n  place-items: ").concat(rule, ";\n}");
});
append$a(/display-(block|inline-block|inline|grid|flex|inline-flex|table|inline-table|table-caption)/, (className, display) => {
  return "\n".concat(generatorClss(className), "{\n  display:").concat(display, ";\n}");
});
append$a(/(block|inline-block|inline|grid|flex|inline-flex|table|inline-table|table-caption)/, (className, rule) => {
  return "\n".concat(generatorClss(className), "{\n  display:").concat(rule, "\n}");
});
append$a(/(static|fixed|absolute|relative|sticky)/, (className, rule) => {
  return "\n".concat(generatorClss(className), "{\n  position: ").concat(rule, ";\n}");
});
append$a(/place-items-(start|end|center|baseline|stretch)/, (className, rule) => {
  return "\n".concat(generatorClss(className), "{\n  place-items: ").concat(rule, ";\n}");
});
append$a(/object-(contain|cover|fill|none|scale-down)/, (className, rule) => {
  return "\n".concat(generatorClss(className), "{\n  object-fit: ").concat(rule, ";\n}");
});
append$a(/overflow-(auto|hidden|clip|visible|scroll)/, (className, rule) => {
  return "\n".concat(generatorClss(className), "{\noverflow: ").concat(rule, ";\n}");
});
append$a(/overflow-(x|y)-(auto|hidden|clip|visible|scroll)/, (className, direction, rule) => {
  return "\n".concat(generatorClss(className), "{\n  overflow-").concat(direction, ": ").concat(rule, ";\n}");
});
append$a(/float-(right|left|none)/, (className, rule) => {
  return "\n".concat(generatorClss(className), "{\n  float:").concat(rule, ";\n}");
});
append$a(/f(r|l|n)/, (className, rule) => {
  let cssMap = {
    "r": "right",
    "l": "left",
    "n": "none"
  };
  return "\n".concat(generatorClss(className), "{\n  float:").concat(cssMap[rule], "\n}");
});
append$a(/grid-(rows|cols)-(\d+)/, (className, direction, size) => {
  const gridMap = {
    "rows": "grid-template-rows: repeat({size}, minmax(0, 1fr));",
    "cols": "grid-template-columns: repeat({size}, minmax(0, 1fr));"
  };
  return "\n".concat(generatorClss(className), "{\n  ").concat(template(gridMap[direction], {
    size
  }), "\n}");
});
append$a(/grid-(rows|cols)-none/, (className, direction) => {
  const gridMap = {
    "rows": "grid-template-rows: none;",
    "cols": "grid-template-columns: none;"
  };
  return "\n".concat(generatorClss(className), "{\n  ").concat(gridMap[direction], "\n}");
});
append$a(/grid-(rows|cols)-[(.+)]/, (className, direction, inline) => {
  const gridMap = {
    "rows": "grid-template-rows: {inline};",
    "cols": "grid-template-columns: {inline};"
  };
  return "\n  ".concat(generatorClss(className), "{\n  ").concat(template(gridMap[direction], { inline }), "\n}");
});

const { append: append$9 } = globalVariant;
append$9(/(w|width)-(\d+\w+|full)/, (className, _, width) => {
  if (className.includes("full")) {
    return "".concat(generatorClss(className), "{\n  width:100%;\n}");
  }
  return "\n".concat(generatorClss(className), "{\n  width:").concat(width, ";\n}");
});
append$9(/(w|width)-(\d+)/, (className, _, rule) => {
  let width = parseInt(rule) * 0.25;
  return "\n".concat(generatorClss(className), "{\n  width:").concat(width, "rem;\n}");
});
append$9(/(w|width)-(min|max|fit)/, (className, _, rule) => {
  return "\n".concat(generatorClss(className), "{\n  width: ").concat(rule, "-content;\n}");
});
append$9(/(w|width)-(\d+\/\d+)/, (className, _, rule) => {
  let result = rule.split("/").map(Number).reduce((a, b) => a / b).toFixed(6);
  return "\n".concat(generatorClss(className), "{\n  width:").concat(parseFloat(result) * 100, "%;\n}");
});
append$9(/-(w|width)-(\d+\/\d+)/, (className, _, width) => {
  let result = width.split("/").map(Number).reduce((a, b) => a / b).toFixed(6);
  return "\n".concat(generatorClss(className), "{\n  width:-").concat(parseFloat(result) * 100, "%;\n}");
});
append$9(/-(w|width)-(\d+)/, (className, _, rule) => {
  let width = parseInt(rule) * 0.25;
  return "\n".concat(generatorClss(className), "{\n  width:-").concat(width, "rem;\n}");
});
append$9(/(w|width)--(\d+)/, (className, _, rule) => {
  let width = parseInt(rule) * 0.25;
  return "\n".concat(generatorClss(className), "{\n  width:-").concat(width, "rem;\n}");
});
append$9(/(w|width)-\[(.+)\]/, (className, _, width) => {
  return "\n".concat(generatorClss(className), "{\n  width:").concat(width, ";\n}");
});

const { append: append$8 } = globalVariant;
append$8(/(h|height)-(\d+\w+|full)/, (className, _, width) => {
  if (className.includes("full")) {
    return "".concat(generatorClss(className), "{\n  height:100%;\n}");
  }
  return "\n".concat(generatorClss(className), "{\n  height:").concat(width, ";\n}");
});
append$8(/(h|height)-(\d+)/, (className, rule) => {
  let width = parseInt(rule) * 0.25;
  return "\n".concat(generatorClss(className), "{\n  height:").concat(width, "rem;\n}");
});
append$8(/(h|height)-(min|max|fit)/, (className, _, rule) => {
  return "\n".concat(generatorClss(className), "{\n  height: ").concat(rule, "-content;\n}");
});
append$8(/(h|height)-(\d+\/\d+)/, (className, _, rule) => {
  let result = rule.split("/").map(Number).reduce((a, b) => a / b).toFixed(6);
  return "\n".concat(generatorClss(className), "{\n  height:").concat(parseFloat(result) * 100, "%;\n}");
});
append$8(/-(h|height)-(\d+\/\d+)/, (className, _, height) => {
  let result = height.split("/").map(Number).reduce((a, b) => a / b).toFixed(6);
  return "\n".concat(generatorClss(className), "{\n  height:-").concat(parseFloat(result) * 100, "%;\n}");
});
append$8(/(h|height)--(\d+\/\d+)/, (className, _, height) => {
  let result = height.split("/").map(Number).reduce((a, b) => a / b).toFixed(6);
  return "\n".concat(generatorClss(className), "{\n  height:-").concat(parseFloat(result) * 100, "%;\n}");
});
append$8(/-(h|height)-(\d+)/, (className, rule) => {
  let width = parseInt(rule) * 0.25;
  return "\n".concat(generatorClss(className), "{\n  height:-").concat(width, "rem;\n}");
});
append$8(/(h|height)--(\d+)/, (className, rule) => {
  let width = parseInt(rule) * 0.25;
  return "\n".concat(generatorClss(className), "{\n  height:-").concat(width, "rem;\n}");
});
append$8(/(h|height)-\[(.+)\]/, (className, _, rule) => {
  return "\n".concat(generatorClss(className), "{\n  height:").concat(rule, ";\n}");
});

const { append: append$7 } = globalVariant;
append$7(/z-(\d+)/, (className, zIndex) => {
  return "\n".concat(generatorClss(className), "{\n  z-index:").concat(zIndex, ";\n}");
});

const { append: append$6 } = globalVariant;
append$6(/px-\[(.+)\]/, (className, rule) => {
  return "\n".concat(generatorClss(className), "{\n  padding-left: ").concat(rule, ";\n  padding-right: ").concat(rule, ";\n}");
});
append$6(/p-(\d+)/, (className, rule) => {
  let padding = parseInt(rule) * 0.25;
  return "\n".concat(generatorClss(className), "{\n  padding:").concat(padding, "rem;\n}");
});
append$6(/p-\[(.+)\]/, (className, rule) => {
  return "\n".concat(generatorClss(className), "{\n  padding:").concat(rule, ";  \n}");
});
append$6(/py-\[(.+)\]/, (className, rule) => {
  return "\n".concat(generatorClss(className), "{\n  padding-top: ").concat(rule, ";\n  padding-bottom: ").concat(rule, ";\n}");
});

const { append: append$5 } = globalVariant;
append$5(/flex-\[(.+)\]/, (className, rule) => {
  return "\n".concat(generatorClss(className), "{\n    flex:").concat(rule, ";\n}");
});
append$5(/grow-(\d+)/, (className, rule) => {
  return "\n".concat(generatorClss(className), "{\n    flex-grow: ").concat(rule, ";\n}");
});
append$5(/flex-(wrap|nowrap|wrap\-reverse)/, (className, rule) => {
  return "\n".concat(generatorClss(className), "{\n    flex-wrap: ").concat(rule, ";\n}");
});
append$5(/justify-items-(start|end|center|stretch)/, (className, rule) => {
  return "\n".concat(generatorClss(className), "{\n    justify-items: ").concat(rule, ";\n}");
});
append$5(/gap-(x|y)-(\d+)/, (className, postion, gap) => {
  let gap_ = parseFloat(gap);
  if (postion === "x") {
    return "\n".concat(generatorClss(className), "{\n    column-gap:").concat(gap_ * 0.25, "rem;\n}\n");
  } else {
    return "\n".concat(generatorClss(className), "{\n    row-gap:").concat(gap * 0.25, "rem;\n}");
  }
});
append$5(/gap-(\d+)/, (className, gap) => {
  let gap_ = parseFloat(gap);
  return "\n".concat(generatorClss(className), "{\n    gap: ").concat(gap_ * 0.25, "rem;\n}");
});

const { append: append$4, generator: generator$1 } = globalVariant;
append$4(/@(\d+):(.+)/, (className, screen, rule) => {
  let result = generator$1(rule);
  const media = "\n@media (min-width:".concat(screen, "px) {\n    {template}\n}");
  if (result && result != "") {
    let [_, styled, end] = result.split("\n").filter((val) => val !== "");
    let classSelector = ["".concat(generatorClss(className), "{"), styled, end].join("\n");
    let result_ = template(media, {
      template: classSelector
    });
    return result_;
  } else {
    console.warn("can't support rule :" + rule);
    return "";
  }
});
append$4(/-@(\d+):(.+)/, (className, screen, rule) => {
  let minScreen = parseInt(screen) - 1;
  let result = generator$1(rule);
  const media = "\n@media (max-width:".concat(minScreen, "px) {\n    {template}\n}");
  if (result && result != "") {
    let [_, styled, end] = result.split("\n").filter((val) => val !== "");
    let classSelector = ["".concat(generatorClss(className), "{"), styled, end].join("\n");
    let result_ = template(media, {
      template: classSelector
    });
    return result_;
  } else {
    console.warn("can't support rule :" + rule);
    return "";
  }
});

const { append: append$3 } = globalVariant;
append$3(/(rounded|r)-(t|b|l|r)-(\d+)/, (className, _, postion, rule) => {
  const radius = parseFloat(rule);
  switch (postion) {
    case "t":
      return "\n".concat(generatorClss(className), "{\n    border-top-left-radius: ").concat(radius * 0.25, "rem; \n    border-top-right-radius: ").concat(radius * 0.25, "rem;\n}");
    case "b":
      return "\n".concat(generatorClss(className), "{\n    border-bottom-left-radius: ").concat(radius * 0.25, "rem; \n    border-bottom-right-radius: ").concat(radius * 0.25, "rem;\n}");
    case "l":
      return "\n".concat(generatorClss(className), "{\n    border-top-left-radius: ").concat(radius * 0.25, "rem; \n    border-bottom-left-radius: ").concat(radius * 0.25, "rem;\n}");
    case "r":
      return "\n".concat(generatorClss(className), "{\n    border-top-right-radius: ").concat(radius * 0.25, "rem; \n    border-bottom-right-radius: ").concat(radius * 0.25, "rem;\n}");
    default:
      return "";
  }
});
append$3(/(rounded|r)-(\d+)/, (className, _, rule) => {
  const border = parseInt(rule);
  return "\n".concat(generatorClss(className), "{\n    border-radius: ").concat(border * 0.25, "rem;\n}");
});
append$3(/outline-(\d+)/, (className, outline) => {
  return "\n".concat(generatorClss(className), "{\n    outline-width: ").concat(outline, "px;\n}");
});
append$3(/outline-\[(.+)\]/, (className, outline) => {
  return "\n".concat(generatorClss(className), "{\n    outline-width: ").concat(outline, ";\n}");
});

const { append: append$2, generator } = globalVariant;
append$2(/[!](.+)/, (className, instruction) => {
  console.warn(className, instruction);
  let resultCSS = generator(instruction);
  if (resultCSS && resultCSS != "") {
    console.log();
    let [_, styled, end] = resultCSS.replace(";", " !important;").split("\n").filter((val) => val !== "");
    return ["".concat(generatorClss(className), "{"), styled, end].join("\n");
  } else {
    console.warn("\u6CA1\u6709\u8FD9\u4E2A\u89C4\u5219" + instruction);
    return "";
  }
});

let { append: append$1 } = globalVariant;
append$1(/text-(\d+)/, (className, textSize) => {
  const size = parseFloat(textSize) * 0.25;
  return "\n".concat(generatorClss(className), "{\n    font-size:").concat(size, "rem;\n}");
});
append$1(/text-\[(#[0-9a-fA-F]{3,6}|(rgb|rgba)\((\d+,){2,3}\d+\))\]/, (className, color) => {
  return "\n".concat(generatorClss(className), "{\n    color:").concat(color, ";\n}");
});
append$1(/text-(ellipsis|clip)/, (className, rule) => {
  return "\n".concat(generatorClss(className), "{\n    text-overflow: ").concat(rule, ";\n}");
});
append$1(/indent-(\d+)/, (className, indentSize) => {
  return "\n".concat(generatorClss(className), "{\ntext-indent: ").concat(indentSize * 0.25, "rem;\n}");
});
append$1(/indent-\[(.+)\]/, (className, indent) => {
  return "\n".concat(generatorClss(className), "{\ntext-indent: ").concat(indent, ";\n}");
});
append$1(/font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/, (className, fontSize) => {
  let fontWeightMap = {
    "thin": 100,
    "extralight": 200,
    "light": 300,
    "normal": 400,
    "medium": 500,
    "semibold": 600,
    "bold": 700,
    "extrabold": 800,
    "black": 900
  };
  return "\n".concat(generatorClss(className), "{\n    font-weight: ").concat(fontWeightMap[fontSize], ";\n}");
});
append$1(/font-(\d+)/, (className, fontSize) => {
  return "\n".concat(generatorClss(className), "{\n    font-weight: ").concat(fontSize, ";\n}");
});
append$1(/(uppercase|lowercase|capitalize|normal\-case)/, (className, rule) => {
  if (rule === "normal-case") {
    return "\ntext-transform: none;\n";
  } else {
    return "\ntext-transform:".concat(rule, ";\n");
  }
});

const { append } = globalVariant;
append(/(m|margin)-(\d)/, (className, _, marginsize) => {
  const size = parseInt(marginsize);
  return "\n".concat(generatorClss(className), "{\n    margin:").concat(size * 0.25, "rem;\n}");
});
append(/(m|margin)-\[(.+)\]/, (className, _, rule) => {
  return "\n".concat(generatorClss(className), "{\n    margin:").concat(rule, ";\n}");
});
append(/(m|margin)(x|y)-(\d+)/, (className, _, direction, size) => {
  const directionMap = {
    "x": "\nmargin-left: {size};\nmargin-right: {size};\n",
    "y": "\nmargin-top: {size};\nmargin-bottom:{size};\n"
  };
  const marginSize = parseInt(size);
  return "\n".concat(generatorClss(className), "{\n").concat(template(directionMap[direction], {
    size: "".concat(marginSize * 0.25, "rem")
  }), "\n}");
});

const scanPage = () => {
  const classes = /* @__PURE__ */ new Set();
  document.querySelectorAll("*[class]").forEach((ele) => {
    ele.classList.forEach((cls) => {
      classes.add(cls);
    });
  });
  return [...classes];
};
document.onreadystatechange = function() {
  if (document.readyState === "complete") {
    let styled = document.createElement("style");
    let atomClass = scanPage();
    console.debug("\u5F53\u524D\u4F7F\u7528\u4E86".concat(atomClass.length, "\u6761\u89C4\u5219"));
    styled.setAttribute("type", "text/css");
    styled.textContent = variantGenerator(atomClass.join(" ")).replace(/\s/g, "");
    document.head.appendChild(styled);
    console.debug("\u5F53\u524D\u603B\u8BA1\u89C4\u5219\u6570\u4E3A: ".concat(globalVariant.rules.size, "\u6761\u89C4\u5219"));
  }
};
