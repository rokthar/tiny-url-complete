'use client'
import { usePathname, useRouter } from 'next/navigation'

export default function Page(){
    const pathname = usePathname()
    const router = useRouter()

    const path = pathname.split('/')[1]
    
    const redirect = async () => {
        
        const resp = await fetch('/api/redirect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                path: path
            })
        });
        
        const data = await resp.json();

        window.location.replace(data.url.url)
    }
    // router.push('')
    redirect()
    return <h1>Page</h1>
}