export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block uppercase tracking-wide text-xs font-semibold ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
