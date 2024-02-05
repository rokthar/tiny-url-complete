import { NextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import {getServerSession} from 'next-auth/next'
async function Navbar (){

    const session = await getServerSession(NextAuthOptions)
    return(
       <div>
         {
            !session?.user ? (
                <p>no estas logeado</p>
            ):(
                <p>estas logeado</p>
            )
        }
       </div>
    )
}

export default Navbar