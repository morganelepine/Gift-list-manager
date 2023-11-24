import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/Laravel/InputLabel";
import TextInput from "@/Components/Laravel/TextInput";

export default function AdminButtons({ idea }) {
    const [isAvailable, setIsAvailable] = useState(idea.status);
    const handleisReserved = () => {
        setIsAvailable("reserved");
    };
    const handleisPurchased = () => {
        setIsAvailable("purchased");
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
        <>
            {/* RESERVED BUTTON */}
            <form onSubmit={submit}>
                <div className="flex items-center justify-end">
                    <InputLabel className="">Je réserve</InputLabel>
                    <TextInput
                        id="reserved"
                        name="reserved"
                        type="checkbox"
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

            {/* PURCHASED BUTTON */}
            <form onSubmit={submit}>
                <div className="flex items-center justify-end">
                    <InputLabel className="">J'ai acheté</InputLabel>
                    <TextInput
                        id="purchased"
                        name="purchased"
                        type="checkbox"
                        value={data.status}
                        defaultChecked={false}
                        onChange={(e) => {
                            handleisPurchased();
                            setData("status", e.target.checked);
                            form.submit();
                        }}
                    />
                </div>
            </form>
        </>
    );
}

AdminButtons.propTypes = {
    idea: PropTypes.object,
};
