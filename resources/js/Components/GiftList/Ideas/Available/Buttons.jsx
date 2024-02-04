import PropTypes from "prop-types";
import { useForm } from "@inertiajs/react";

export default function Buttons({ idea }) {
    const { post, processing, reset } = useForm();

    //Copy idea in table RESERVED
    const reserveIdea = (e) => {
        e.preventDefault();
        post(route("ideas.reserve", idea.id), {
            onSuccess: () => reset(),
        });
    };

    //Copy idea in table PURCHASED
    const purchaseIdea = (e) => {
        e.preventDefault();
        post(route("ideas.purchase", idea.id), {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            {/* RESERVED BUTTON */}
            <form onSubmit={reserveIdea}>
                <button
                    className="flex items-center justify-end text-xs text-gray-400 hover:text-indigo-700"
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
                    <p className="block sm:hidden ml-1 mr-3">Réserver</p>
                </button>
            </form>

            {/* BUY BUTTON */}
            <form onSubmit={purchaseIdea}>
                <button
                    className="flex items-center justify-end text-xs text-gray-400 hover:text-indigo-700"
                    disabled={processing}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 cursor-pointer"
                    >
                        <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <p className="block sm:hidden ml-1 mr-5">Acheter</p>
                </button>
            </form>
        </>
    );
}

Buttons.propTypes = {
    idea: PropTypes.object,
};
