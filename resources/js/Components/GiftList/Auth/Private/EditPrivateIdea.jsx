import PropTypes from "prop-types";
import { useForm } from "@inertiajs/react";
import TextInputSmall from "@/Components/Laravel/TextInputSmall";
import InputError from "@/Components/Laravel/InputError";
import SmallButton from "@/Components/Buttons/SmallButton";

export default function IdeaPrivateEdit({ auth, idea, setEditing }) {
    // console.log("idea.promo : ", idea.promo);

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
            <div className="flex items-center">
                <div className="w-full">
                    <TextInputSmall
                        id="idea"
                        name="idea"
                        value={data.idea}
                        placeholder="Votre idée"
                        className="w-full border-gray-300 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        isFocused={true}
                        onChange={(e) => setData("idea", e.target.value)}
                    />
                    <InputError message={errors.idea} className="mt-2" />
                </div>
                <button className="hover:text-orange-600 ml-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </button>
                <button
                    className="text-sm italic hover:text-orange-500 ml-3"
                    onClick={() => {
                        setEditing(false);
                        reset();
                        clearErrors();
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </form>
    );
}

IdeaPrivateEdit.propTypes = {
    auth: PropTypes.object.isRequired,
    idea: PropTypes.object,
    setEditing: PropTypes.func,
};
