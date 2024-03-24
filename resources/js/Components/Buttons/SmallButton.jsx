export default function SmallButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `items-center px-3 py-1 bg-gradient-to-r from-bordeaux-500 to-orange-500 hover:from-orange-600 hover:to-pink-600 rounded-full text-sm text-white transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
