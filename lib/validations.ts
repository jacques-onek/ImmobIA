import {  z } from "zod"






export const SignupSchema = z.object({
    FullName:z.string().
    min(2,"fullname must be at list 2 character").
    max(50,"name is too long").nonempty("Name must not be Empty"),
    email:z.string().email("Enter a valid Email Address").
    max(100,"Email length is too long").nonempty("Email can't be empty"),
    password:z.string().min(8,"Password must be atlist 8 characters").nonempty()
})