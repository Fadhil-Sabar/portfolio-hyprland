import { useTerminal } from '@/utils/store/terminal';
import {useCallback} from 'react'

export default function Terminal({ item, children, className, index }) {
    const {
        setFocusedIndex,
    } = useTerminal();

    const handleMouseOver = useCallback((index) => {
        setFocusedIndex(index);
    }, [setFocusedIndex]);
    return (
        <div
            onMouseLeave={() => setFocusedIndex(null)}
            onMouseOver={() => handleMouseOver(index)}
            className={`flex-1
              ${item?.closing ? "animate-slide-down-bounce-out" : "animate-slide-up-bounce"}
              bg-black/50 backdrop-blur-sm rounded-lg ring-4 ring-amber-500
              ${className}`}
        >
            {children}
        </div>
    );
}
