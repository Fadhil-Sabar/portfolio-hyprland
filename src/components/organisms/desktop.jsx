import { getTerminalGridClasses } from "@/utils/helper/terminalGridClasses";
import MainTerminal from "../molecules/main-terminal";
import OpeningTerminal from "../molecules/opening-terminal";
import Terminal from "./terminal";
import React from 'react'
import { useTerminal } from "@/utils/store/terminal";
import { useDesktops } from "@/utils/store/desktop";

export default function Desktop({
    terminal,
    desktop
}) {
    const {
        currentDesktop,
    } = useDesktops();

    const {
        focusedIndex,
    } = useTerminal();
    
    return (
        <div className={`${currentDesktop < desktop.id ? '-translate-x-full' : ''} transition-transform duration-300 ease-in-out overflow-hidden relative`}>
            {
                terminal?.filter(item => item?.floating && item?.idDesktop === desktop.id)?.map((item, index) => {
                    return (
                        item.child ? React.cloneElement(item.child, { index, key: item.id }) : <OpeningTerminal
                            index={index}
                            key={index}
                            item={item}
                        />
                    )
                })
            }

            <div className={`grid grid-cols-2 grid-rows-2 gap-3 h-[95svh] p-2 overflow-hidden`}>
                {terminal?.filter(item => !item?.floating && item?.idDesktop === desktop.id)?.map((item, index) => {
                    const totalTerminals = terminal.filter(item => !item?.floating && item?.idDesktop === desktop.id).length;
                    const gridClasses = getTerminalGridClasses(index, totalTerminals);

                    return (
                        <Terminal item={item} key={`terminal-${index}`} index={index} className={`${gridClasses}`}>
                            {
                                item.child ? React.cloneElement(item.child, { index }) : (
                                    <div className={`flex flex-col overflow-scroll max-h-[90svh] transition-opacity ${index !== focusedIndex ? 'opacity-70' : ''}`}>
                                        <div className="text-white text-center py-4">
                                            <h1 className="text-[1.25em] md:text-[1.5em] font-bold">Hi, I&apos;m Fadhil</h1>
                                            <h1 className="text-[1.25em] md:text-[1.5em] font-bold">Welcome to my Hyprland Portfolio</h1>
                                            <p className="mt-4 text-[1em] md:text-[1.25em]">Type <i>help</i> for available commands.</p>
                                        </div>
                                        <MainTerminal index={index} />
                                    </div>
                                )
                            }
                        </Terminal>
                    );
                })}
            </div>
        </div>
    )
}