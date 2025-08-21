import { useMemo, useCallback, useEffect, useState } from 'react';
import Profile from '../molecules/profile';
import { useTerminal } from '@/utils/store/terminal';
import Projects from '../molecules/projects';
import Contact from './contact';
import { useIsMobile } from '@/utils/hooks/is-mobile';


export default function InlineTerminal({ bottomRef, index }) {
    const isMobile = useIsMobile();
    const currentDate = () => new Date().toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const { 
        history, 
        setHistory, 
        input, 
        setInput, 
        clearHistory, 
        addHistory, 
        resetInput, 
        removeLastInput,
        addInput,
        focusedIndex,
        replaceCurrentInput
    } = useTerminal();

    const listCommands = {
        clear: () => clearHistory(focusedIndex),
        date: () => `Current date is: ${new Date().toLocaleString()}`,
        profile: <Profile showTerminal={false} />,
        about: 'This portfolio is built using Next.js and Zustand for state management, and Tailwind CSS for styling. It features a terminal interface where you can interact with various commands, inspired by Hyprland.',
        hyprland: (
            <span className="text-[1.25em]">Hyprland is a dynamic tiling Wayland compositor that offers a modern and efficient desktop experience. It is known for its performance and flexibility, making it a popular choice among Linux users. Learn more at <a href="https://hypr.land/" className="underline">https://hypr.land/</a></span>
        ),
        projects: <Projects showTerminal={false} />,
        contact: (
            <Contact/>
        )
    }

    const handleKeyDown = useCallback((event) => {
        console.log(event.key, "key pressed", input[focusedIndex]);
        const blockedKeys = ['Tab', 'Meta', 'Shift', 'Escape']
        if(event.ctrlKey || event.metaKey || event.altKey || blockedKeys.includes(event.key)) {
            return;
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            const command = input[focusedIndex].trim();
            console.log(`Command entered: ${command}`);
            if (command) {
                let response = ''

                if(command === 'help'){
                    response = `Available commands: ${Object.keys(listCommands).join(', ')}`;
                }
                else if(listCommands[command]) {
                    response = typeof listCommands[command] === 'function' ? listCommands[command]() : listCommands[command];
                }
                else {
                    response = `Unknown command: ${command}`;
                }

                if(response) {
                    addHistory(focusedIndex, command, response);
                }
            }


            resetInput(focusedIndex);
        } else if (event.key === 'Backspace') {
            removeLastInput(focusedIndex);
        } else if (event.key === 'ArrowUp') {
            replaceCurrentInput('up');
        } else if (event.key === 'ArrowDown') {
            replaceCurrentInput('down');
        } else {
            addInput(focusedIndex, event.key);
        }
    }, [input, focusedIndex]);

    useEffect(() => {
        if(isMobile) {
            return;
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [handleKeyDown])

    useEffect(() => {
        console.log("History updated:", history[index], "Index:", index);
        if (bottomRef?.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [history, index]);

    return (
        <div className="px-2">
            {history?.[index]?.map((line, index) => (
                <div key={index} >
                    <div className="inline-info">
                        <span className="text-[1em] md:text-[1.25em] bg-blue-500">
                            {`${line.createdAt}`}
                        </span>
                        <span className="text-[1em] md:text-[1.25em] bg-amber-500">
                            ~
                        </span>
                    </div>
                    <div className="inline-info">
                        <span className="text-[1em] md:text-[1.25em] bg-amber-700">
                            @diru
                        </span>
                        <p className="pl-2 text-[1.25em]">
                            {line.command}
                        </p>
                    </div>
                    <div className="flex flex-col text-white pl-2">
                        {
                            typeof line.response === 'string' ? (
                                <p className="text-[1.25em]">{line.response}</p>
                            ) : (
                                line.response
                            )
                        }
                    </div>
                </div>
            ))}
            <div className="inline-info">
                <span className="text-[1em] md:text-[1.25em] bg-blue-500">
                    {`${currentDate()}`}
                </span>
                <span className="text-[1em] md:text-[1.25em] bg-amber-500">
                    ~
                </span>
            </div>
            <div className="inline-info">
                <span className="text-[1em] md:text-[1.25em] bg-amber-700">
                    @diru
                </span>
                {
                    isMobile ? (
                        <input value={input[index] || ''} onChange={(e) => addInput(index, e.target.value)} />
                    ) : (
                        <p className="pl-2 text-[1em] md:text-[1.25em]">
                            {input[index] || ''}
                        </p>
                    )
                }
                <span className={`text-[2em] -translate-x-5 animate-blinking transition-all`}>|</span>
            </div>
        </div>
    )
}