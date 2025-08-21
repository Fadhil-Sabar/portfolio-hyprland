import {useCallback} from 'react'
import { useTerminal } from "@/utils/store/terminal";
import Terminal from "../organisms/terminal";
import { useIsMobile } from '@/utils/hooks/is-mobile';

export default function OpeningTerminal({ item, index, className }) {
    const {
        focusedIndex,
    } = useTerminal();

    const isMobile = useIsMobile();

    const opacityClass = focusedIndex === index ? "opacity-100" : "opacity-70";

    return (
        <div className={opacityClass}>
            <Terminal
                item={item}
                index={index}
                className={`w-[70%] md:w-[50%]`}
                isFloating={true}
            >
                <div className={`flex flex-col items-left justify-center`}>
                    <span className="text-[1em] md:text-[1.25em]">Hi, welcome to my portfolio</span>
                    <span className="text-[1em] md:text-[1.25em]">The idea of making this portfolio is to showcase my skills and projects, and I&apos;m inspired by Hyprland, I love how the beauty of linux and smooth animation.</span>
                    <span className="text-[1em] md:text-[1.25em]">For optimal experience, please open using desktop.</span>
                    {
                        isMobile ? (
                            <span className="text-[1em] md:text-[1.25em] mt-2"><i>Press - to close</i></span>
                        ) : (
                            <span className="text-[1em] md:text-[1.25em] mt-2"><i>Hover & Press [Alt] + [Q] to close</i></span>
                        )
                    }
                </div>
            </Terminal>
        </div>
    )
}