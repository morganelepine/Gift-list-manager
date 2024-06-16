export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-gradient-to-r from-bordeaux-500 to-orange-500 hover:from-orange-600 hover:to-pink-600 rounded-full text-white transition ease-in-out duration-150 ${
                    // `inline-flex items-center  px-4 py-2 bg-indigo-500 hover:from-indigo-600 rounded-full text-white transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
