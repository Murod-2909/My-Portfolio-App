import React from 'react';
import {Button} from "@/components/ui/button";
import {FiDownload} from "react-icons/fi";
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";

const Home = () => {
    return (
        <section className="h-full">
            <div className="container mx-auto h-full">
                <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
                    <div className="text-center xl:text-left order-2 xl:order-none">
                        <span className="text-xl">Senior Frontend Engineer • React & Next.js • Remote</span>
                        <h1 className="h1 mb-6">Hello, I’m <br/>
                            <span className="text-accent">Murod Shahriddinov</span> <br/>
                            Senior Frontend Engineer
                        </h1>
                        <p className="max-w-[700px] mb-9 text-white/80">I’m a Senior Frontend Engineer specializing in React and Next.js,
                            with strong experience in frontend architecture, performance optimization,
                            and delivering production-ready applications for EU-based clients.
                        </p>
                        <div className="flex flex-col xl:flex-row items-center gap-8">
                            <a href="/assets/shakhriddinov%20Murod.pdf" download="Murod_Shahriddinov_CV.pdf">
                                <Button variant="outline"  size="lg" className="uppercase flex items-center gap-2">
                                    <span>Hire Me (Remote)</span>
                                    <FiDownload className="text-xl"/>
                                </Button>
                            </a>
                            <div  className="mb-8 xl:mb-0">
                                <Social containerStyles="flex gap-6" iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center
                                 items-center text-accent text-base hover:bg-accent hover:text-primary hover: trandition-all duration-500"/>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 xl:order-none mb-8 xl:mb-0">
                        <Photo/>
                    </div>
                </div>
            </div>
            <Stats/>
        </section>
    );
};

export default Home;