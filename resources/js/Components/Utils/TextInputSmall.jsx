import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                // "border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm " +
                "border-gray-300 rounded-md shadow-sm py-1 px-2 " + className
            }
            ref={input}
        />
    );
});
