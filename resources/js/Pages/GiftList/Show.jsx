import React from "react";
import PropTypes from "prop-types";
import AuthList from "@/Components/GiftList/Auth/Public/AuthList";
import AuthPrivateList from "@/Components/GiftList/Auth/Private/AuthPrivateList";
import UserList from "@/Components/GiftList/User/List/UserList";
import PrivateCodeList from "@/Components/GiftList/User/ListToFollow/PrivateCodeList";

export default function Show({
    auth,
    list,
    ideas,
    ideas_available,
    ideas_reserved,
    ideas_purchased,
    followedLists,
}) {
    const listIsFollowed = followedLists.some(
        (followedList) => followedList.gift_list_id === list.id
    );

    const isConnectedUser = list.user_id === auth.user.id;

    const isPrivateList = list.isPrivate === 1;
    const isSharedList = list.isPrivate === 0;

    return (
        <div>
            {isConnectedUser && isSharedList && (
                <AuthList
                    auth={auth}
                    list={list}
                    ideas={ideas}
                    ideas_available={ideas_available}
                />
            )}

            {isConnectedUser && isPrivateList && (
                <AuthPrivateList auth={auth} list={list} ideas={ideas} />
            )}

            {!isConnectedUser && listIsFollowed && (
                <UserList
                    auth={auth}
                    list={list}
                    ideas_available={ideas_available}
                    ideas_reserved={ideas_reserved}
                    ideas_purchased={ideas_purchased}
                />
            )}

            {!isConnectedUser && !listIsFollowed && (
                <PrivateCodeList auth={auth} list={list} />
            )}
        </div>
    );
}

Show.propTypes = {
    auth: PropTypes.object.isRequired,
    list: PropTypes.object,
    ideas: PropTypes.array,
    ideas_available: PropTypes.array,
    ideas_reserved: PropTypes.array,
    ideas_purchased: PropTypes.array,
    followedLists: PropTypes.array,
};
