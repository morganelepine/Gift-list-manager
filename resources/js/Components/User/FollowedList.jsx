import React from "react";
import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";

export default function FollowedList({ followedList }) {
    // console.log("followedList : ", followedList);

    return (
        <div className="flex flex-col items-center">
            <p>
                La liste{" "}
                <span className="uppercase font-semibold text-indigo-700">
                    {followedList.name}
                </span>{" "}
                de {followedList.user_name}
            </p>
            <small className="italic text-gray-500 mt-1 mb-2">
                Mise à jour le {followedList.formatted_updated_at}
            </small>
            <Link
                as="button"
                key={followedList.id}
                href={route("lists.show", followedList.id)}
                className="max-w-max px-2 py-1 bg-indigo-700 border border-transparent rounded-md font-normal text-sm text-white hover:bg-indigo-900 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
                Voir la liste
            </Link>
        </div>
    );
}

FollowedList.propTypes = {
    followedList: PropTypes.object,
};
