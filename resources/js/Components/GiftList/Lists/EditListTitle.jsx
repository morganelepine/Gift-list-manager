import PropTypes from "prop-types";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/Laravel/InputError";

export default function EditListTitle({ list, setEditing }) {
    // console.log("idea.promo : ", idea.promo);

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        name: list.name,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("lists.update", list.id), {
            onSuccess: () => setEditing(false),
        });
    };

    return (
        <div className="sm:flex items-center">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight mr-3">
                Ma liste
            </h2>
            <form onSubmit={submit} className="flex items-center sm:py-0 py-3">
                <div>
                    <input
                        id="name"
                        name="name"
                        value={data.name}
                        placeholder="Le nom votre liste"
                        className="py-1 px-2 block border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("name", e.target.value)}
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="space-x-2">
                    <button className="ml-3 hover:text-indigo-600">
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
                        className="ml-3 text-sm italic hover:text-red-700"
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
        </div>
    );
}

EditListTitle.propTypes = {
    list: PropTypes.object,
    setEditing: PropTypes.func,
};
