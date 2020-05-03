import React from 'react'
import Header from './Header'
import Footer from './Footer'
import './layout.css'
import 'unnamed'

export default ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
