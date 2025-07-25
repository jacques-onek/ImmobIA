"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignInSchema} from "@/lib/validations"
import GoogleSign from "./GoogleSign"
import { SignInWithCredentials} from "@/lib/actions/user.actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"





const SignInForm = () => {
 
  const route = useRouter()
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email:"",
      password:""
    },
  })


  async function onSubmit(values: z.infer<typeof SignInSchema>) {

    try {    
      
    const signUpData = await SignInWithCredentials(values)
      if (signUpData?.success) {
         toast("SignUp successfully ",{
          description:"you have successfully login to your account",
  
        })
        route.push("/")
      }else{
         toast("SignUp failed",{
          description:signUpData.error,
        })
      } 
    } catch (error) {
      console.log(error)

    }

    

  }

  return (
  <div className="w-full flex justify-center ">
    <Form {...form}>
    <div className="flex flex-col w-full lg:w-4/6  items-center max-lg:h-fit h-full border rounded-md shadow px-10 py-10 shadow-gray-200 ">

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-5  ">
        <div className="flex flex-col w-full items-center                             .  ">
            <h1 className="form-head">Welcome to ImmobIA</h1>
            <p className="font-medium">Login to your account</p>
-        </div>

      <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} className="form-input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PassWord</FormLabel>
              <FormControl>
                <Input placeholder="Create password" {...field} className="form-input"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="form-btn">Submit</Button>
    <div className="flex flex-col gap-5">
       <div className="flex gap-2">
         <div className="w-2/5 bg-gray-400 h-[1px] translate-y-3"/>
           <p>or</p>
          <div className="w-2/5 bg-gray-400 h-[1px] translate-y-3"/>
       </div>
    </div>
      </form>
       <GoogleSign/>
       <div className="flex gap-3 font-medium text-xs mt-3">
         <p>Don t have an account ? </p>
         <Link href="/sign-up" className="text-blue-500 cursor-pointer">create</Link>
       </div>
      </div>
    </Form>
</div>
  )
}

export default SignInForm