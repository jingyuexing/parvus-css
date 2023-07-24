export function template(text:string,values:{[key:string]:any}){
    let textBack = text
    Object.keys(values).forEach((key)=>{
        const regex = new RegExp(`{${key}}`, "g");
        textBack = textBack.replace(regex,values[key])
    })
    return textBack
}