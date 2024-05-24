import React from "react";
import PropTypes from "prop-types";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/Laravel/TextInput";
import InputError from "@/Components/Laravel/InputError";
import SmallButton from "@/Components/Buttons/SmallButton";

export default function SecretCode({ auth, listToFollow }) {
    // console.log("listToFollow : ", listToFollow);

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
        <div className="mt-2 flex flex-col items-center">
            <p className="text-sm text-center italic">
                Veuillez renseigner le code secret <br></br> que{" "}
                {listToFollow.user_name} vous a communiqué
            </p>
            <form onSubmit={submit}>
                <div className="my-3">
                    <TextInput
                        id="private_code"
                        name="private_code"
                        value={data.private_code}
                        placeholder="Le code secret"
                        className="w-52 py-1 text-center"
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

                <SmallButton disabled={processing}>Suivre la liste</SmallButton>
            </form>
        </div>
    );
}

SecretCode.propTypes = {
    auth: PropTypes.object.isRequired,
    listToFollow: PropTypes.object,
};
