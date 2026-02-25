"use client"
import {Navbar,Footer,Copyright} from "../components/index";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NextResponse } from "next/server";
export default function Admin() {
  const router = useRouter();
  const[buttonDisabled,setButtonDisabled]=React.useState(false);
  const [userName, setUserName] = useState("");
  const[passWord,setPassWord]=useState("");
  useEffect(()=>{
    if(userName.length>0 && passWord.length>0)
    {
      setButtonDisabled(false);
    }
    else
    {
       setButtonDisabled(true);
    }
  });

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      try 
      {
        //const reqBody = request.json()
        //const {username, password} = reqBody;

        //check username
        const user =true // await User.findOne({userName})
        if(!user)
        {
          return NextResponse.json({error: "user does not exist"},{status:400})

        }

        //check password
        const validPassword =true //await bcryptjs.compare(passWord,user.password)
        if(!validPassword)
        {
          return NextResponse.json({error:"Invalid password"},{status:400})
        }
  
        // Store token and user info
        //localStorage.setItem('token', reqBody.data.token);
        //localStorage.setItem('user', JSON.stringify(reqBody.data.user));
  
        // Redirect to dashboard
        console.log("Login success")
        router.push("/dashboard");

      } catch (error: any) {
        return NextResponse.json({error: error.message},{status:500})
      }
    };
    return (
        <> 
         
            <Navbar/>
              <main className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-white">
        <div className="w-[350px] bg-gray-200 shadow-lg p-8 text-center">

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center text-xl">
              <img rel="icon" src="favicon.ico" alt="Inspec Logo" className="w-8 h-8" />
            </div>
          </div>

          {/* Inputs */}
          <form onSubmit={handleSubmit} className="space-y-6">
          <input
            className="w-full p-2 mb-3 border border-gray-300"
            id="username"
            type="text"
            value={userName}
            placeholder="Username"
            onChange={(e)=> setUserName(e.target.value)}
          />

          <input
            className="w-full p-2 mb-4 border border-gray-300"
            id="password"
             type="password"
             value={passWord}
            placeholder="Password"
            onChange={(e)=> setPassWord(e.target.value)}

          />

          {/* Login Button */}
          <button className="w-full bg-black text-white py-2 hover:bg-gray-800"
          type="submit"
          disabled={buttonDisabled}
          >
            Login
          </button>
          </form>

          {/* Forgot Password */}
          <p className="text-sm mt-3 cursor-pointer hover:underline">
            Forget Password?
          </p>

          {/* Info */}
          <p className="text-xs mt-4 text-gray-700">
            If you don't have an existing account please contact the dev team
            with your credentials
          </p>

          {/* Sign In */}
          <button className="w-full bg-black text-white py-2 mt-4 hover:bg-gray-800"
          >
            Sign In
          </button>
        </div>
      </main>

            <Footer/>
            <Copyright/>
        </>
    );
}
