import {useCallback} from 'react'
import { useTerminal } from "@/utils/store/terminal";
import Terminal from "../organisms/terminal";

export default function OpeningTerminal({ item, index, className }) {
    const {
        focusedIndex,
    } = useTerminal();

    const opacityClass = focusedIndex === index ? "opacity-100" : "opacity-70";

    return (
        <div className={opacityClass}>
            <Terminal
                item={item}
                index={index}
                className={`w-[70%] md:w-[50%] p-5 absolute top-1/2 left-1/2 -translate-x-1/2 z-50 -translate-y-1/2`}
            >
                <div className={`flex flex-col items-center justify-center`}>
                    <span className="text-[1.25em]">Hi, welcome to my portfolio</span>
                    <span className="text-[1.25em]">The idea of making this portfolio is to showcase my skills and projects, and I&apos;m inspired by Hyprland, I love how the beauty of linux and smooth animation.</span>
                    <span className="text-[1.25em] mt-2"><i>Press [Alt] + [Esc] to close</i></span>
                </div>
            </Terminal>
        </div>
    )
}