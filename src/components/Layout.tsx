import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
    return (
        <div>
            <Header />
            <div className=" mx-auto px-16 py-8">
                <Outlet/>
            </div>
        </div>
    )
}
export default Layout
