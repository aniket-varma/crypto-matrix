import React,{useState,useEffect} from 'react';
import { Button, Menu, Typography, Avatar} from 'antd';
import {HomeOutlined, InteractionOutlined, BulbOutlined, FundOutlined, MenuOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom';
import icon from '../images/btc.jpg'
const Navbar = () => {
    const [activeMenu,setActiveMenu] = useState(true);
    const [screenSize,setScreenSize] = useState(null);
    useEffect(()=>{
        const handleResize = () =>  setScreenSize(window.innerWidth);
        window.addEventListener('resize',handleResize);
        handleResize();
        return () => window.removeEventListener('resize',handleResize);
    },[])
    useEffect(()=>{
        setActiveMenu((screenSize<768?false:true));
    },[screenSize])
    const items = [
        {
            key:"1",
            icon: <HomeOutlined/>,
            label: <Link to="/" className="link">Home</Link>
        },
        {
            key:"2",
            icon: <FundOutlined/>,
            label: <Link to="/cryptocurrencies" className="link">Cryptocurrencies</Link>
        },
        {
            key:"3",
            icon: <InteractionOutlined />,
            label: <Link to="/converter" className="link">Converter</Link>
        },
        {
            key:"4",
            icon: <BulbOutlined/>,
            label: <Link to="/news" className="link">News</Link>,
        }
    ]
    return(
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={icon} size="large"/>
                <Typography.Title level={3} className="logo">
                    <Link to="/">Crypto Matrix</Link>
                </Typography.Title>
                { screenSize<768 && (<Button className="menu-control-container" onClick={()=>setActiveMenu(!activeMenu)}><MenuOutlined/></Button>)}
            </div>
            {activeMenu && (
                <Menu theme="dark" items={items}/>
            )}
        </div>
    )
}
export default Navbar;