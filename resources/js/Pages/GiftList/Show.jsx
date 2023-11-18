import React from "react";
import PropTypes from "prop-types";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AuthList from "@/Components/GiftList/AuthList";
import UserList from "@/Components/GiftList/UserList";
import PrivateList from "@/Components/GiftList/PrivateList";

export default function Show({ auth, list, ideas, followedLists }) {
    // console.log("followedLists : ", followedLists);

    const isFollowed = followedLists.some(
        (followedList) => followedList.gift_list_id === list.id
    );

    return (
        <div>
            {list.user_id === auth.user.id ? (
                <AuthList auth={auth} list={list} ideas={ideas} />
            ) : isFollowed ? (
                <UserList auth={auth} list={list} ideas={ideas} />
            ) : (
                <PrivateList auth={auth} list={list} />
            )}
        </div>
    );
}

Show.propTypes = {
    auth: PropTypes.object.isRequired,
    list: PropTypes.object,
    ideas: PropTypes.array,
};
