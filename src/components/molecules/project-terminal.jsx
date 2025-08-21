import { useRef } from "react";
import InlineTerminal from "../atoms/inline-terminal";

export default function TerminalProject({
    showTerminal = true,
    index
}) {
    const bottomRef = useRef(null);

    if(!showTerminal) {
        return null;
    }

    return (
        <div className="">
            {/* <InlineTerminal
                content={terminalContent}
            /> */}
                <InlineTerminal
                    bottomRef={bottomRef}
                    index={index}
                />

            <div ref={bottomRef}></div>
        </div>
    )
}