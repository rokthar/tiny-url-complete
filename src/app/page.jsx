'use client'
import { useRef, useState } from "react"

function HomePage(){

  const inputRef = useRef(null)
  const [shortedURL, setShortedURL] = useState(null)

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
    }
  }

  return (
    <section className="h-calc(100vh-7rem) flex justify-center items-center">
      <form className="w-1/4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4 text-center">Tiny URL</h1>
        <p className="mb-4 text-center text-sm text-slate-400">Simple URL shortener</p>
        <input 
          ref={inputRef} 
          className="w-full mb-4 p-3 rounded-md bg-slate-200" 
          type="text" 
          name="shortedURL" 
          id="shortedURL" 
        />
        <button className="bg-red-500 text-white p-3 rounded-md w-full">Shorten</button>
        <span className="block mt-4">{shortedURL}</span>
      </form>
    </section>
  )
}

export default HomePage