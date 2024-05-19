import React, { useState } from "react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/Laravel/InputError";
import InputLabel from "@/Components/Laravel/InputLabel";
import TextInput from "@/Components/Laravel/TextInput";
import Checkbox from "@/Components/Laravel/Checkbox";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";

export default function Create({ auth }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        user_name: auth.user.name,
        name: "",
        private_code: "_private",
        isPrivate: true,
    });

    const [isHidden, setIsHidden] = useState(true);
    const [isPublicList, setIsPublicList] = useState(false);
    const handlePrivateCheck = () => {
        setIsPublicList((current) => !current);
        setIsHidden((current) => !current);
        data.private_code = "";
        // console.log({ isPublicList });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("lists.store"), {
            onSuccess: () => reset(),
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Créer une nouvelle liste
                </h2>
            }
        >
            <Head title="Créer une nouvelle liste" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    {/* @csrf */}

                    <div className="my-2">
                        <InputLabel htmlFor="link" value="Nom de la liste" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            placeholder="Noël, Anniversaire, Mariage..."
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="link"
                            value="Liste privée ou à partager"
                        />

                        <div className="mt-3 flex items-center">
                            <Checkbox
                                id="isPrivate"
                                name="isPrivate"
                                type="checkbox"
                                checked={isPublicList}
                                onChange={(e) => {
                                    handlePrivateCheck();
                                    setData("isPrivate", isPublicList);
                                }}
                            />
                            <p>Je souhaite partager cette liste</p>
                        </div>

                        <InputError
                            message={errors.isPrivate}
                            className="mt-2"
                        />
                    </div>

                    <div className={"mt-6 " + (isHidden ? "hidden" : "block")}>
                        <InputLabel htmlFor="link" value="Code privé" />
                        <TextInput
                            id="private_code"
                            name="private_code"
                            value={data.private_code}
                            placeholder="1234"
                            onChange={(e) =>
                                setData("private_code", e.target.value)
                            }
                            // required={isPrivateList} // only if list is not private
                        />
                        <p className="italic text-xs text-gray-600 mt-2">
                            Communiquez ce code à vos proches pour leur
                            permettre d'accéder à votre liste.
                        </p>

                        <InputError
                            message={errors.private_code}
                            className="mt-2"
                        />
                    </div>

                    <PrimaryButton className="mt-6" disabled={processing}>
                        Créer la liste
                    </PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

Create.propTypes = {
    auth: PropTypes.object.isRequired,
};
