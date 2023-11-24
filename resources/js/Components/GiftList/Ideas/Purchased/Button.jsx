import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/Laravel/TextInput";

export default function AdminButtons({ idea }) {
    const [isAvailable, setIsAvailable] = useState(idea.status);
    const handleisReserved = () => {
        setIsAvailable("reserved");
    };

    const { data, setData, patch } = useForm({
        status: isAvailable,
    });
    const submit = (e) => {
        // e.preventDefault();
        patch(route("ideas.update", idea.id), {
            // onSuccess: () => setEditing(false),
        });
    };

    return (
        <form onSubmit={submit}>
            <div className="flex items-center justify-end">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                >
                    <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                <TextInput
                    id="reserved"
                    name="reserved"
                    type="hidden"
                    value={data.status}
                    defaultChecked={false}
                    onChange={(e) => {
                        handleisReserved();
                        setData("status", e.target.checked);
                        if (e.target.checked) {
                            submit();
                        }
                    }}
                />
            </div>
        </form>
    );
}

AdminButtons.propTypes = {
    idea: PropTypes.object,
};
