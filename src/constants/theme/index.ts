export const colors ={
  background:"#FFFFFF",
  lightGray:"#DFDFDF"
}

interface FontsObj{
  [name:string]:{
    fontSize:number,
    fontWeight:"300" | "normal" | "bold" | "100" | "200" | "400" | "500" | "600" | "700" | "800" | "900"  
  }
}

export const fonts:FontsObj = {
  mainText:{
    fontSize:30,
    fontWeight:"normal"
  },
  input:{
    fontSize:20,
    fontWeight:'normal'
  }
}
