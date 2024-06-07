"use client"
import { usePathname } from 'next/navigation'
import React from 'react'

export default function PoolPage() {
    const pathname = usePathname();
    const tokenStrings = pathname.split("/pool/")[1];

    const tokens: Array<string> = JSON.parse(Buffer.from(tokenStrings,'base64').toString("utf-8"));
  return (
    <div>
        {
            tokens.map((token,index) => {
                return <div key={index} className='flex flex-col'>
                    {token}        
                </div>
            })
        }
    </div>
  )
}
