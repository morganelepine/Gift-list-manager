import React from "react";
import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";

export default function FollowedList({ followedList }) {
    // console.log("followedList : ", followedList);

    return (
        <div className="flex flex-col justify-center mt-5">
            <small className="text-center">
                La liste de {followedList.user_id}
            </small>
            <Link
                as="button"
                key={followedList.id}
                href={route("users.show", followedList.user_id)}
                className="text-center mt-1 px-3 py-1 bg-indigo-200 border border-transparent rounded-md font-semibold text-md text-indigo-800 hover:text-white hover:bg-indigo-500 focus:bg-indigo-900 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
                {followedList.name}
            </Link>
        </div>
    );
}

FollowedList.propTypes = {
    followedList: PropTypes.object,
};
