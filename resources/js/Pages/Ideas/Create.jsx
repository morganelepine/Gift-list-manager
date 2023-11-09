import React, { useState } from "react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/Laravel/InputError";
import InputLabel from "@/Components/Laravel/InputLabel";
import TextInput from "@/Components/Laravel/TextInput";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";

export default function Create({ auth }) {
    const [isPromo, setIsPromo] = useState(1);
    const handlePromoCheck = () => {
        setIsPromo((current) => !current);
    };
    // console.log("isPromo : ", isPromo);

    const { data, setData, post, processing, reset, errors } = useForm({
        list_id: 3,
        user_name: auth.user.name,
        idea: "",
        brand: "",
        link: "",
        details: "",
        promo: 0,
        promo_details: "",
        membership: "",
        membership_reduction: "",
        status: "available",
        status_user: 0,
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("ideas.store"), { onSuccess: () => reset() });
    };

    const [openPromo, setOpenPromo] = useState(false);
    const toggleOpenPromo = () => {
        setOpenPromo((current) => !current);
    };

    const [openMembership, setOpenMembership] = useState(false);
    const toggleOpenMembership = () => {
        setOpenMembership((current) => !current);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Compléter ma liste" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    {/* @csrf */}
                    <p className="text-sm italic mb-6">
                        Merci de renseigner au moins le nom de l'idée ou le
                        lien.
                    </p>
                    <div className="my-2">
                        <TextInput
                            id="idea"
                            name="idea"
                            value={data.idea}
                            placeholder="Le nom de l'idée"
                            className="block w-full py-1 mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            isFocused={true}
                            onChange={(e) => setData("idea", e.target.value)}
                            // required
                        />

                        <InputError message={errors.idea} className="mt-2" />
                    </div>
                    <div className="my-2">
                        <TextInput
                            id="link"
                            name="link"
                            value={data.link}
                            placeholder="Le lien"
                            className="block w-full py-1 mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={(e) => setData("link", e.target.value)}
                        />

                        <InputError message={errors.link} className="mt-2" />
                    </div>
                    <div className="my-2">
                        <TextInput
                            id="brand"
                            name="brand"
                            value={data.brand}
                            placeholder="La marque"
                            className="block w-full py-1 mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={(e) => setData("brand", e.target.value)}
                        />

                        <InputError message={errors.brand} className="mt-2" />
                    </div>
                    <div className="my-2">
                        <TextInput
                            id="details"
                            name="details"
                            value={data.details}
                            placeholder="Détails sur l'article : taille, coloris..."
                            className="block w-full py-1 mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={(e) => setData("details", e.target.value)}
                        />

                        <InputError message={errors.details} className="mt-2" />
                    </div>
                    <div>
                        <div
                            className="pt-4 flex cursor-pointer"
                            onClick={toggleOpenMembership}
                        >
                            Parainnage
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6 pl-1"
                            >
                                <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>

                        {openMembership && (
                            <div>
                                <div className="my-2">
                                    <TextInput
                                        id="membership"
                                        name="membership"
                                        value={data.membership}
                                        placeholder="Lien de parainnage à utiliser lors de l'achat"
                                        className="block w-full py-1 mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        onChange={(e) =>
                                            setData(
                                                "membership",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.membership}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="my-2">
                                    <TextInput
                                        id="membership_reduction"
                                        name="membership_reduction"
                                        value={data.membership_reduction}
                                        placeholder="Réduction offerte grâce au parainnage : -15%, un acheté un offert..."
                                        className="block w-full py-1 mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        onChange={(e) =>
                                            setData(
                                                "membership_reduction",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.membership_reduction}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <div
                            className="pt-4 flex cursor-pointer"
                            onClick={toggleOpenPromo}
                        >
                            Promotion
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6 pl-1"
                            >
                                <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>

                        {openPromo && (
                            <div>
                                <div className="flex items-center mt-3 mb-4">
                                    <TextInput
                                        id="promo"
                                        name="promo"
                                        type="checkbox"
                                        value={isPromo}
                                        defaultChecked={false}
                                        onChange={(e) => {
                                            handlePromoCheck();
                                            setData("promo", e.target.checked);
                                        }}
                                    />
                                    <InputLabel
                                        htmlFor="link"
                                        value="L'article est en promo"
                                        className="pl-2"
                                    />

                                    <InputError
                                        message={errors.promo}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="my-2">
                                    <TextInput
                                        id="promo_details"
                                        name="promo_details"
                                        value={data.promo_details}
                                        placeholder="Détails sur la promo en cours : durée, conditions..."
                                        className="block w-full py-1 mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        onChange={(e) =>
                                            setData(
                                                "promo_details",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.promo_details}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <PrimaryButton className="mt-6" disabled={processing}>
                        Ajouter l'idée
                    </PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

Create.propTypes = {
    auth: PropTypes.object.isRequired,
};
