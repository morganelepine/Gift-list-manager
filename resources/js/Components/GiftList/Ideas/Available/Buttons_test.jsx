import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/Laravel/InputLabel";
import TextInput from "@/Components/Laravel/TextInput";

export default function Buttons({ auth, idea }) {
    const [isAvailable, setIsAvailable] = useState(idea.status);
    useEffect(() => {
        setIsAvailable(idea.status);
    }, [idea.status]);

    const handleisReserved = () => {
        setIsAvailable("reserved");
    };
    const handleisPurchased = () => {
        setIsAvailable("purchased");
    };

    const { data, setData, patch, reset } = useForm({
        status_user: auth.user.name,
        status: idea.status,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("ideas.update", idea.id), {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            {/* RESERVED BUTTON */}
            {/* <form onSubmit={submit}>
                <div className="flex items-center justify-end">
                    <InputLabel className="">Je réserve</InputLabel>
                    <TextInput
                        id="reserved"
                        name="reserved"
                        type="checkbox"
                        value={isAvailable}
                        defaultChecked={false}
                        onChange={(e) => {
                            handleisReserved();
                            setData("status", e.target.checked);
                            if (e.target.checked) {
                                submit();
                            }
                        }}
                    />
                    <TextInput
                        id="reserved"
                        name="reserved"
                        type="checkbox"
                        checked={isAvailable === "reserved"}
                        onChange={(e) => {
                            const isChecked = e.target.checked;
                            setIsAvailable(
                                isChecked ? "reserved" : "available"
                            );
                            setData(
                                "status",
                                isChecked ? "reserved" : "available"
                            );
                            submit();
                        }}
                    />
                </div>
            </form> */}

            <form onSubmit={submit}>
                <div className="flex items-center justify-end">
                    <button
                        onClick={() => {
                            setData("status", "reserved");
                        }}
                        className="mt-4"
                    >
                        Je réserve
                    </button>
                </div>
            </form>

            {/* PURCHASED BUTTON */}
            <form onSubmit={submit}>
                <div className="flex items-center justify-end">
                    <InputLabel className="">J'ai acheté</InputLabel>
                    {/* <TextInput
                        id="purchased"
                        name="purchased"
                        type="checkbox"
                        value={isAvailable}
                        defaultChecked={false}
                        onChange={(e) => {
                            handleisPurchased();
                            setData("status", e.target.checked);
                            submit();
                        }}
                    /> */}
                    <TextInput
                        id="purchased"
                        name="purchased"
                        type="checkbox"
                        checked={isAvailable === "purchased"}
                        onChange={(e) => {
                            const isChecked = e.target.checked;
                            setIsAvailable(
                                isChecked ? "purchased" : "available"
                            );
                            setData(
                                "status",
                                isChecked ? "purchased" : "available"
                            );
                            submit();
                        }}
                    />
                </div>
            </form>
        </>
    );
}

Buttons.propTypes = {
    auth: PropTypes.object.isRequired,
    idea: PropTypes.object,
};
