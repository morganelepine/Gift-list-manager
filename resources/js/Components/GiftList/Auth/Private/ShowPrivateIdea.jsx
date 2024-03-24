import React, { useState } from "react";
import PropTypes from "prop-types";
import EditPrivateIdea from "@/Components/GiftList/Auth/Private/EditPrivateIdea";
import Buttons from "@/Components/GiftList/Buttons";

export default function ShowPrivateIdea({ auth, idea }) {
    const [editing, setEditing] = useState(false);

    return (
        <>
            {/* EDIT & DELETE BUTTONS */}
            <div className="flex items-center w-16">
                <Buttons idea={idea} setEditing={setEditing} />
            </div>

            {/* IDEA */}
            <div className="p-3 flex flex-1 flex-col bg-white shadow rounded-lg">
                {editing ? (
                    <EditPrivateIdea
                        auth={auth}
                        idea={idea}
                        setEditing={setEditing}
                    />
                ) : (
                    <>
                        {idea.idea && (
                            <p className="text-sm sm:uppercase font-semibold  mr-2 mb-1 sm:mb-0 sm:mr-4">
                                {idea.idea}
                            </p>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

ShowPrivateIdea.propTypes = {
    auth: PropTypes.object.isRequired,
    ideas: PropTypes.array,
};
