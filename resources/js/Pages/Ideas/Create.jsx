import React, { useState } from "react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/Laravel/InputError";
import InputLabel from "@/Components/Laravel/InputLabel";
import TextInput from "@/Components/Laravel/TextInput";
import Checkbox from "@/Components/Laravel/Checkbox";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import { useForm, Head, Link } from "@inertiajs/react";

export default function Create({ auth, list }) {
    const [isFavorite, setIsFavorite] = useState(1);
    const handleFavoriteCheck = () => {
        setIsFavorite((current) => !current);
    };

    const [isPromo, setIsPromo] = useState(1);
    const handlePromoCheck = () => {
        setIsPromo((current) => !current);
    };

    // console.log("list : ", list);
    // console.log("list.id : ", list.id);

    const { data, setData, post, processing, reset, errors } = useForm({
        list_id: list.id,
        user_name: auth.user.name,
        idea: "",
        brand: "",
        link: "",
        details: "",
        price: "",
        favorite: 0,
        promo: 0,
        promo_details: "",
        membership: "",
        membership_reduction: "",
        status: "available",
        status_user: "",
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("ideas.store"), {
            onSuccess: () => reset(),
            onError: (errors) => {
                console.error(errors);
            },
        });
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
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="sm:flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Compléter ma liste : {list.name}
                    </h2>
                    <Link
                        as="button"
                        href={route("lists.show", list.id)}
                        className="flex items-center mt-2 sm:mt-0"
                    >
                        <div className="h-6 w-6 mr-1 bg-orange-50 flex items-center justify-center rounded-full">
                            <svg
                                xmlns="https://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <p className="hover:text-orange-500 text-sm">
                            Consulter la liste
                        </p>
                    </Link>
                </div>
            }
        >
            <Head title="Compléter ma liste" />
            <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    {/* @csrf */}
                    <p className="text-sm italic mb-6">
                        Merci de renseigner au moins le nom de l'idée ou
                        le&nbsp;lien.
                    </p>

                    <div className="bg-white shadow-md space-y-5 p-5 rounded-xl">
                        <div className="">
                            <InputLabel htmlFor="link" value="Nom de l'idée" />
                            <TextInput
                                id="idea"
                                name="idea"
                                value={data.idea}
                                placeholder="Puzzle 500 pièces"
                                className="py-1"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("idea", e.target.value)
                                }
                                // required
                            />

                            <InputError
                                message={errors.idea}
                                className="mt-2"
                            />
                        </div>

                        <div className="">
                            <InputLabel htmlFor="link" value="Lien" />
                            <TextInput
                                id="link"
                                name="link"
                                value={data.link}
                                placeholder="https://www.fleux.com/puzzle-snowdonia-500-pieces.html"
                                className="py-1"
                                onChange={(e) =>
                                    setData("link", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.link}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex sm:flex-row flex-col w-full space-y-5 sm:space-y-0 sm:space-x-8">
                            <div className="sm:w-2/5">
                                <InputLabel htmlFor="link" value="Marque" />
                                <TextInput
                                    id="brand"
                                    name="brand"
                                    value={data.brand}
                                    placeholder="Fleux"
                                    className="py-1"
                                    onChange={(e) =>
                                        setData("brand", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.brand}
                                    className="mt-2"
                                />
                            </div>

                            <div className="sm:w-2/5">
                                <InputLabel htmlFor="link" value="Détails" />
                                <TextInput
                                    id="details"
                                    name="details"
                                    value={data.details}
                                    placeholder="Taille, coloris, quantité..."
                                    className="py-1"
                                    onChange={(e) =>
                                        setData("details", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.details}
                                    className="mt-2"
                                />
                            </div>

                            <div className="sm:w-1/5">
                                <InputLabel htmlFor="link" value="Prix" />
                                <TextInput
                                    id="price"
                                    name="price"
                                    value={data.price}
                                    placeholder="35"
                                    className="py-1"
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.price}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Checkbox
                                id="favorite"
                                name="favorite"
                                type="checkbox"
                                value={isFavorite}
                                defaultChecked={false}
                                onChange={(e) => {
                                    handleFavoriteCheck();
                                    setData("favorite", e.target.checked);
                                }}
                            />

                            <p>L'article est un coup de cœur</p>

                            <InputError
                                message={errors.favorite}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="bg-white shadow-md p-5 mt-6 rounded-xl">
                        <div
                            className="flex cursor-pointer text-orange-500 uppercase tracking-widest"
                            onClick={toggleOpenPromo}
                        >
                            Promotion
                            <svg
                                xmlns="https://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6 pl-1"
                            >
                                <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>

                        {openPromo && (
                            <div className="space-y-5">
                                <div className="flex items-center mt-3 mb-4">
                                    <Checkbox
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

                                    <p>L'article est en promo</p>

                                    <InputError
                                        message={errors.promo}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="my-2">
                                    <InputLabel
                                        htmlFor="link"
                                        value="Détails sur la promo en cours"
                                    />
                                    <TextInput
                                        id="promo_details"
                                        name="promo_details"
                                        value={data.promo_details}
                                        placeholder="Durée, conditions..."
                                        className="py-1"
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

                    <div className="bg-white shadow-md p-5 mt-6 rounded-xl">
                        <div
                            className="flex cursor-pointer text-orange-500 uppercase tracking-widest"
                            onClick={toggleOpenMembership}
                        >
                            Parrainage
                            <svg
                                xmlns="https://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6 pl-1"
                            >
                                <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>

                        {openMembership && (
                            <div className="space-y-5 mt-4">
                                <div className="my-2">
                                    <InputLabel
                                        htmlFor="link"
                                        value="Code / lien à utiliser lors de l'achat"
                                    />
                                    <TextInput
                                        id="membership"
                                        name="membership"
                                        value={data.membership}
                                        placeholder="https://snwbl.io/nebuleuse/ROXANE66244"
                                        className="py-1"
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
                                    <InputLabel
                                        htmlFor="link"
                                        value="Réduction offerte"
                                    />
                                    <TextInput
                                        id="membership_reduction"
                                        name="membership_reduction"
                                        value={data.membership_reduction}
                                        placeholder="-15%, un acheté/un offert..."
                                        className="py-1"
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
                    <PrimaryButton className="mt-8" disabled={processing}>
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
