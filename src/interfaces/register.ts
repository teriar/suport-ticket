export interface Register{
    
  estado: boolean,
  msg:string
  tokens:{
   userToken: string
   refreshToken:string
} | null
 
}