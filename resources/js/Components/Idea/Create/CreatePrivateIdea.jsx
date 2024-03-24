import React from "react";
import { useForm } from "@inertiajs/react";
import PropTypes from "prop-types";
import InputError from "@/Components/Laravel/InputError";
import InputLabel from "@/Components/Laravel/InputLabel";
import TextInput from "@/Components/Laravel/TextInput";
import SmallButton from "@/Components/Buttons/SmallButton";

export default function CreatePrivateIdea({ auth, list }) {
    // console.log("list : ", list);

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

    return (
        <div className="p-4 bg-white shadow-md rounded-xl">
            <form onSubmit={submit} className="flex items-center">
                <div className="w-full">
                    {/* <InputLabel htmlFor="link" value="Idée cadeau" /> */}
                    <TextInput
                        id="idea"
                        name="idea"
                        value={data.idea}
                        placeholder="Puzzle 500 pièces"
                        className="py-1 mt-auto"
                        isFocused={true}
                        onChange={(e) => setData("idea", e.target.value)}
                    />

                    <InputError message={errors.idea} className="mt-2" />
                </div>
                <SmallButton className="ml-4" disabled={processing}>
                    Ajouter
                </SmallButton>
            </form>
        </div>
    );
}

CreatePrivateIdea.propTypes = {
    auth: PropTypes.object.isRequired,
    list: PropTypes.object,
};
