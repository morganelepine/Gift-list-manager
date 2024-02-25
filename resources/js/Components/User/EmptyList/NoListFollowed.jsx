import React from "react";
import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";

export default function NoListFollowed() {
    return (
        <div className="text-center">
            <p>
                Vous ne suivez pas encore de liste. <br></br>
                Cliquez sur ce bouton pour découvrir les listes
                disponibles&nbsp;!
            </p>

            <Link
                href={route("lists.listsToFollow")}
                active={route().current("lists.listsToFollow")}
            >
                <PrimaryButton className="mt-3">Voir les listes</PrimaryButton>
            </Link>
        </div>
    );
}
