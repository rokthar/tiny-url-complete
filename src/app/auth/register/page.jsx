'use client'
import { useForm } from 'react-hook-form'
import {useRouter} from 'next/navigation'

function RegisterPage() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const router = useRouter()

    const registerUser = handleSubmit(async (data) => {

        if (data.password !== data.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const resp = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password
            })
        });

        const user = await resp.json();
        if (resp.ok){
            router.push('/auth/login')
        }
    });

    return (
        <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
            <form action="" onSubmit={registerUser} className='w-1/4'>
                <h1 className='text-2xl font-bold mb-4 text-center'>Register</h1>

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

                <label htmlFor="email" className='block mb-2 text-slate-600 text-sm'>Email</label>
                <input type="email" placeholder="email" {
                    ...register('email', { 
                        required: {
                            value: true, 
                            message: 'Email is required'
                        } 
                    })}
                    className='p-3 rounded block mb-2 w-full bg-slate-200' />
                {
                    errors.email && (
                        <p className='text-red-500 text-xs'>{errors.email.message}</p>
                    )
                }

                <label htmlFor="password" className='block mb-2 text-slate-600 text-sm'>Password</label>
                <input type="password" placeholder="password" {
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

                <label htmlFor="confirmPassword" className='block mb-2 text-slate-600 text-sm'>Confirm Password</label>
                <input type="password" placeholder="confirm password" {
                    ...register('confirmPassword', { 
                        required: {
                            value: true, 
                            message: 'Confirm Password is required'
                        } 
                    })}
                    className='p-3 rounded block mb-2 w-full bg-slate-200' />
                {
                    errors.confirmPassword && (
                        <p className='text-red-500 text-xs'>{errors.confirmPassword.message}</p>
                    )
                }

                <button type="submit" className='p-3 rounded block mb-2 mt-8 bg-blue-700 text-white w-full'>Register</button>
            </form>
        </div>
    )
}

export default RegisterPage