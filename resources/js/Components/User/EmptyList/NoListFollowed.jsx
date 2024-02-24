import React from "react";
import { Link } from "@inertiajs/react";

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
                className="inline-block text-center mt-2 px-3 py-1 bg-orange-200 border border-transparent rounded-md font-semibold text-md text-orange-500 hover:text-white hover:bg-orange-700 active:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-700 focus:ring-offset-2 transition ease-in-out duration-150"
            >
                Voir les listes
            </Link>
        </div>
    );
}
