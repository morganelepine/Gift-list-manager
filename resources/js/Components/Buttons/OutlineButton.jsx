export default function OutlineButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `items-center px-3 py-1 rounded-md text-sm border border-orange-300 text-orange-500 hover:bg-orange-50 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
