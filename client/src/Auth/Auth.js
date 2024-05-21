import React from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

const Auth = () => {
    return (
        <div className='flex place-content-center'>
            <div className='flex flex-col items-center m-20 w-1/2 rounded-md shadow shadow-black-500/50 shadow-lg relative top-40'>
                <h1 className='text-5xl font-bold text-emerald-500 my-10'>
                    Finance Manager
                </h1>
                <p>Please sign-in or sign-up to access your finances.</p>
                <div className='mb-9 mt-5'>
                    <SignedOut>
                        <SignUpButton mode='modal' className='bg-emerald-300 mx-11 p-2 rounded-md hover:bg-emerald-500 shadow shadow-black-500/50'/>
                        <SignInButton mode='modal' className='bg-emerald-300 mx-11 p-2 rounded-md hover:bg-emerald-500 shadow shadow-black-500/50'/>
                    </SignedOut>

                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </div>
    )
}

export default Auth
