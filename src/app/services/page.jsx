"use client"
import React from 'react';
import {BsArrowDownRight} from "react-icons/bs";
import {motion} from "framer-motion"
import Link from "next/link";

const services = [
    {
        num: '01',
        title: 'Web Developer',
        description: 'Creating responsive, high-speed websites tailored to your business needs, optimized for user experience, SEO, and cross-device compatibility.',
        href: ""
    },
    {
        num: '02',
        title: 'Project Manager',
        description: 'Leading projects from concept to completion, coordinating teams, managing timelines, and ensuring goals are met with quality and efficiency for optimal project success.',
        href: ""
    },
    {
        num: '03',
        title: 'Teacher',
        description: 'Delivering hands-on learning in frontend technologies, guiding students through HTML, CSS, JavaScript, Next.js, React.js  and modern frameworks to build responsive, interactive web applications.',
        href: "",
    },
    {
        num: '04',
        title: 'Freelancer',
        description: 'Providing custom, high-quality frontend solutions, from responsive design to interactive features, ensuring seamless user experiences and efficient project delivery.',
        href: ""
    },
]


const Services = () => {
    return (
        <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
            <div className="container mx-auto">
                <motion.div
                    initial={{opacity: 0}}
                    animate={{
                        opacity: 1,
                        transition: {delay: 2.4, duration: 0.4, ease: "easeIn"}
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
                >
                    {services.map((service, index) => {
                        return <div key={index} className="flex-1 flex flex-col justify-center gap-6  group">
                            <div className="w-full flex justify-between items-center">
                                <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">{service.num}</div>
                                <Link href={service.href} className="w-[50px] h-[50px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45">
                                    <BsArrowDownRight className="text-primary text-3xl"/>
                                </Link>
                            </div>
                            <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">{service.title}</h2>
                            <p className="text-white/60">{service.description}</p>
                            <div className="border-b border-white/20 w-full"></div>
                        </div>
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;