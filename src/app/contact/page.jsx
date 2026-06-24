"use client"
import React, { useState } from 'react';
import dynamic from "next/dynamic";
const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), { ssr: false });
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
import {motion} from "framer-motion";

const info = [
    { icon: <FaPhoneAlt/>, title: 'Phone', description: '(+998) 93 463 29 09' },
    { icon: <FaEnvelope/>, title: 'Email', description: 'shahriddinovmurod195@gmail.com' },
    { icon: <FaMapMarkedAlt />, title: 'Location', description: 'Tashkent, Uzbekistan (Open to remote work)' },
];

const Contact = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [service, setService] = useState('');
    const [form, setForm] = useState({ firstname: '', lastname: '', email: '', phone: '', message: '' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const sendMessage = async (e) => {
        e.preventDefault();
        setError(false);
        setSuccess(false);
        setLoading(true);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, service }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setSuccess(true);
            setForm({ firstname: '', lastname: '', email: '', phone: '', message: '' });
            setService('');
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.section
            initial={{opacity: 0}}
            animate={{ opacity: 1, transition: {delay: 2.4, duration: 0.4, ease: 'easeIn'} }}
            className="py-6"
        >
            <ThreeBackground />
            <div className="container mx-auto">
                <div className="flex flex-col xl:flex-row gap-[30px]">
                    <div className="xl:w-[54%] order-2 xl:order-none">
                        <form onSubmit={sendMessage} className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
                            <h3 className="text-4xl text-accent">Let's build something great</h3>
                            <p className="text-white/60">I help companies and teams build scalable, high-performance web applications.
                                If you're looking for a reliable frontend engineer for a project or remote role, feel free to reach out.</p>
                            {success && <span className="text-green-500 font-semibold">Thank you! Your message has been sent. I'll get back to you shortly.</span>}
                            {error && <span className="text-red-500 font-semibold">Oops! Something went wrong. Please try again later.</span>}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input name="firstname" value={form.firstname} onChange={handleChange} placeholder="First name" required />
                                <Input name="lastname" value={form.lastname} onChange={handleChange} placeholder="Last name" />
                                <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email address" required />
                                <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number (optional)" />
                            </div>
                            <Select value={service} onValueChange={setService}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="What are you looking for?" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Frontend Engineer (React / Next.js)</SelectLabel>
                                        <SelectItem value="Remote Frontend Developer">Remote Frontend Developer</SelectItem>
                                        <SelectItem value="Frontend Consulting">Frontend Consulting</SelectItem>
                                        <SelectItem value="Mentorship / Teaching">Mentorship / Teaching</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Textarea className="h-[200px]" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project, role, or how I can help you." required />
                            <Button type="submit" size="md" className="max-w-40" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Message'}
                            </Button>
                        </form>
                    </div>
                    <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
                        <ul className="flex flex-col gap-10">
                            {info.map((item, index) => (
                                <li key={index} className="flex items-center gap-6">
                                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                                        <div className="text-[28px]">{item.icon}</div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white/60">{item.title}</p>
                                        <h3 className="text-xl">{item.description}</h3>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Contact;
