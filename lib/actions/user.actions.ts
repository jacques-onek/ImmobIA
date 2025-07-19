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

export const SignUp = async (params:SignUpType ) => {
 
    const {FullName,email,password} = (await params)
    console.log(params)
    const validateData = SignupSchema.safeParse({FullName,email,password})
    if (!validateData) {
        return {succes:false,error:"Error, enter valid Data"}
    }
    const AlreadyExistUser = await db.select().from(users).where(eq(users.email,email)).limit(1)
    if (AlreadyExistUser.length > 0){
      return {succes:false,error:"user already exist !"}
    }
    const hashedPasword = await bcrypt.hash(password,10)
    try {
        await db.insert(users).values({FullName,email,password:hashedPasword})
    } catch (error) {
      console.log(error,"error while signup")
      return {succes:false,error:"SignUp failed "}
    }
}