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
            <form onSubmit={submit}>
                <button
                    onClick={() => {
                        setData("status", "purchased");
                    }}
                    className="flex items-center justify-end text-xs text-gray-400 hover:text-indigo-700"
                    disabled={processing}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer fill-white"
                    >
                        <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <p className="block sm:hidden ml-1 mr-3">Acheter</p>
                </button>
            </form>

            <form onSubmit={submit}>
                <button
                    onClick={() => {
                        setData("status", "available");
                    }}
                    className="flex items-center justify-end text-xs text-gray-400 hover:text-red-700"
                    disabled={processing}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer fill-white"
                    >
                        <path d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <p className="block sm:hidden ml-1 mr-3">
                        Annuler la réservation
                    </p>
                </button>
            </form>
        </>
    );
}

Buttons.propTypes = {
    auth: PropTypes.object.isRequired,
    idea: PropTypes.object,
};
