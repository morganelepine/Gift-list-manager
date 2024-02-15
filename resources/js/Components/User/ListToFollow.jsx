import React from "react";
import PropTypes from "prop-types";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/Laravel/TextInput";
import InputError from "@/Components/Laravel/InputError";
import SmallButton from "@/Components/Buttons/SmallButton";
export default function ListToFollow({ auth, listToFollow }) {
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
            <div className="flex flex-col">
                <p>
                    La liste{" "}
                    <span className="uppercase font-semibold text-indigo-700">
                        {listToFollow.name}
                    </span>{" "}
                    de {listToFollow.user_name}
                </p>
                <small className="italic text-gray-500 mt-1 mb-2">
                    {listToFollow.isEmpty
                        ? `Créée le ${listToFollow.formatted_created_at}`
                        : `Mise à jour le ${listToFollow.formatted_updated_at}`}
                </small>
                {/* <Link
                    // as="button"
                    href={route("lists.show", listToFollow.id)}
                    key={listToFollow.id}
                    className="text-center mt-1 px-3 py-1 bg-indigo-200 border border-transparent rounded-md font-semibold text-md text-indigo-800 hover:text-white hover:bg-indigo-500 focus:bg-indigo-900 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    {listToFollow.name}
                </Link> */}
            </div>

            <div className="max-w-2xl mx-auto mt-3">
                <form onSubmit={submit}>
                    <p className="text-sm italic flex flex-wrap">
                        Veuillez renseigner le code secret <br></br> que{" "}
                        {listToFollow.user_name} vous a communiqué
                    </p>

                    <div className="my-3">
                        <TextInput
                            id="private_code"
                            name="private_code"
                            value={data.private_code}
                            placeholder="Le code secret"
                            className="w-52 py-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
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

                    <SmallButton disabled={processing}>
                        Suivre la liste
                    </SmallButton>
                </form>
            </div>
        </>
    );
}

ListToFollow.propTypes = {
    auth: PropTypes.object.isRequired,
    listToFollow: PropTypes.object,
};
