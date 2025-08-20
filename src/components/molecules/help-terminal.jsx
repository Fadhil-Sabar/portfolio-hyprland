import { useTerminal } from "@/utils/store/terminal";
import Terminal from "../organisms/terminal";

export default function HelpTerminal({ item, index, className }) {
    const {
        focusedIndex,
    } = useTerminal();

    const opacityClass = focusedIndex === index ? "opacity-100" : "opacity-70";

    return (
        <div className={opacityClass}>
            <Terminal
                item={item}
                index={index}
                className={`w-[80%] md:w-[50%]`}
                isFloating={true}
            >
                <div className={`flex flex-col justify-center`}>
                    <table className="text-[1.25em]">
                        <thead>
                            <tr className="text-left">
                                <th className="border-2 px-2">Key</th>
                                <th className="border-2 px-2">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border-2 px-2">Alt + H</td>
                                <td className="border-2 px-2">Open Help Terminal</td>
                            </tr>
                            <tr>
                                <td className="border-2 px-2">Alt + P</td>
                                <td className="border-2 px-2">Open Profile Terminal</td>
                            </tr>
                            <tr>
                                <td className="border-2 px-2">Alt + Q</td>
                                <td className="border-2 px-2">Close Current Terminal</td>
                            </tr>
                            <tr>
                                <td className="border-2 px-2">Alt + Enter</td>
                                <td className="border-2 px-2">Open Terminal</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Terminal>
        </div>
    )
}