import React, { useState } from "react";
import PropTypes from "prop-types";
import EditPrivateIdea from "@/Components/Ideas/PrivateList/EditPrivateIdea";
import Buttons from "@/Components/Ideas/Buttons";

export default function ShowPrivateIdea({ auth, idea }) {
    const [editing, setEditing] = useState(false);

    return (
        <>
            {/* EDIT & DELETE BUTTONS */}
            <div className="w-16 flex items-center">
                <Buttons idea={idea} setEditing={setEditing} />
            </div>

            {/* IDEA */}
            <div className="p-3 bg-white shadow rounded-lg w-full">
                {editing ? (
                    <EditPrivateIdea
                        auth={auth}
                        idea={idea}
                        setEditing={setEditing}
                    />
                ) : (
                    <>
                        {idea.idea && (
                            <p className="text-sm sm:uppercase font-semibold">
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
