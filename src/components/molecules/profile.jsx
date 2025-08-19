import Image from "next/image";
import TextWithTooltip from "../atoms/text-with-tooltip";
import TerminalProfile from "./terminal-profile";
import {useCallback} from 'react'
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
        <div className={`${showTerminal ? 'overflow-scroll' : 'overflow-hidden'} max-h-[100%] transition-opacity
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
                <div className="flex flex-col justify-center items-start mx-auto tracking-wide w-2/3">
                    <span className="text-[1.75em] font-semibold">Fadhil Andriawan</span>
                    <p className="text-[1.25em] text-gray-300">Junior Software Developer</p>
                    <span className="text-[1.25em] max-w-4xl">Hi, I'm Fadhil, a Junior Software Developer at PT. ILCS, and I'm passionate about exploring new technologies and contributing to large-scale projects. I enjoy the continuous learning journey in programming, from UI design and building user-focused front-end applications to crafting efficient back-end logic.</span>

                    <table className="mt-4 table-auto text-[1.25em]">
                        <thead>
                            <tr align="left">
                                <th width="30%">Skill & Interest</th>
                                <th width="10%"></th>
                                <th width="60%"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
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
                                </td>
                                <td>{`->`}</td>
                                <td>Expert</td>
                            </tr>
                            <tr>
                                <td>
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
                                </td>
                                <td>{`->`}</td>
                                <td>Intermediate</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="flex flex-row items-center gap-3 stack-icon">
                                        <TextWithTooltip className="text-blue-400" tooltip="Flutter"></TextWithTooltip>
                                    </div>
                                </td>
                                <td>{`->`}</td>
                                <td>Beginner</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <TerminalProfile showTerminal={showTerminal} index={index} />
        </div>
    )
}