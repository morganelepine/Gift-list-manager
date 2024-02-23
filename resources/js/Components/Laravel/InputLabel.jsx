export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={`block text-md hover:text-indigo-800 mr-2` + className}
        >
            {value ? value : children}
        </label>
    );
}
