import PropTypes from "prop-types";

export default function LinkButton({
    type = "button",
    className = "",
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                "px-4 py-1 mt-2 text-sm text-orange-500 hover:text-orange-600 underline" +
                className
            }
        >
            {children}
        </button>
    );
}

LinkButton.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};
