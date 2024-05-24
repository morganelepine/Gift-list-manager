import React from "react";
import PropTypes from "prop-types";
import SecretCode from "@/Components/User/ListToFollow/SecretCode";
import SmallButton from "@/Components/Buttons/SmallButton";
import { useState } from "react";
import { toast } from "sonner";

export default function ListToFollow({ auth, listToFollow }) {
    // console.log("listToFollow : ", listToFollow);

    const [isHidden, setIsHidden] = useState(true);
    const showSecretCode = () => {
        setIsHidden((current) => !current);
    };

    const sendRequest = () => {
        toast.info("Demande envoyée !");
        alert("Fonctionnalité à venir !");
    };

    return (
        <>
            <div className="flex flex-col">
                <p>
                    La liste{" "}
                    <span className="uppercase font-semibold text-orange-500">
                        {listToFollow.name}
                    </span>{" "}
                    de {listToFollow.user_name}
                </p>
                <small className="italic text-gray-500 mt-1 mb-2">
                    {listToFollow.isEmpty
                        ? `Créée le ${listToFollow.formatted_created_at}`
                        : `Mise à jour le ${listToFollow.formatted_updated_at}`}
                </small>
            </div>

            <div className="space-y-5 mt-3">
                <SmallButton onClick={sendRequest}>
                    Envoyer une demande d'accès
                </SmallButton>

                <SmallButton onClick={showSecretCode}>
                    Renseiger le code secret
                </SmallButton>

                <div className={"mt-2 " + (isHidden ? "hidden" : "block")}>
                    <SecretCode listToFollow={listToFollow} auth={auth} />
                </div>
            </div>
        </>
    );
}

ListToFollow.propTypes = {
    auth: PropTypes.object.isRequired,
    listToFollow: PropTypes.object,
};
