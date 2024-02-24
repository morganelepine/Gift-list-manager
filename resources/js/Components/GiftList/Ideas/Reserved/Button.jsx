import PropTypes from "prop-types";
import { useForm } from "@inertiajs/react";

export default function Buttons({ id, idea }) {
    //Copy idea in table PURCHASED
    const { post, delete: destroy, processing, reset } = useForm();
    const purchaseIdea = (e) => {
        e.preventDefault();
        post(route("ideas.purchase", idea.id), {
            onSuccess: () => reset(),
        });
    };

    //Remove idea from table RESERVED
    const cancelReserve = (e) => {
        e.preventDefault();
        destroy(route("ideas.cancelReserve", id), {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <form onSubmit={purchaseIdea}>
                <button
                    className="flex items-center justify-end text-xs text-gray-400 hover:text-bordeaux-800"
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

            <form onSubmit={cancelReserve}>
                <button
                    className="flex items-center justify-end text-xs text-gray-400 hover:text-bordeaux-800"
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
    idea: PropTypes.object,
    id: PropTypes.number,
};
