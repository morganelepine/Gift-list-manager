import React from "react";
import { useForm } from "@inertiajs/react";
import PropTypes from "prop-types";
import InputError from "@/Components/Utils/InputError";
import InputLabel from "@/Components/Utils/InputLabel";
import TextInput from "@/Components/Utils/TextInput";
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
        <div className="p-4 bg-gradient-to-r from-orange-100 to-bordeaux-100 shadow-md rounded-xl">
            <form onSubmit={submit}>
                <div className="flex flex-col text-center w-full">
                    <InputLabel
                        htmlFor="link"
                        value="Ajouter une idée"
                        className="mb-3"
                    />
                    <div className="sm:flex">
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
                        <SmallButton
                            className="sm:ml-4 sm:mt-0 mt-3 sm:w-auto w-full"
                            disabled={processing}
                        >
                            Ajouter
                        </SmallButton>
                    </div>
                </div>
            </form>
        </div>
    );
}

CreatePrivateIdea.propTypes = {
    auth: PropTypes.object.isRequired,
    list: PropTypes.object,
};
