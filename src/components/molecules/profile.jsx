import Image from "next/image";

export default function Profile() {
    return (
        <div className="flex flex-row justify-between items-center py-5">
            <div className="flex flex-row justify-center items-center mx-auto">
                <Image
                    src="https://picsum.dev/200/200"
                    alt="Profile Picture"
                    width={200}
                    height={200}
                    className="rounded-full border-2 opacity-70"
                />
            </div>
            <div className="flex flex-col justify-center items-start mx-auto w-1/2">
                <h2 className="text-[1.5em] font-semibold">Fadhil Andriawan</h2>
                <p className="text-[1em] text-gray-300">Junior Software Engineer</p>
            </div>
        </div>
    )
}