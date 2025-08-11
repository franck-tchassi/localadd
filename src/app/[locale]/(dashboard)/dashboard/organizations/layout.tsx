import React from 'react'

interface layoutPageProps{
    children : React.ReactNode
}

const LayoutPage = ({children}: layoutPageProps) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default LayoutPage