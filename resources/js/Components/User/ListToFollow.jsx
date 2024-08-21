import { useState } from "react";
import PropTypes from "prop-types";
import SecretCode from "@/Components/User/ListToFollow/SecretCode";
import SmallButton from "@/Components/Buttons/SmallButton";
import { toast } from "sonner";

export default function ListToFollow({ auth, listToFollow, token }) {
    // console.log("listToFollow : ", listToFollow);

    const [isHidden, setIsHidden] = useState(true);
    const showSecretCode = () => {
        setIsHidden((current) => !current);
    };

    const requestAccess = async (listOwnerId, listId) => {
        try {
            const url = `/notifications/request-access/${listOwnerId}/${listId}`;
            const settings = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token,
                },
            };
            const response = await fetch(url, settings);

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                toast.success("Demande envoyée !");
            } else {
                console.error(
                    "Error while sending the request:",
                    response.statusText
                );
                toast.error(
                    "Oops... votre demande n'a pas été envoyée. Veuillez réessayez après avoir rechargé la page."
                );
            }
        } catch (error) {
            console.error("Error while sending the request:", error);
        }
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
                <SmallButton
                    onClick={() =>
                        requestAccess(listToFollow.user_id, listToFollow.id)
                    }
                >
                    Demander un accès
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
