import { Types } from "mongoose"
export const convertIdtoString =(id)=>{
    return id.toString().slice(2, -2)
}

export const convertStringtoId =(string)=>{
    return new Types.ObjectId(string)
}