import React from "react";
import PropTypes from "prop-types";
import AuthList from "@/Components/GiftList/AuthList";
import UserList from "@/Components/GiftList/UserList";
import PrivateList from "@/Components/GiftList/PrivateList";

export default function Show({
    auth,
    list,
    ideas,
    ideas_available,
    ideas_reserved,
    ideas_purchased,
    followedLists,
}) {
    // console.log("followedLists : ", followedLists);

    const listIsFollowed = followedLists.some(
        (followedList) => followedList.gift_list_id === list.id
    );

    const isConnectedUser = list.user_id === auth.user.id;

    return (
        <div>
            {isConnectedUser ? (
                <AuthList auth={auth} list={list} ideas={ideas} />
            ) : listIsFollowed ? (
                <UserList
                    auth={auth}
                    list={list}
                    ideas={ideas}
                    ideas_available={ideas_available}
                    ideas_reserved={ideas_reserved}
                    ideas_purchased={ideas_purchased}
                />
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
    followedLists: PropTypes.array,
};
