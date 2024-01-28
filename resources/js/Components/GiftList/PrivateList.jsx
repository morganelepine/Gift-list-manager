import React from "react";
import PropTypes from "prop-types";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/Laravel/TextInput";
import InputError from "@/Components/Laravel/InputError";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";

export default function PrivateList({ auth, list }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        user_id: auth.user.id,
        gift_list_id: list.id,
        private_code: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("lists.followList"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        La liste "{list.name}" de {list.user_name}
                    </h2>
                </div>
            }
        >
            <Head title="Accès refusé" />
            <div className="max-w-4xl mx-auto pb-14 px-4 mt-6">
                <div className="flex items-center justify-center">
                    <form onSubmit={submit}>
                        <p className="text-sm italic">
                            Veuillez renseigner le code communiqué par{" "}
                            {list.user_name} pour accéder à sa liste "
                            {list.name}"
                        </p>

                        <div className="my-3">
                            <TextInput
                                id="private_code"
                                name="private_code"
                                value={data.private_code}
                                placeholder="Le code secret"
                                className="block w-full py-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                isFocused={true}
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

                        <PrimaryButton className="" disabled={processing}>
                            Suivre la liste de {list.user_name}
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

PrivateList.propTypes = {
    auth: PropTypes.object.isRequired,
    list: PropTypes.object,
};
