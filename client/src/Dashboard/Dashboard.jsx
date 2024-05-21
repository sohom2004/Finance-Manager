import React from 'react'
import { useUser } from '@clerk/clerk-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import RecordForm from './RecordForm';
import RecordListList from './RecordListList';
import { useFinancialRecords } from '../Context/recordContext';
import Footer from '../Footer/Footer';
import { useState } from 'react';


const Dashboard = () => {
    const { user } = useUser();
    const { stateRecord } = useFinancialRecords();
    console.log("stateRecord:", stateRecord);

    const [isOpen, setIsOpen] = useState(false);

    const dropNavbar = () => {
        setIsOpen(!isOpen);
    }

    const removeNavbar = () => {
        setIsOpen(false);
    }

    if (isOpen === true) { setTimeout(() => { setIsOpen(!isOpen); }, 5000); }


    return (
        <div className='min-w-fit max-h-full h-screen relative'>
            <div className='grid grid-cols-3 bg-emerald-500 items-center h-28 w-full shadow-lg md:h-24'>
                <div className='md:hidden w-11 md:w-8 ml-8 flex flex-col'>
                    <img onClick={dropNavbar} src='icons8-menu-50.png' alt='ooga booga' />
                </div>
                <div className='hidden md:flex'>
                    <div className='flex items-center text-white mx-6'>
                        <a className='mx-4' href='/'>About</a>
                        <a className='mx-4' href='/'>Contacts</a>
                        <a className='mx-4' href='/'>More</a>
                    </div>
                </div>
                <div>
                    <h1 className='text-4xl md:text-4xl font-bold text-white text-center'>
                        Finance Manager
                    </h1>
                </div>
                <div className='mr-8 mt-2 items-center justify-self-end'>
                    {!user && (
                        <SignedOut>
                            <SignInButton mode='modal' className='text-white' />
                        </SignedOut>
                    )}
                    {user && (
                        <div>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    )}
                </div>
            </div>
            <div className='absolute left-0 w-1/4 shadow-lg'>
                {isOpen && (
                    <div className='flex items-center text-white flex-col bg-emerald-500 z-2 rounded-b-md'>
                        <a className='m-2 text-3xl' href='/'>About</a>
                        <hr className='w-5/6' />
                        <a className='m-2 text-3xl' href='/'>Contacts</a>
                        <hr className='w-5/6' />
                        <a className='m-2 text-3xl' href='/'>More</a>
                    </div>
                )}
            </div>
            <div onClick={removeNavbar} className='w-full h-full'>
                {user && user.firstName ? (
                    <h1 className="text-6xl md:text-4xl font-bold text-emerald-500 text-center mt-20 mb-20 w-full px-8">
                        Welcome {user.firstName}! Here are your finances.
                    </h1>
                ) : (
                    <h1 className="text-5xl md:text-4xl font-bold text-emerald-500 text-center mt-8 mb-24 w-full">
                        Sign-In to manage your expenses!
                    </h1>
                )}
                <div className='flex flex-col items-center pb-10 w-full'>
                    <div className='w-full'>
                        <RecordForm />
                    </div>
                    <div className='h-screen mt-11 md:mt-20'>
                        <div className='flex flex-col'>
                            <div className='flex items-center mx-20'>
                                <input value="Date" className='m-1 px-1' />
                                <input value="Description" className='m-1 px-1' />
                                <input value="Amount" className='m-1 px-1' />
                                <input value="Category" className='m-1 px-0' />
                                <input value="Payment Method" className='m-1 px-0' />
                            </div>
                            <div className='mx-20'>
                                {stateRecord.map((element, index) => (
                                    <RecordListList key={index} data={element} />
                                ))}
                                {!user && (
                                    <div className='mt-20'>
                                        <p className='text-center text-4xl bold'>*No records found!*</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <footer className='min-w-fit bottom-0 mt-10'>
                    <Footer />
                </footer>
            </div>
        </div>
    )
}

export default Dashboard
