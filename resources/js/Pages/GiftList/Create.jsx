import React from "react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/Laravel/InputError";
import TextInput from "@/Components/Laravel/TextInput";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";

export default function Create({ auth }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        user_name: auth.user.name,
        name: "",
        private_code: "",
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("lists.store"), { onSuccess: () => reset() });
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
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            placeholder="Le nom de votre nouvelle liste (Noël, Anniversaire, Mariage...)"
                            className="block w-full py-1 mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="my-2">
                        <TextInput
                            id="private_code"
                            name="private_code"
                            value={data.private_code}
                            placeholder="Le code privé à communiquer à vos proches"
                            className="block w-full py-1 mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={(e) =>
                                setData("private_code", e.target.value)
                            }
                            required
                        />

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
