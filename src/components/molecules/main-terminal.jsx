import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import InlineTerminal from "../atoms/inline-terminal";
import Profile from "./profile";

export default function MainTerminal({ index }) {
    const bottomRef = useRef(null);

    return (
        <div className=" pt-4">
            {/* <InlineTerminal
                content={terminalContent}
            /> */}
                <InlineTerminal
                    index={index}
                    bottomRef={bottomRef}
                />


            <div ref={bottomRef}></div>
        </div>
    )
}