
import React from 'react'
import DashboardWrapper from '../DashboardWrapper/page'


const Layout = ({children}: {children: React.ReactNode}) => {
  return (
      <DashboardWrapper>
          {children}
      </DashboardWrapper>
  )
}

export default Layout