"use client"
import React from 'react';
import Link from "next/link";
import {FaGithub, FaLinkedinIn, FaYoutube, FaTwitter} from "react-icons/fa";

const socials=[
    {icon: <FaGithub/>, path:'https://github.com/Shahriddinov'},
    {icon: <FaLinkedinIn/>, path:'https://www.linkedin.com/in/murod-shahriddinov/'},
    {icon: <FaYoutube/>, path:'https://www.youtube.com/@murod_2909'},
    {icon: <FaTwitter/>, path:'https://x.com/m_shahriddinov'},
]
const Social = ({containerStyles, iconStyles}) => {
    return (
        <div className={containerStyles}>
            {socials.map((item, index)=>{
                return <Link href={item.path} key={index} className={iconStyles}>
                    {item.icon}
                </Link>
            })}
        </div>
    );
};

export default Social;