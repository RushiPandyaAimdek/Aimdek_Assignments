import React from 'react'
import Header from '../Header/header'
import Footer from '../Footer/footer'
const Layout = (props) => {
    return (
        <>
            <Header />
            <div className='content' style={{minHeight:"84vh"}}>
                {props.children}
            </div>
            <Footer />
        </>
    )
}

export default Layout