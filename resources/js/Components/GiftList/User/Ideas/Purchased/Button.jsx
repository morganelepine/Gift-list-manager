import PropTypes from "prop-types";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

export default function Buttons({ idea }) {
    //Remove idea from table PURCHASED
    const { delete: destroy, processing, reset } = useForm();
    const cancelPurchase = (e) => {
        e.preventDefault();
        destroy(route("ideas.cancelReserveOrPurchase", idea.id), {
            onSuccess: () => reset(),
        });
        toast.info("Achat annulé");
    };

    return (
        <form onSubmit={cancelPurchase}>
            <button
                className="flex items-center justify-end text-xs text-gray-400 hover:text-indigo-500"
                disabled={processing}
                title="Annuler l'achat"
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
                <p className="block sm:hidden ml-1 mr-3">Annuler l'achat</p>
            </button>
        </form>
    );
}

Buttons.propTypes = {
    idea: PropTypes.object,
    id: PropTypes.number,
};
