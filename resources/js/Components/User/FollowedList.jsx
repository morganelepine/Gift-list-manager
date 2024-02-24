import React from "react";
import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";
import SmallButton from "@/Components/Buttons/SmallButton";

export default function FollowedList({ followedList }) {
    // console.log("followedList : ", followedList);

    return (
        <div className="flex flex-col items-center">
            <p>
                La liste{" "}
                <span className="uppercase font-semibold text-orange-500">
                    {followedList.name}
                </span>{" "}
                de {followedList.user_name}
            </p>
            <small className="italic text-gray-500 mt-1 mb-2">
                {followedList.isEmpty
                    ? `Créée le ${followedList.formatted_created_at}`
                    : `Mise à jour le ${followedList.formatted_updated_at}`}
            </small>
            <Link
                as="button"
                key={followedList.id}
                href={route("lists.show", followedList.id)}
            >
                <SmallButton>Voir la liste</SmallButton>
            </Link>
            {/* <Link
                as="button"
                href={route("lists.unfollowList", followedList.id)}
                method="delete"
                className="text-xs italic mt-3"
            >
                Ne plus suivre
            </Link> */}
        </div>
    );
}

FollowedList.propTypes = {
    followedList: PropTypes.object,
};
