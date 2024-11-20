import React from "react";
import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";

export default function FollowedList({ followedList }) {
    // console.log("followedList : ", followedList);

    return (
        <div className="flex flex-col items-center">
            <p>
                La liste{" "}
                <span className="uppercase font-semibold text-orange-500">
                    {followedList.name}
                </span>{" "}
                de {followedList.user_name} {followedList.user_lastname}
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
                className="items-center px-3 py-1 bg-gradient-to-r from-bordeaux-500 to-orange-500 hover:from-orange-600 hover:to-pink-600 rounded-full text-sm text-white transition ease-in-out duration-150"
            >
                Voir la liste
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
