import React from "react";
import PropTypes from "prop-types";
import { Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/Laravel/TextInput";
import InputError from "@/Components/Laravel/InputError";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";

export default function ListsToFollow({ auth, listToFollow }) {
    // console.log("auth.user.id : ", auth.user.id);

    const { data, setData, post, processing, reset, errors } = useForm({
        user_id: auth.user.id,
        gift_list_id: listToFollow.id,
        private_code: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("lists.followList"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <div className="flex flex-col justify-center mt-5">
                <small className="text-center">
                    La liste de {listToFollow.user_name}
                </small>

                <Link
                    // as="button"
                    href={route("lists.show", listToFollow.id)}
                    key={listToFollow.id}
                    className="text-center mt-1 px-3 py-1 bg-indigo-200 border border-transparent rounded-md font-semibold text-md text-indigo-800 hover:text-white hover:bg-indigo-500 focus:bg-indigo-900 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    {listToFollow.name}
                </Link>
            </div>

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <p className="text-sm italic">
                        Veuillez renseigner le code secret que{" "}
                        {listToFollow.user_name} vous a communiqué
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
                        Suivre la liste de {listToFollow.user_name}
                    </PrimaryButton>
                </form>
            </div>
        </>
    );
}

ListsToFollow.propTypes = {
    auth: PropTypes.object.isRequired,
    listToFollow: PropTypes.object,
};
