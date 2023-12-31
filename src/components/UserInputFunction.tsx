import React from 'react'

interface UserInputProps{
  labelTitle: string,
  value: string,
  setValue: any
}

export default function UserInputFunction({labelTitle, value, setValue}:UserInputProps) {
  return (
	<div className='flex items-center flex-col sm:flex-row'>
		<label className='text-neutral-100 text-sm p-2 sm:text-lg'>{labelTitle}</label>
		<input type='text' value={value} onChange={(e)=>setValue(e.target.value)} className={`sm:w-64 w-32 text-center bg-neutral-950 text-neutral-100 text-sm sm:text-lg border border-neutral-100`}/>
	</div>
  )
}
