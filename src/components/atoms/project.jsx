import Image from "next/image";

export default function Project({ name, type, techStack, description, images, sourceCodeUrl, url }) {
    return (
        <div className="space-y-2 mb-4">
            <div className="flex flex-col md:flex-row">
                <span className="md:w-[15%] w-full font-semibold text-amber-400">Project Name:</span>
                <span>{name}</span>
            </div>
            <div className="flex flex-col md:flex-row">
                <span className="md:w-[15%] w-full font-semibold text-amber-400">Project Type:</span>
                <span>{type}</span>
            </div>
            <div className="flex flex-col md:flex-row">
                <span className="md:w-[15%] w-full font-semibold text-amber-400">Tech Stack:</span>
                <span>{techStack}</span>
            </div>
            <div className="flex flex-col md:flex-row">
                <span className="md:w-[15%] w-full font-semibold text-amber-400">Description:</span>
                <div className="md:w-[85%] w-full">
                    {description}
                </div>
            </div>
            {
                sourceCodeUrl && (
                    <div className="flex flex-col md:flex-row">
                        <span className="md:w-[15%] w-full font-semibold text-amber-400">Source Code:</span>
                        <span className="md:w-[85%] w-full">
                            <a href={sourceCodeUrl} className="underline">{sourceCodeUrl}</a>
                        </span>
                    </div>
                )
            }
            {
                url && (
                    <div className="flex flex-col md:flex-row">
                        <span className="md:w-[15%] w-full font-semibold text-amber-400">Project URL:</span>
                        <span className="md:w-[85%] w-full">
                            <a href={url} className="underline">{url}</a>
                        </span>
                    </div>
                )
            }
            <div className="flex flex-col md:flex-row">
                <span className="md:w-[15%] w-full font-semibold text-amber-400">Images:</span>
                <ul className="space-y-2">
                    {images.map((image, index) => (
                        <li key={index}>
                            <Image className="opacity-75 hover:opacity-100 transition-all hover:scale-125" src={image} alt={`Project ${name} Image ${index + 1}`} width={1200} height={300} />
                        </li>
                    ))}
                </ul>
            </div>
            <span className="block w-full border-t-2 border-gray-300 my-5"></span>
        </div>
    )
}