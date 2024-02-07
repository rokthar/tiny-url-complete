'use client'
import { FaCopy } from "react-icons/fa6";
import { signOut } from 'next-auth/react'
import { useEffect, useRef, useState } from "react"

function DashboardPage(){

    const inputRef = useRef(null)
    const [shortedURL, setShortedURL] = useState(null)
    const [lista_links, setLista_links] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const cargarData = async () => {

        const resp = await fetch('/api/dashboard/links',{
            method: 'GET',
        })
        const data = await resp.json()
        setLista_links(data)
    }

    useEffect(() => {
        cargarData()
        setIsLoading(false)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = inputRef.current.value;

        const resp = await fetch('/api/shorted', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url
            })
        })

        const data = await resp.json();
        if (data.shortUrl){
            setShortedURL(data.shortUrl)
            cargarData()
        }
    }

    const copiar = (link) => {
        navigator.clipboard.writeText(`http://localhost:3000/${link.short_url}`)
    }

    return (
        <section className="h-calc(100vh-7rem) flex justify-center items-center">
            <div>
                <h1 className="text-2xl font-bold mb-4 text-center">Dashboard Page</h1>
                <p className="mb-4 text-center text-sm text-slate-400">Simple URL shortener</p>
                <form onSubmit={handleSubmit}>
                    <input 
                        ref={inputRef} 
                        className="w-full mb-4 p-3 rounded-md bg-slate-200" 
                        type="text" 
                        name="shortedURL" 
                        id="shortedURL" 
                    />
                    <button className="bg-blue-600 text-white p-3 rounded-md w-full">Shorten</button>
                </form>
                {
                    isLoading ? 
                        (
                            <p>cargando...</p>
                        ) 
                        : 
                        (
                            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-5 mb-5">
                                {
                                    lista_links.map((link) => (
                                        <div key={link.id} className="bg-slate-200 p-2 rounded-md flex">
                                            <div className='text-sm font-bold'>
                                                http://localhost:3000/{link.short_url}
                                            </div>
                                            <div className='text-sm font-bold ml-2'>
                                                <button className='bg-slate-400 text-white p-1 rounded-md hover:bg-slate-500'
                                                onClick={() => copiar(link)}>
                                                    <FaCopy />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                }
                <button className="bg-red-500 text-white p-3 rounded-md w-full"
                 onClick={() => signOut()}>Logout</button>
            </div>
        </section>
    )
}

export default DashboardPage