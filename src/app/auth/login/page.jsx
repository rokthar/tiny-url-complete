'use client'
import { useForm } from 'react-hook-form'
import {signIn} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import { useState } from 'react'

function LoginPage(){

    const { register, formState: { errors }, handleSubmit } = useForm()
    const router = useRouter()
    const [error, setError] = useState(null)

    const loginUser = handleSubmit(async (data) => {
        const resp = await signIn('credentials', {
            username: data.username,
            password: data.password,
            redirect: false
        })

        if (resp.error){
            setError(resp.error)
        }else{
            router.push('/dashboard')
            router.refresh()
        }
    })
    
    return (
      <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
        <form className='w-1/4' onSubmit={loginUser}>
            <h1 className='text-2xl font-bold mb-4 text-center'>Login</h1>
            {
                error && (
                    <p className='bg-red-500 text-white p-3 rounded-md mb-2 text-xs'>{error}</p>
                )
            }
            <label htmlFor="username" className='block mb-2 text-slate-600 text-sm'>Username</label>
            <input type="text" placeholder="username" {
                    ...register('username', { 
                        required: { 
                            value: true, 
                            message: 'Username is required' 
                        } 
                    })}
                    className='p-3 rounded block mb-2 bg-slate-200 w-full' />
                {
                    errors.username && (
                        <p className='text-red-500 text-xs'>{errors.username.message}</p>
                    )
                }
            
            <label htmlFor="password" className='block mb-2 text-slate-600 text-sm'>Password</label>
                <input type="password" placeholder="******" {
                    ...register('password', { 
                        required: {
                            value: true, 
                            message: 'Password is required'
                        }
                    })}
                    className='p-3 rounded block mb-2 w-full bg-slate-200' />
                {
                    errors.password && (
                        <p className='text-red-500 text-xs'>{errors.password.message}</p>
                    )
                }
            
            <button type="submit" className='p-3 rounded block mb-2 mt-8 bg-blue-700 text-white w-full'>Login</button>
            
        </form>
      </div>
    )
  }
  
  export default LoginPage