import { useEffect, useState } from 'react'
import TextWithTooltip from "../atoms/text-with-tooltip";
import { useDesktops } from '@/utils/store/desktop';

export default function Header() {
    const [currentDate, setCurrentDate] = useState('');

    const {
        desktops,
        setCurrentDesktop,
        currentDesktop
    } = useDesktops()

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date().toLocaleString());
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <header className="top-0 left-0 w-full h-12 bg-black/50 backdrop-blur-sm flex items-center justify-between rounded-lg m-1 px-4">
            <div className="flex items-center gap-10">
                <h1 className="text-white text-lg font-bold">Diru</h1>
                <div className="hidden md:hidden flex-row items-center gap-4">
                    {
                        desktops.map((item, index) => (
                            <button key={index} 
                                className={`hover:bg-white/30 transition-colors cursor-pointer px-2 ${item.id === currentDesktop ? 'border-b-2' : 'border-b-0'}`}
                                onClick={() => setCurrentDesktop(item.id)}
                            >{item.id + 1}</button>
                        ))
                    }
                </div>

            </div>

            <div className="">{currentDate}</div>


            <div className="flex items-center gap-3 justify-center">
                <div className="flex items-center gap-4 mx-4">
                    <TextWithTooltip tooltip={'Help'}>
                        <span className="cursor-pointer text-white text-[1.5em]" onClick={() => newHelpTerminal()}>?</span>
                    </TextWithTooltip>
                    <TextWithTooltip tooltip={'Linkedin'}>
                        <span className="cursor-pointer text-blue-400 text-[1.5em]"></span>
                    </TextWithTooltip>
                    <TextWithTooltip tooltip={'Github'}>
                        <span className="cursor-pointer text-white text-[1.5em]"></span>
                    </TextWithTooltip>
                </div>
                <span className="text-gray-400 text-[1em]">|</span>
                <span className="text-white text-[1em]">⏻</span>
            </div>
        </header>
    )
}