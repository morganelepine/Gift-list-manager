import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/Laravel/TextInput";
import InputLabel from "@/Components/Laravel/InputLabel";
import InputError from "@/Components/Laravel/InputError";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";

export default function IdeaEdit({ auth, idea, setEditing }) {
    // console.log("idea.promo : ", idea.promo);

    const [isFavorite, setIsFavorite] = useState(idea.favorite);
    const handleFavoriteCheck = () => {
        setIsFavorite((current) => !current);
    };

    const [isPromo, setIsPromo] = useState(idea.promo);
    const handlePromoCheck = () => {
        setIsPromo((current) => !current);
    };

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        user_name: auth.user.id,
        idea: idea.idea,
        brand: idea.brand,
        link: idea.link,
        details: idea.details,
        price: idea.price,
        favorite: idea.favorite,
        membership: idea.membership,
        membership_reduction: idea.membership_reduction,
        promo: idea.promo,
        promo_details: idea.promo_details,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("ideas.update", idea.id), {
            onSuccess: () => setEditing(false),
        });
    };

    return (
        <form onSubmit={submit}>
            <div className="space-y-2">
                <div>
                    <TextInput
                        id="idea"
                        name="idea"
                        value={data.idea}
                        placeholder="Le nom de l'idée"
                        className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        isFocused={true}
                        onChange={(e) => setData("idea", e.target.value)}
                    />

                    <InputError message={errors.idea} className="mt-2" />
                </div>
                <div>
                    <TextInput
                        id="brand"
                        name="brand"
                        value={data.brand}
                        placeholder="La marque"
                        className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("brand", e.target.value)}
                    />

                    <InputError message={errors.brand} className="mt-2" />
                </div>
                <div>
                    <TextInput
                        id="link"
                        name="link"
                        value={data.link}
                        placeholder="Le lien"
                        className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("link", e.target.value)}
                    />

                    <InputError message={errors.link} className="mt-2" />
                </div>
                <div>
                    <TextInput
                        id="details"
                        name="details"
                        value={data.details}
                        placeholder="Des détails sur l'article : taille, coloris..."
                        className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("details", e.target.value)}
                    />

                    <InputError message={errors.details} className="mt-2" />
                </div>
                <div>
                    <TextInput
                        id="price"
                        name="price"
                        value={data.price}
                        placeholder="Le prix (chiffre rond : 34,99 = 35)"
                        className="block w-full py-1 mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("price", e.target.value)}
                    />

                    <InputError message={errors.price} className="mt-2" />
                </div>
                <div className="flex items-center mt-3 mb-4">
                    <TextInput
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
                    <InputLabel
                        htmlFor="link"
                        value="L'article est un coup de cœur"
                        className="pl-2"
                    />
                    <InputError message={errors.favorite} className="mt-2" />
                </div>
                <div className="flex items-center mt-3 mb-4">
                    <TextInput
                        id="promo"
                        name="promo"
                        type="checkbox"
                        value={isPromo}
                        defaultChecked={isPromo}
                        onChange={(e) => {
                            handlePromoCheck();
                            setData("promo", e.target.checked);
                        }}
                    />
                    <InputLabel htmlFor="link" value="L'article est en promo" />
                    <InputError message={errors.promo} className="mt-2" />
                </div>
                <div>
                    <TextInput
                        id="promo_details"
                        name="promo_details"
                        value={data.promo_details}
                        placeholder="Des détails sur la promo en cours : durée, conditions..."
                        className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) =>
                            setData("promo_details", e.target.value)
                        }
                    />

                    <InputError
                        message={errors.promo_details}
                        className="mt-2"
                    />
                </div>
                <div>
                    <TextInput
                        id="membership"
                        name="membership"
                        value={data.membership}
                        placeholder="Code / lien de parrainage"
                        className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("membership", e.target.value)}
                    />
                    <InputError message={errors.membership} className="mt-2" />
                </div>
                <div>
                    <TextInput
                        id="membership_reduction"
                        name="membership_reduction"
                        value={data.membership_reduction}
                        placeholder="Réduction offerte grâce au parrainage : -15%, un acheté un offert..."
                        className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) =>
                            setData("membership_reduction", e.target.value)
                        }
                    />
                    <InputError
                        message={errors.membership_reduction}
                        className="mt-2"
                    />
                </div>
            </div>
            <div className="space-x-2">
                <PrimaryButton className="mt-4">Save</PrimaryButton>
                <button
                    className="mt-4"
                    onClick={() => {
                        setEditing(false);
                        reset();
                        clearErrors();
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

IdeaEdit.propTypes = {
    auth: PropTypes.object.isRequired,
    idea: PropTypes.object,
    setEditing: PropTypes.func,
};
