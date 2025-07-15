"use client"
import React, {useRef, useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {FaPhoneAlt, FaEnvelope, FaMapMarkedAlt} from "react-icons/fa";
import emailjs from '@emailjs/browser';

const info = [
    {
        icon: <FaPhoneAlt/>,
        title: 'Phone',
        description: '(+998) 93 463 29 09',
    },
    {
        icon: <FaEnvelope/>,
        title: 'Email',
        description: 'shahriddinovmurod195@gmail.com',
    },
    {
        icon: <FaMapMarkedAlt/>,
        title: 'Address',
        description: 'Uzbekistan, Tashkent city',
    },
];
import {motion} from "framer-motion";

const Contact = () => {
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(false);
    const form = useRef();


    const sendEmail = (e) => {
        e.preventDefault();
        setError(false);
        setSuccess(false)

        emailjs
            .sendForm(
                process.env.NEXT_PUBLIC_SERVICE_ID,
                process.env.NEXT_PUBLIC_TEMPLATE_ID,
                form.current, {
                    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
                })
            .then(
                () => {
                    setSuccess(true)
                    form.current.reset();
                },

            );
    };
    return (
        <motion.section
            initial={{opacity: 0}}
            animate={{
                opacity: 1,
                transition: {delay: 2.4, duration: 0.4, ease: 'easeIn'}
            }}
            className="py-6"
        >
            <div className="container mx-auto">
                <div className="flex flex-col xl:flex-row gap-[30px]">
                    <div className="xl:w-[54%] order-2 xl:order-none">
                        <form onSubmit={sendEmail} ref={form} className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl ">
                            <h3 className="text-4xl text-accent">Let's work together </h3>
                            <p className="text-white/60">I’m excited to bring your ideas to life with innovative solutions. Reach out, and let’s create something exceptional together.</p>
                            {success && <span className="text-green-600 font-semibold">Your message has been sent successfully!</span>}
                            {error && <span className="text-red-600 font-semibold">Something went wrong!</span>}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input type="firstname" name="user_firstname" placeholder="Firstname"/>
                                <Input type="lastname" name="user_lastname" placeholder="Lastname"/>
                                <Input type="email" name='user_email' placeholder="Email address"/>
                                <Input type="phone" name="user_phone" placeholder="Phone number"/>
                            </div>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a sevice "/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select a sevice</SelectLabel>
                                        <SelectItem value="est">Web Developer</SelectItem>
                                        <SelectItem value="cst">Teacher</SelectItem>
                                        <SelectItem value="mst">Project Manager</SelectItem>
                                        <SelectItem value="tsm">Freelancer</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Textarea className="h-[200px]" name="user_message" placeholder="Type your message here."/>
                            <Button type="submit"  size="md" className="max-w-40">Send message</Button>

                        </form>
                    </div>
                    <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
                        <ul className="flex flex-col gap-10">
                            {info.map((item, index)=>{
                                return <li key={index} className="flex items-center gap-6">
                                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                                        <div className="text-[28px]">{item.icon}</div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white/60">{item.title}</p>
                                        <h3 className="text-xl">{item.description}</h3>
                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Contact;