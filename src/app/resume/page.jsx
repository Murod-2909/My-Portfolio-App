"use client";
import React from 'react';
import {
    FaHtml5,
    FaCss3,
    FaJs,
    FaReact,
    FaFigma,
    FaGraduationCap,
    FaBootstrap,
    FaGithub,
    FaSass,
} from "react-icons/fa";
import {SiTailwindcss, SiNextdotjs, SiRedux, SiTypescript} from "react-icons/si";
import {CiBadgeDollar} from "react-icons/ci";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {ScrollArea} from "@/components/ui/scroll-area";
import {motion} from "framer-motion";

const about = {
    title: 'About me',
    description: 'Senior Frontend Engineer with 4+ years of experience building scalable and high-performance web applications using React and Next.js. Specialized in frontend architecture, performance optimization, and delivering production-ready user interfaces for international and remote teams.',
    info: [
        {
            fieldName: "Name",
            fieldValue: "Murod Shahriddinov"

        },
        {
            fieldName: "Phone",
            fieldValue: "(+998) 93 463 29 09"

        },
        {
            fieldName: "Experience",
            fieldValue: "4+ Years"

        },
        {
            fieldName: 'Location',
            fieldValue: 'Tashkent, Uzbekistan (Remote)'

        },
        {
            fieldName: "Nationality",
            fieldValue: "Uzbek"

        },
        {
            fieldName: "Email",
            fieldValue: "shahriddinovmurod195@gmail.com"

        },
        {
            fieldName: 'Availability',
            fieldValue: 'Open to Remote Opportunities'

        },
        {
            fieldName: 'Languages',
            fieldValue: 'Uzbek (Native), English (Intermediate), Russian (Intermediate)'

        },
    ]
}
const experience = {
    icon: <CiBadgeDollar />,
    title: 'Professional Experience',
    description: 'Senior Frontend Engineer with 3+ years of experience building scalable and high-performance web applications using React and Next.js. Experienced in remote collaboration with international teams, frontend architecture decisions, performance optimization, and mentoring junior developers.',
    items: [
        {
            company: 'Ministry of Innovation',
            position: 'Frontend Engineer (React)',
            duration: 'Dec 2021 – Feb 2022'
        },
        {
            company: 'OKS Technologies',
            position: 'Frontend Engineer (React, Redux Toolkit)',
            duration: 'Feb 2022 – Jun 2022'
        },
        {
            company: 'NAPA Automotive',
            position: 'Frontend Engineer',
            duration: '2022 – 2023'
        },
        {
            company: 'Tashkent City Prosecutor’s Academy',
            position: 'Frontend Engineer (Angular)',
            duration: 'Jun 2023 – Oct 2023'
        },
        {
            company: 'Online Media Platform',
            position: 'Frontend Engineer (Next.js)',
            duration: 'Jan 2024 – Jun 2024'
        },
        {
            company: 'E-commerce Startup (Poland)',
            position: 'Senior Frontend Engineer — Remote',
            duration: '2024 – Present'
        },
        {
            company: 'CarPlus',
            position: 'Senior Frontend Engineer (React, Next.js)',
            duration: 'Mar 2025 – July'
        },
        {
            company: 'Registon School',
            position: 'Frontend Instructor & Mentor',
            duration: '2025 – Present'
        }
    ]
};

const education = {
    icon: <FaGraduationCap />,
    title: 'Education',
    description: 'Strong academic and self-taught background in computer science and frontend development. Focused on modern JavaScript frameworks, frontend architecture, and building real-world production applications through hands-on projects and continuous learning.',
    items: [
        {
            institution: 'University of Science and Technologies',
            degree: 'Bachelor’s Degree — Logistics (In Progress)',
            duration: '2023 – 2028'
        },
        {
            institution: 'PDP Academy',
            degree: 'Frontend Development Program',
            duration: '2021 (6 months)'
        },
        {
            institution: 'Online Learning Platforms',
            degree: 'Advanced Frontend Development (React, Next.js)',
            duration: '2021 – Present'
        }
    ]
};

