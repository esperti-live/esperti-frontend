import React from 'react'
import Navigation from './Navigation';
import Footer from './Footer';

export default function Layout({children}) {
  return (
    <>
    <Navigation />
    <main className="layout">
      {children}
    </main>
    <Footer />
    </>
  )
}
