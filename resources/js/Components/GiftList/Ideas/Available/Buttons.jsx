import PropTypes from "prop-types";
import { useForm } from "@inertiajs/react";

export default function Buttons({ auth, idea }) {
    const { data, setData, patch, processing, reset } = useForm({
        status_user: auth.user.name,
        status: idea.status,
    });

    const submit = (e) => {
        e.preventDefault();
        if (data.status !== idea.status) {
            patch(route("ideas.update", idea.id), {
                onSuccess: () => reset(),
                onError: (errors) => {
                    console.error(errors);
                },
            });
        }
    };

    return (
        <>
            {/* RESERVED BUTTON */}
            <form onSubmit={submit}>
                <button
                    onClick={() => {
                        setData("status", "reserved");
                    }}
                    className="flex items-center justify-end text-xs hover:text-indigo-700"
                    disabled={processing}
                >
                    <svg
                        xmlns="https://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                </button>
            </form>

            {/* BUY BUTTON */}
            <form onSubmit={submit}>
                <button
                    onClick={() => {
                        setData("status", "purchased");
                    }}
                    className="flex items-center justify-end text-xs hover:text-indigo-700"
                    disabled={processing}
                >
                    <svg
                        xmlns="https://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </button>
            </form>
        </>
    );
}

Buttons.propTypes = {
    auth: PropTypes.object.isRequired,
    idea: PropTypes.object,
};
