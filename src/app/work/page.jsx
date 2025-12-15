"use client"
import React, {useState} from 'react';
import {motion} from "framer-motion";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {BsArrowUpRight, BsGithub} from "react-icons/bs";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";

const projects = [
    {
        num: '01',
        category: 'Frontend',
        title: 'MGA Reklama – Corporate Website',
        description: 'Developed a responsive corporate website for a Turkish advertising and banner manufacturing company. Built reusable React components, implemented Redux for state management, and optimized page performance for fast loading and SEO visibility.',
        stack: [
            { name: 'HTML5' },
            { name: 'SCSS' },
            { name: 'JavaScript' },
            { name: 'React.js' },
            { name: 'Redux Toolkit' }
        ],
        image: '/assets/work/mgareklama.png',
        live: 'http://www.mgareklama.com/',
        github: 'https://github.com/Shahriddinov/New-version-MGA'
    },

    {
        num: '02',
        category: 'frontend',
        title: 'project 2',
        description: 'Vatandoshlar fondi. This project is a site created for our compatriots abroad, and on this site you can see the events of our country through videos, stay informed about the news, participate in webinars, learn the Uzbek language, and communicate via chat. is available and easy to use.',
        stack: [

            {name: 'Javascript'},
            {name: 'React.js'},
            {name: 'Redux'},
            {name: 'Toolkit'},
            {name: 'Websocket'},
        ],
        image: '/assets/work/vatandosh.jpg',
        live: 'https://vatandoshlarfondi.uz/',
        github: 'https://github.com/Shahriddinov/Vatandosh'
    },
    {
        num: '03',
        category: 'frontend',
        title: 'project 3',
        description: 'Clear path. This project provides information about the state of the country\'s motor vehicle roads, i.e., roads that are damaged or closed for a specific reason and are undergoing repair work.',
        stack: [
            {name: 'Javascript'},
            {name: 'React.js'},
            {name: 'Redux'},
            {name: 'Toolkit'},
            {name: 'Next.js'},
        ],
        image: '/assets/work/shaffof.jpg',
        live: 'https://shaffofyul.uz/uz',
        github: ''
    },
    {
        num: '04',
        category: 'frontend',
        title: 'project 4',
        description: 'This platform is about physical education and sports in the country. It is designed for teachers to register and take tests in order to receive a certificate for teaching.',
        stack: [
            {name: 'Javascript'},
            {name: 'React.js'},
            {name: 'Redux'},
            {name: 'Toolkit'},
            {name: 'Next.js'},
        ],
        image: '/assets/work/sport.jpg',
        live: 'https://sportedu.uz/',
        github: ''
    },
    {
        num: '05',
        category: 'frontend (Next.js)',
        title: 'project 5',
        description: 'Mirabad District - this project is a website that reflects news related to the district and current events in the republic.',
        stack: [
            {name: 'Javascript'},
            {name: 'React.js'},
            {name: 'Redux'},
            {name: 'Toolkit'},
            {name: 'Next.js'},
        ],
        image: '/assets/work/mirobod.png',
        live: 'https://mirobodtumani.uz/',
        github: ''
    },
    {
        num: '06',
        category: 'frontend',
        title: 'project 6',
        description: 'Islam Karimov Technical Institute - contains general information about the institute, news about the administration, and online classes.',
        stack: [
            {name: 'Javascript'},
            {name: 'React.js'},
            {name: 'Redux'},
            {name: 'Toolkit'},
            {name: 'Next.js'},
        ],
        image: '/assets/work/texnika.png',
        live: 'https://tdtu.uz/',
        github: ''
    },
    {
        num: '07',
        category: 'Frontend',
        title: 'EasyPrzeprowadzki – Moving Company Platform',
        description: 'Built a modern, SEO-optimized website for a Poland-based moving company. Implemented responsive UI components, multilingual support with i18next, and performance optimizations to improve load time and user engagement across devices.',
        stack: [
            { name: 'JavaScript' },
            { name: 'React.js' },
            { name: 'Redux Toolkit' },
            { name: 'SCSS' },
            { name: 'i18next' }
        ],
        image: '/assets/work/easy.png',
        live: 'https://easyprzeprowadzki.pl/',
        github: 'https://github.com/Shahriddinov/Easy-przeprowadzki'
    },

    {
        num: '08',
        category: 'Frontend',
        title: 'Carplus – Car Finance Platform (UK)',
        description: 'Contributed to a UK-based car finance platform used to compare PCP, HP, and loan options. Developed responsive React and Next.js components, dynamic forms, and SEO-friendly pages with a focus on performance, accessibility, and scalability.',
        stack: [
            { name: 'JavaScript' },
            { name: 'React.js' },
            { name: 'Next.js' },
            { name: 'Redux Toolkit' }
        ],
        image: '/assets/work/carplus.png',
        live: 'https://carplus.co.uk/',
        github: '#'
    }

];

const Work = () => {
    const [project, setProject] = useState(projects[0]);

    const handleSliderChange = (swiper) => {
        const currentIndex = swiper.activeIndex;
        setProject(projects[currentIndex])
    }
    return (
        <motion.section
            initial={{opacity: 0}}
            animate={{
                opacity: 1,
                transition: {delay: 2.4, duration: 0.4, ease: 'easeIn'}
            }}
            className="min-h-[80vh] h-full flex flex-col justify-center py-12 xl:px-0">
            <div className="container mx-auto">
                <div className="flex flex-col xl:flex-row xl:gap-[30px]">
                    <div
                        className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
                        <div className="flex flex-col gap-[30px] h-[50%]">
                            <div
                                className="text-8xl leading-none font-extrabold text-transparent text-outline">{project.num}</div>
                            <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">{project.category} </h2>
                            <p className="text-white/60">{project.description}</p>
                            <ul className="flex gap-4">
                                {project.stack.map((item, index) => {
                                    return <li key={index} className="text-xl text-accent">
                                        {item.name}
                                        {index !== project.stack.length - 1 && ","}
                                    </li>
                                })}
                            </ul>
                            <div className="border border-white/20"></div>
                            <div className="flex items-center gap-4">
                                <Link href={project.live} target="_blank">
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger
                                                className="w-[50px] h-[50px] rounded-full bg-white/5 flex justify-center items-center group">
                                                <BsArrowUpRight
                                                    className="text-white text-3xl group-hover:text-accent"/>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Live project</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </Link>
                                <Link href={project.github} target="_blank">
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger
                                                className="w-[50px] h-[50px] rounded-full bg-white/5 flex justify-center items-center group">
                                                <BsGithub className="text-white text-3xl group-hover:text-accent"/>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Github repository</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full xl:w-[50%]">
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            className="xl:h-[520px] mb-12"
                            onSlideChange={handleSliderChange}
                        >
                            {projects.map((project, index) => {
                                return <SwiperSlide key={index} className="w-full ">
                                    <div
                                        className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                                        <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={project.image}
                                                fill
                                                className="object-cover"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            })}
                            <WorkSliderBtns
                                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"

                            />
                        </Swiper>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Work;