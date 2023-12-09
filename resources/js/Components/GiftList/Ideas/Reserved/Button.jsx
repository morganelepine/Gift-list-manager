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
        <div className="flex sm:flex-col">
            <form onSubmit={submit}>
                <button
                    onClick={() => {
                        setData("status", "purchased");
                    }}
                    className="flex items-center justify-end text-xs text-gray-400 hover:text-indigo-700"
                    disabled={processing}
                >
                    <svg
                        xmlns="https://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 cursor-pointer"
                    >
                        <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    <p className="block sm:hidden ml-1 mr-3">Acheter</p>
                </button>
            </form>

            <form onSubmit={submit}>
                <button
                    onClick={() => {
                        setData("status", "available");
                    }}
                    className="flex items-center justify-end text-xs text-gray-400 hover:text-indigo-700"
                    disabled={processing}
                >
                    <svg
                        xmlns="https://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 cursor-pointer"
                    >
                        <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    <p className="block sm:hidden ml-1 mr-3">
                        Annuler la réservation
                    </p>
                </button>
            </form>
        </div>
    );
}

Buttons.propTypes = {
    auth: PropTypes.object.isRequired,
    idea: PropTypes.object,
};
