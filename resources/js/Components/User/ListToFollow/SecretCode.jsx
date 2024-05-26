import React from "react";
import PropTypes from "prop-types";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/Laravel/TextInput";
import InputError from "@/Components/Laravel/InputError";
import OutlineButton from "@/Components/Buttons/OutlineButton";

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
                <div className="mb-3 flex">
                    <TextInput
                        id="private_code"
                        name="private_code"
                        value={data.private_code}
                        placeholder="1234"
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
                    <OutlineButton disabled={processing} className="mt-2 ml-2">
                        Envoyer
                    </OutlineButton>
                </div>
            </form>
        </div>
    );
}

SecretCode.propTypes = {
    auth: PropTypes.object.isRequired,
    listToFollow: PropTypes.object,
};
