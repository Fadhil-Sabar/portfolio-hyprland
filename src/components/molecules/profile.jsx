import Image from "next/image";
import TextWithTooltip from "../atoms/text-with-tooltip";
import TerminalProfile from "./terminal-profile";
import { useCallback } from 'react'
import { useTerminal } from "@/utils/store/terminal";

export default function Profile({
    showTerminal = true,
    index
}) {
    const {
        setFocusedIndex,
        focusedIndex,
    } = useTerminal();

    const handleMouseOver = useCallback(() => {
        setFocusedIndex(index);
    }, [index, setFocusedIndex]);

    return (
        <div className={`overflow-y-scroll max-h-[100%] transition-opacity
            ${focusedIndex !== index && showTerminal ? 'opacity-75' : ''}
            `}
            onMouseOver={handleMouseOver}
        >
            <div className="flex flex-col md:flex-row justify-center items-center py-5">
                <div className="flex flex-row justify-center items-center mx-auto">
                    <Image
                        src="https://picsum.dev/300/300"
                        alt="Profile Picture"
                        width={300}
                        height={300}
                        className="rounded-full border-2 opacity-70"
                    />
                </div>
                <div className="flex flex-col justify-center items-start mx-auto tracking-wide w-full md:w-2/3 gap-2 px-4">
                    <div>
                        <span className="text-[1.25em] md:text-[1.5em] font-semibold">Fadhil Andriawan</span>
                        <p className="text-[1em] md:text-[1.25em] text-gray-300">Junior Software Developer</p>
                        <span className="text-[1em] md:text-[1.25em] max-w-4xl">Hi, I'm Fadhil, a Junior Software Developer at PT. ILCS, and I'm passionate about exploring new technologies and contributing to large-scale projects. I enjoy the continuous learning journey in programming, from UI design and building user-focused front-end applications to crafting efficient back-end logic.</span>

                    </div>

                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="md:w-[50%]">
                            <span className="text-[1.25em] md:text-[1.5em] font-bold text-amber-300">Education</span>
                            <p className="text-[1em] md:text-[1.25em]">2nd year Student at Universitas Terbuka, majoring in System Information</p>
                            <p className="text-[1em] md:text-[1.25em]">Cumulative GPA: 3.42</p>
                            <p className="text-[1em] md:text-[1.25em]">Overall GPA: 3.28</p>

                        </div>
                        <div>
                            <span className="text-[1.25em] md:text-[1.5em] font-bold text-amber-300">Experience</span>
                            <ul className="text-[1em] md:text-[1.25em] list-none">
                                <li>
                                    PT Integrasi Logistik Cipta Solusi
                                    <br />
                                    <ul className="pl-2">
                                        <li>- Fullstack Developer <i className="text-gray-300">(2023 September - Current)</i></li>
                                        <li>- L2 Developer <i className="text-gray-300">(2022 February - 2023 September)</i></li>
                                    </ul>
                                </li>
                                <li>
                                    Mahatech (Freelance)
                                    <br />
                                    <ul className="pl-2">
                                        <li>- Front End Web Developer <i className="text-gray-300">(June 2024 - February 2024)</i></li>
                                    </ul>
                                </li>
                                <li>
                                    Ideatech (Freelance)
                                    <br />
                                    <ul className="pl-2">
                                        <li>- Front End Web Developer <i className="text-gray-300">(April 2023 - April 2023)</i></li>
                                    </ul>
                                </li>
                                <li>
                                    PT Enigma Cipta Humanika
                                    <br />
                                    <ul className="pl-2">
                                        <li>- Online IT Bootcamp <i className="text-gray-300">(September 2021 - January 2022)</i></li>
                                    </ul>
                                </li>
                            </ul>

                        </div>
                    </div>

                    <div className="flex flex-col w-full">
                        <div className="flex">
                            <span className="text-[1.25em] md:text-[1.5em] font-bold text-amber-300">Skill & interest</span>
                        </div>

                        <div className="flex text-[1em] md:text-[1.25em]">
                            <div className="flex flex-col w-[40%] md:w-[20%]">
                                <div className="flex flex-row items-center gap-3 stack-icon">
                                    <TextWithTooltip className="text-orange-500" tooltip="HTML"></TextWithTooltip>
                                    <TextWithTooltip className="text-blue-400" tooltip="CSS"></TextWithTooltip>
                                    <TextWithTooltip className="text-amber-300" tooltip="Javascript"></TextWithTooltip>
                                </div>
                                <div className="flex flex-row items-center gap-3 stack-icon">
                                    <TextWithTooltip className="text-green-700" tooltip="Node JS"></TextWithTooltip>
                                    <TextWithTooltip className="text-white" tooltip="Express JS"></TextWithTooltip>
                                    <TextWithTooltip className="text-grey-300" tooltip="PL SQL"></TextWithTooltip>
                                </div>
                            </div>
                            <span>{`->`}</span>
                            <span className="ml-5">Expert</span>
                        </div>

                        <div className="flex text-[1em] md:text-[1.25em]">
                            <div className="flex flex-col w-[40%] md:w-[20%]">
                                <div className="flex flex-row items-center gap-3 stack-icon">
                                    <TextWithTooltip className="text-blue-400" tooltip="Tailwind">󱏿</TextWithTooltip>
                                    <TextWithTooltip className="text-white" tooltip="Next JS"></TextWithTooltip>
                                    <TextWithTooltip className="text-blue-300" tooltip="React"></TextWithTooltip>
                                    <TextWithTooltip className="text-blue-400" tooltip="Typescript"></TextWithTooltip>
                                </div>
                                <div className="flex flex-row items-center gap-3 stack-icon">
                                    <TextWithTooltip className="text-green-400" tooltip="Spring Boot"></TextWithTooltip>
                                    <TextWithTooltip className="text-blue-300" tooltip="PostgreSQL"></TextWithTooltip>
                                    <TextWithTooltip className="text-red-500" tooltip="Nest JS"></TextWithTooltip>
                                </div>
                            </div>
                            <span>{`->`}</span>
                            <span className="ml-5">Intermediate</span>
                        </div>
                        <div className="flex text-[1em] md:text-[1.25em]">
                            <div className="flex flex-col w-[40%] md:w-[20%]">
                                <div className="flex flex-row items-center gap-3 stack-icon">
                                    <TextWithTooltip className="text-blue-400" tooltip="Flutter"></TextWithTooltip>
                                </div>
                            </div>
                            <span>{`->`}</span>
                            <span className="ml-5">Beginner</span>
                        </div>
                    </div>
                </div>
            </div>
            <TerminalProfile showTerminal={showTerminal} index={index} />
        </div>
    )
}