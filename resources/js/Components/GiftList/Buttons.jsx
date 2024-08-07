import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import Modal from "@/Components/Utils/Modal";

export default function EditDeleteButtons({ idea, setEditing }) {
    const { delete: destroy, processing, reset } = useForm();
    const deleteIdea = (e) => {
        e.preventDefault();
        destroy(route("ideas.destroy", idea.id), {
            onSuccess: () => {
                reset();
                toast.info("Idée supprimée");
            },
            onError: () => {
                toast.error(
                    "Oops, cette idée a déjà été réservée ou achetée..."
                );
            },
        });
    };

    const [confirmingListDeletion, setConfirmingListDeletion] = useState(false);

    const confirmListDeletion = () => {
        setConfirmingListDeletion(true);
    };

    const closeModal = () => {
        setConfirmingListDeletion(false);
    };

    return (
        <>
            {/* EDIT BUTTON */}
            <button onClick={() => setEditing(true)}>
                <svg
                    xmlns="https://www.w3.org/2000/svg"
                    className="h-6 w-6 my-2 text-gray-300 hover:text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </button>

            {/* DELETE BUTTON */}
            <button onClick={confirmListDeletion}>
                <svg
                    xmlns="https://www.w3.org/2000/svg"
                    className="h-6 w-6 my-2 text-gray-300 hover:text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>

            <Modal show={confirmingListDeletion} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium ">
                        Êtes-vous sûr·e de vouloir supprimer cette idée ?
                    </h2>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={deleteIdea}
                            method="delete"
                            className="items-center px-3 py-1 bg-gradient-to-r from-bordeaux-500 to-orange-500 hover:from-orange-600 hover:to-pink-600 rounded-full text-sm text-white transition ease-in-out duration-150"
                            disabled={processing}
                        >
                            Supprimer
                        </button>
                        <button
                            onClick={closeModal}
                            className="text-sm ml-3 hover:text-orange-500"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
