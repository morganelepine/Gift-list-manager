import { useRef, useState } from "react";
import DangerButton from "@/Components/Buttons/DangerButton";
import InputError from "@/Components/Laravel/InputError";
import InputLabel from "@/Components/Laravel/InputLabel";
import Modal from "@/Components/Laravel/Modal";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import TextInput from "@/Components/Laravel/TextInput";
import { useForm } from "@inertiajs/react";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium ">Supprimer mon compte</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Une fois votre compte supprimé, toutes vos listes et données
                    seront définitivement supprimées.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                Supprimer mon compte
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium ">
                        Êtes-vous sûr·e de vouloir supprimer votre compte ?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Une fois votre compte supprimé, toutes vos listes et
                        données seront définitivement supprimées.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Mot de passe"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Annuler
                        </SecondaryButton>
                        <DangerButton className="ml-3" disabled={processing}>
                            Supprimer mon compte
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
