import React from "react";
import { usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";

dayjs.extend(relativeTime);

export default function GiftList({ list }) {
    const { auth } = usePage().props;

    return (
        <>
            {list.user_id === auth.user.id && (
                <div className="my-1 flex items-center">
                    <div className="p-3 flex flex-1 flex-col bg-white shadow-sm rounded-lg">
                        <div className="flex flex-col">
                            <div className="flex items-center mr-10">
                                <p className="text-sm uppercase font-semibold text-gray-900 mr-4">
                                    {list.name}
                                </p>
                                <PrimaryButton className="">
                                    Consulter la liste
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
