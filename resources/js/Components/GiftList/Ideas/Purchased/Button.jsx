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
        <form onSubmit={submit}>
            <div className="flex items-center justify-end">
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
                    <p className="block sm:hidden ml-1 mr-3">Annuler l'achat</p>
                </button>
            </div>
        </form>
    );
}

Buttons.propTypes = {
    idea: PropTypes.object,
};
