import Image from "next/image";

export default function Project({ name, type, techStack, description, images, sourceCodeUrl, url }) {
    return (
        <div className="space-y-2 mb-4">
            <div className="flex">
                <span className="w-[15%] font-semibold">Project Name:</span>
                <span>{name}</span>
            </div>
            <div className="flex">
                <span className="w-[15%] font-semibold">Project Type:</span>
                <span>{type}</span>
            </div>
            <div className="flex">
                <span className="w-[15%] font-semibold">Tech Stack:</span>
                <span>{techStack}</span>
            </div>
            <div className="flex">
                <span className="w-[15%] font-semibold">Description:</span>
                <div className="w-[85%]">
                    {description}
                </div>
            </div>
            {
                sourceCodeUrl && (
                    <div className="flex">
                        <span className="w-[15%] font-semibold">Source Code:</span>
                        <span className="w-[85%]">
                            <a href={sourceCodeUrl} className="underline">{sourceCodeUrl}</a>
                        </span>
                    </div>
                )
            }
            {
                url && (
                    <div className="flex">
                        <span className="w-[15%] font-semibold">Project URL:</span>
                        <span className="w-[85%]">
                            <a href={url} className="underline">{url}</a>
                        </span>
                    </div>
                )
            }
            <div className="flex">
                <span className="w-[15%] font-semibold">Images:</span>
                <ul className="space-y-2">
                    {images.map((image, index) => (
                        <li key={index}>
                            <Image src={image} alt={`Project ${name} Image ${index + 1}`} width={1200} height={300} />
                        </li>
                    ))}
                </ul>
            </div>
            <span className="block w-full border-t-2 border-gray-300 my-5"></span>
        </div>
    )
}