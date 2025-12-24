export default function ProgressBar({ progress }) {
    return (
        <div className="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 z-10">
            <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            >
                <span className="text-transparent">------------------------------------------------</span>
            </div>
        </div>
    );
}