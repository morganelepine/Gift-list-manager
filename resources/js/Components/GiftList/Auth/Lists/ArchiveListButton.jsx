import { useState } from "react";
import { useForm } from "@inertiajs/react";
import PropTypes from "prop-types";
import Modal from "@/Components/Utils/Modal";
import { toast } from "sonner";
import SmallButton from "@/Components/Buttons/SmallButton";

export default function ArchiveListButton({ list }) {
    const [confirmingListArchiving, setConfirmingListArchiving] =
        useState(false);

    const confirmListArchiving = () => {
        setConfirmingListArchiving(true);
    };

    const { patch, reset } = useForm();
    const archiveList = (e) => {
        e.preventDefault();
        patch(route("lists.archive", list), {
            onSuccess: () => closeModal(),
            onError: (errors) => {
                console.error(
                    "Erreur lors de l'archivage de la liste :",
                    errors
                );
            },
            onFinish: () => reset(),
        });
        toast.success("Liste archivée !");
    };

    const closeModal = () => {
        setConfirmingListArchiving(false);
        reset();
    };

    return (
        <>
            <button
                onClick={confirmListArchiving}
                className="flex items-center mr-5 hover:text-orange-500"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5  mr-1"
                >
                    <path d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
                <p className="text-sm">Archiver la liste</p>
            </button>

            <Modal show={confirmingListArchiving} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium ">
                        Êtes-vous sûr·e de vouloir archiver cette liste ?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Une fois la liste archivée, toutes les idées qui vous
                        ont été offertes seront définitivement supprimées de
                        votre liste.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={closeModal}
                            className="text-sm mr-3 hover:text-orange-500"
                        >
                            Annuler
                        </button>
                        <SmallButton onClick={archiveList}>
                            Archiver la liste
                        </SmallButton>
                    </div>
                </div>
            </Modal>
        </>
    );
}

ArchiveListButton.propTypes = {
    list: PropTypes.object,
};
