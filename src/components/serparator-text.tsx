import React from 'react'
import { Separator } from './ui/separator'

const SerparatorText = ({ text }: { text: string }) => {
    return (
        <div className='flex items-center justify-center gap-2 overflow-clip'>
            <Separator />
            {text}
            <Separator />
        </div>
    )
}

export default SerparatorText
