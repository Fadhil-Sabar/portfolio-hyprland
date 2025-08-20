export default function TextWithTooltip({ tooltip, children, className }) {
    return (
        <span className="relative group">
            <span className={`${className}`}>{children}</span>
            <span className="absolute left-1/2 transform -translate-x-1/2 top-10 z-50 mb-2 w-max p-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {tooltip}
            </span>
        </span>
    );
}