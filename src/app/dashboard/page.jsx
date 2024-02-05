'use client'
import { signOut } from 'next-auth/react'
function DashboardPage(){

    const cargarData = async () => {
        const resp = await fetch('/api/dashboard/links',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(resp);
    }

    cargarData()

    return (
        <section className="h-calc(100vh-7rem) flex justify-center items-center">
            <div>
                <h1 className="text-2xl font-bold mb-4 text-center">Dashboard Page</h1>
                <button className="bg-red-500 text-white p-3 rounded-md w-full"
                 onClick={() => signOut()}>Logout</button>
            </div>
        </section>
    )
}

export default DashboardPage