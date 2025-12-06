export default function Checkbox({ className = "", ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                "rounded border-gray-500 text-orange-600 shadow-sm focus:ring-transparent mr-2 " +
                className
            }
        />
    );
}
