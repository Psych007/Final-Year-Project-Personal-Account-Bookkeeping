"use client"
import { Button } from "C:/Users/PMLS/OneDrive/Desktop/Inshallah/expense-tracker/components/ui/button.jsx"
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() { 
    const { user, isSignedIn } = useUser();
    return (
        <div>
            <div className='p-5 flex justify-between items-center border shadow-sm'>
                <Image 
                    src={'/./PAB_transparent.png'} 
                    alt='logo'
                    width={70}
                    height={70}
                />
                <div className='flex items-center'>
                    {isSignedIn ? (
                        <>
                            <Link href='/dashboard'>
                                <Button className='mr-4'>Dashboard</Button>
                            </Link>
                            <UserButton/>
                        </>
                    ) : (
                        <Link href='/sign-in'>
                            <Button>Get Started</Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header
