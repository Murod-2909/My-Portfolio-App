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
    description: 'I\'m a dedicated web developer with a passion for building seamless digital experiences. With a strong foundation in frontend technologies and a keen eye for design, I aim to create impactful, user-friendly interfaces that bring ideas to life.',
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
            fieldName: "Skype",
            fieldValue: "Murod Shakhriddinov"

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
            fieldName: "Freelance",
            fieldValue: "Available"

        },
        {
            fieldName: "Language",
            fieldValue: "Uzbek, English, Russia"

        },
    ]
}
const experience = {
    icon: <CiBadgeDollar/>,
    title: 'My experience',
    description: 'With a solid background in web development, I specialize in creating responsive and interactive digital solutions, managing projects effectively, and delivering high-quality results tailored to client needs.',
    items: [
        {
            company: 'Ministry of Innovation.',
            position: 'Front-End Developer (React.js)',
            duration: 'Winter 2021'
        },
        {
            company: 'OKS Technologies',
            position: 'Front-End Developer',
            duration: 'Summer 2022'
        },
        {
            company: 'Napa Avtomative',
            position: 'Front-End Developer, Project Manager',
            duration: '2022-2023'
        },
        {
            company: 'Tashkent City Prosecutor\'s Academy',
            position: 'Front-End Developer (Angular)',
            duration: 'Summer and Autumn 2023'
        },
        {
            company: 'Online Internet magazine.',
            position: 'Front-End Developer (Next.js)',
            duration: '2024 6-month'
        },
        {
            company: 'E-commerce Startup',
            position: 'Freelance Web-Developer',
            duration: '2024 Winter'
        },
        {
            company: 'Carplus',
            position: 'Next.js and React.js',
            duration: '2025 Summer'
        },
        {
            company: 'Mars IT school',
            position: 'Frontend mentor',
            duration: '2025 from summer Currently'
        },
    ]
}
const education = {
    icon: <FaGraduationCap/>,
    title: 'My education',
    description: 'I hold a Bachelor\'s degree in Computer Science, where I focused on frontend development.\n' +
        'I gained practical experience through various projects and coding boot camps.\n' +
        'My studies equipped me with a strong foundation in programming languages and web technologies.\n' +
        'I am committed to continuous learning in the rapidly evolving tech landscape.\n' +
        '\n',
    items: [
        {
            institution: 'University of Science and Technologies',
            degree: 'Logistic',
            duration: '2023-2028'
        },
        {
            institution: 'PDP Academy',
            degree: 'Front-End Developer',
            duration: '2021 6-month'
        },
        {
            institution: 'Online Course',
            degree: 'Front-End Web Developer',
            duration: '2021 Present'
        },

    ]
};
const skills = {
    title: 'My Skills',
    description: 'I excel in HTML, CSS, and JavaScript for frontend development.\n' +
        'My expertise lies in using React and Redux to build dynamic applications.\n' +
        'I leverage TypeScript to ensure code quality and maintainability.\n' +
        'I design responsive layouts that enhance user experiences across devices.\n' +
        'I implement SEO best practices to improve site visibility and rankings.\n' +
        'I utilize Git for effective version control and team collaboration.',
    skillList: [
        {
            icon: <FaHtml5/>,
            name: 'html 5',
        },
        {
            icon: <FaCss3/>,
            name: 'css 3',
        }, {
            icon: <FaSass/>,
            name: 'sass',
        },
        {
            icon: <FaBootstrap/>,
            name: 'bootstrap',
        },
        {
            icon: <FaJs/>,
            name: 'javascript',
        },
        {
            icon: <FaReact/>,
            name: 'react.js',
        },
        {
            icon: <SiNextdotjs/>,
            name: 'next.js',
        },
        {
            icon: <SiTailwindcss/>,
            name: 'tailwind.css',
        },
        {
            icon: <SiRedux/>,
            name: 'redux',
        },
        {
            icon: <SiTypescript/>,
            name: 'typescript',
        },
        {
            icon: <FaFigma/>,
            name: 'figma',
        },
        {
            icon: <FaGithub/>,
            name: 'github',
        },
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
                                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[628px] mx-auto xl:mx-0">
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