export default function Terminal({ item, children, className }) {
    return (
        <div
            className={`flex-1
              ${item.closing ? "animate-slide-down-bounce-out" : "animate-slide-up-bounce"}
              bg-black/50 backdrop-blur-sm rounded-lg ring-4 ring-amber-500
              ${className}`}
        >
            {children}
        </div>
    );
}
