export interface Login {
 
    estado:boolean,
    msg: string| null,
     tokens?:{
   userToken: string
   refreshToken:string
} | null
}