import { useTerminal } from '@/utils/store/terminal';
import { useCallback, useRef, useState, useEffect } from 'react'

export default function Terminal({ item, children, className = '', index, isFloating }) {
    const { setFocusedIndex } = useTerminal();

    const ref = useRef(null);
    const draggingRef = useRef(false);
    const offsetRef = useRef({ x: 0, y: 0 });
    const [pos, setPos] = useState({ x: null, y: null });
    const [dragging, setDragging] = useState(false);
    const [ctrlPressed, setCtrlPressed] = useState(false); // <-- tambah

    const handleMouseOver = useCallback(() => {
        setFocusedIndex(index);
    }, [setFocusedIndex, index]);

    const onMouseDown = useCallback((e) => {
        if (!isFloating) return;
        if (!ctrlPressed) return; // hanya mulai drag jika Alt ditekan
        const rect = ref.current.getBoundingClientRect();
        draggingRef.current = true;
        setDragging(true);
        offsetRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        if (pos.x === null && pos.y === null) {
            setPos({ x: rect.left, y: rect.top });
        }
        document.body.style.userSelect = 'none';
    }, [isFloating, pos.x, pos.y, ctrlPressed]);

    const onMouseMove = useCallback((e) => {
        if (!draggingRef.current) return;
        const el = ref.current;
        if (!el) return;
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const maxX = window.innerWidth - w;
        const maxY = window.innerHeight - h;
        const newX = Math.min(Math.max(e.clientX - offsetRef.current.x, 0), maxX);
        const newY = Math.min(Math.max(e.clientY - offsetRef.current.y, 0), maxY);
        setPos({ x: newX, y: newY });
    }, []);

    const onMouseUp = useCallback(() => {
        if (draggingRef.current) {
            draggingRef.current = false;
            setDragging(false);
            document.body.style.userSelect = '';
        }
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            document.body.style.userSelect = '';
        };
    }, [onMouseMove, onMouseUp]);

    // Listener Alt key
    useEffect(() => {
        const down = (e) => {
            if (e.ctrlKey) setCtrlPressed(true);
        };
        const up = (e) => {
            if (!e.ctrlKey) setCtrlPressed(false);
        };
        window.addEventListener('keydown', down);
        window.addEventListener('keyup', up);
        window.addEventListener('blur', () => setCtrlPressed(false));
        return () => {
            window.removeEventListener('keydown', down);
            window.removeEventListener('keyup', up);
        };
    }, []);

    const floatingClasses = isFloating
        ? 'p-5 absolute z-50 ' + (pos.x === null && pos.y === null
            ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            : '')
        : '';

    const style = isFloating && pos.x !== null
        ? { left: pos.x, top: pos.y, transform: 'none' }
        : {};

    return (
        <div
            ref={ref}
            onMouseLeave={() => setFocusedIndex(null)}
            onMouseOver={handleMouseOver}
            onMouseDown={onMouseDown}
            className={`flex-1 py-2
        ${item?.closing ? 'animate-slide-down-bounce-out isAbleDragging' : 'animate-slide-up-bounce'}
        bg-black/50 backdrop-blur-sm rounded-lg ring-4 ring-amber-500
        ${floatingClasses}
        ${isFloating
                ? (ctrlPressed
                    ? (dragging ? 'cursor-grabbing' : 'cursor-grab')
                    : 'cursor-default') + ' select-none'
                : ''}
        ${className}`}
            style={style}
            draggable={false}
            title={isFloating ? 'Tahan Ctrl lalu drag untuk memindahkan' : undefined}
        >
            {children}
        </div>
    );
}
