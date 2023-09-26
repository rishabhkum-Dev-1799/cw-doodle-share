import React from 'react'

interface ContainerProps{
  children:React.ReactNode
}
const Container = ({children}:ContainerProps) => {
  return (
    <section className='w-full h-screen  flex flex-col gap-8 items-center justify-center'>
      {children}
    </section>
  )
}

export default Container