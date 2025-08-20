export default function Contact() {
    return (
        <div className="space-y-2 mb-4 text-[1.25em]">
            <div className="flex flex-col md:flex-row">
                <span className="md:w-[15%] w-full font-semibold text-amber-400">Email:</span>
                <span>
                    <a href="mailto:sabarfadhil@gmail.com" className="underline">sabarfadhil@gmail.com</a>
                </span>
            </div>
            <div className="flex flex-col md:flex-row">
                <span className="md:w-[15%] w-full font-semibold text-amber-400">Github:</span>
                <span>
                    <a href="mailto:sabarfadhil@gmail.com" className="underline">https://github.com/Fadhil-Sabar</a>
                </span>
            </div>
            <div className="flex flex-col md:flex-row">
                <span className="md:w-[15%] w-full font-semibold text-amber-400">LinkedIn:</span>
                <span>
                    <a href="mailto:sabarfadhil@gmail.com" className="underline">https://www.linkedin.com/in/fadhil-andriawan-71b875212/</a>
                </span>
            </div>
        </div>
    )
}