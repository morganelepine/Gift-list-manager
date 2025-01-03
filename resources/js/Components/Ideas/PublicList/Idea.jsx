import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import IdeaShow from "@/Components/Ideas/PublicList/IdeaShow";
import IdeaEdit from "@/Components/Ideas/PublicList/IdeaEdit";
import Buttons from "@/Components/Ideas/Buttons";

dayjs.extend(relativeTime);

export default function Ideas({ brand, idea }) {
    const { auth } = usePage().props;

    const [editing, setEditing] = useState(false);

    return (
        <div className="sm:space-y-3 sm:flex items-center sm:mb-0 mb-3">
            {/* EDIT & DELETE BUTTONS */}
            <div className="flex items-center w-16">
                <Buttons idea={idea} setEditing={setEditing} />
            </div>

            {/* IDEA */}
            <div className="p-3 flex flex-1 flex-col bg-white shadow rounded-lg">
                {editing ? (
                    <IdeaEdit auth={auth} idea={idea} setEditing={setEditing} />
                ) : (
                    <IdeaShow idea={idea} brand={brand} />
                )}
            </div>
        </div>
    );
}
