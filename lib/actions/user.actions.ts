"use server"

import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { SignupSchema } from "../validations"
import { SignUpType } from "@/types"
import { signIn } from "@/auth"




export const signWithGoogle = async () => {
  await signIn("google")
}
export const SignInWithCredentials = async (data:{email:string,password:string}) => {
  const {email,password} = data
  try {
   const res =  await signIn("credentials",{
      email,
      password
    })
    if (!res) {

      return {success:false,error:"failed to SignIn"}
    }
    return{success:true}
  } catch (error) {
    console.log(error)
    return {success:false,error:"error while trying to signIn"}
  }
}
export const SignUp = async (params:SignUpType ) => {
 
    const {FullName,email,password} = (await params)
    const validateData = SignupSchema.safeParse({FullName,email,password})
    if (!validateData) {
        return {success:false,error:"Error, enter valid Data"}
    }
    const AlreadyExistUser = await db.select().from(users).where(eq(users.email,email)).limit(1)
    if(!AlreadyExistUser[0]){
      return {success:false,error:"Error due to network connection"}
    }
    if (AlreadyExistUser.length > 0){
      return {success:false,error:"user already exist !"}
    }
    const hashedPasword = await bcrypt.hash(password,10)
    try {
        await db.insert(users).values({FullName,email,password:hashedPasword})
        await SignInWithCredentials({email,password})
        return {success:true}
    } catch (error) {
      console.log(error,"error while signup")
      return {success:false,error:"SignUp failed "}
    }
}