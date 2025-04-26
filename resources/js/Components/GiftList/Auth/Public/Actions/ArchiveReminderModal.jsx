import PropTypes from "prop-types";
import Modal from "@/Components/Utils/Modal";
import SmallButton from "@/Components/Buttons/SmallButton";
import { toast } from "sonner";
import { useForm } from "@inertiajs/react";

export default function ArchiveReminderModal({
    list,
    modalVisible,
    closeModal,
}) {
    const { patch, reset } = useForm();

    const archiveList = (e) => {
        e.preventDefault();
        patch(route("lists.archive", list), {
            onSuccess: () => {
                localStorage.removeItem(`archive-reminder-${list.id}`);
                closeModal();
            },
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

    return (
        <Modal show={modalVisible} onClose={closeModal}>
            <button
                onClick={closeModal}
                className="text-sm hover:text-orange-500 absolute top-2 right-2"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 28 28"
                    stroke="currentColor"
                    className="h-8 w-8"
                >
                    <path d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
            <div className="py-8 px-10 text-center">
                <p className="text-gray-600 font-bold">
                    L'événement est passé ?
                </p>
                <p className="text-gray-600 font-bold">
                    Pensez à archiver votre liste !
                </p>
                <p className="text-gray-600 mt-4">
                    Tous les cadeaux qui vous ont été offerts seront retirés de
                    la liste. Mais pas d'inquiétude, les idées toujours
                    disponibles resteront bien affichées dans votre liste.
                </p>
                <div className="mt-4 flex justify-center">
                    <SmallButton onClick={archiveList}>
                        Archiver la liste
                    </SmallButton>
                </div>
            </div>
        </Modal>
    );
}

ArchiveReminderModal.propTypes = {
    list: PropTypes.object.isRequired,
    modalVisible: PropTypes.bool,
    closeModal: PropTypes.func,
};