const skills = {
    title: 'Technical Skills',
    description: 'Experienced in building scalable, high-performance frontend applications using modern JavaScript frameworks. Strong focus on clean architecture, reusable components, performance optimization, and responsive UI development for production environments.',
    skillList: [
        { icon: <FaHtml5 />, name: 'HTML5' },
        { icon: <FaCss3 />, name: 'CSS3' },
        { icon: <FaSass />, name: 'SCSS / SASS' },
        { icon: <FaBootstrap />, name: 'Bootstrap' },
        { icon: <SiTailwindcss />, name: 'Tailwind CSS' },
        { icon: <FaJs />, name: 'JavaScript (ES6+)' },
        { icon: <SiTypescript />, name: 'TypeScript' },
        { icon: <FaReact />, name: 'React.js' },
        { icon: <SiNextdotjs />, name: 'Next.js' },
        { icon: <SiRedux />, name: 'Redux Toolkit' },
        { icon: <FaFigma />, name: 'Figma (UI Collaboration)' },
        { icon: <FaGithub />, name: 'Git & GitHub' }
    ]
};


const Resume = () => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{
                opacity: 1, transition: {
                    delay: 2.4, duration: 0.4, ease: "easeIn"
                }
            }} className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0">
            <div className="container mx-auto">
                <Tabs defaultValue="experience"
                      className="flex flex-col xl:flex-row gap-[60px]">
                    <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
                        <TabsTrigger value="experience" className="">Experience</TabsTrigger>
                        <TabsTrigger value="education" className="">Education</TabsTrigger>
                        <TabsTrigger value="skills" className="">Skills</TabsTrigger>
                        <TabsTrigger value="about" className="">About me</TabsTrigger>
                    </TabsList>
                    <div className="min-h-[70vh] w-full">
                        <TabsContent value="experience" className="w-full">
                            <div className="flex flex-col gap-[30px] text-center xl:text-left">
                                <h3 className="text-4xl font-bold">{experience.title}</h3>
                                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{experience.description}</p>
                                <ScrollArea className="h-[400px]">
                                    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                                        {experience.items.map((item, index) => {
                                            return <li key={index}
                                                       className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                                                <span className="text-accent">{item.duration}</span>
                                                <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.position}</h3>
                                                <div className="flex items-center gap-3">
                                                    <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                                                    <p className="text-white/60">{item.company}</p>
                                                </div>
                                            </li>
                                        })}
                                    </ul>
                                </ScrollArea>
                            </div>
                        </TabsContent>
                        <TabsContent value="education" className="w-full">
                            <div className="flex flex-col gap-[30px] text-center xl:text-left">
                                <h3 className="text-4xl font-bold">{education.title}</h3>
                                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{education.description}</p>
                                <ScrollArea className="h-[400px]">
                                    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                                        {education.items.map((item, index) => {
                                            return <li key={index}
                                                       className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                                                <span className="text-accent">{item.duration}</span>
                                                <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.degree}</h3>
                                                <div className="flex items-center gap-3">
                                                    <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                                                    <p className="text-white/60">{item.institution}</p>
                                                </div>
                                            </li>
                                        })}
                                    </ul>
                                </ScrollArea>
                            </div>
                        </TabsContent>
                        <TabsContent value="skills" className="w-full h-full">
                            <div className="flex flex-col gap-[30px]">
                                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                                    <h3 className="text-4xl font-bold">{skills.title}</h3>
                                    <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{skills.description}</p>
                                </div>
                                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap-[30px] gap-4">
                                    {skills.skillList.map((skill, index) => {
                                        return <li key={index}>
                                            <TooltipProvider delayDuration={100}>
                                                <Tooltip>
                                                    <TooltipTrigger
                                                        className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                                                        <div
                                                            className="text-6xl group-hover:text-accent transition-all duration-300">{skill.icon}</div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className="capitalize">{skill.name}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </TabsContent>
                        <TabsContent value="about" className="w-full h-full text-center xl:text-left">
                            <div className="flex flex-col gap-[30px]">
                                <h3 className="text-4xl font-bold">{about.title}</h3>
                                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{about.description}</p>
                                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[700px] mx-auto xl:mx-0">
                                    {about.info.map((item, index)=>{
                                        return <li key={index} className="flex items-center justify-center xl:justify-start gap-4">
                                            <span className="text-white/60">{item.fieldName}:</span>
                                            <span className="text-xl">{item.fieldValue}</span>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </motion.div>
    );
};

export default Resume;