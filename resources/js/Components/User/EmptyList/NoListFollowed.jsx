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
                className="inline-block text-center mt-2 px-3 py-1 bg-indigo-200 border border-transparent rounded-md font-semibold text-md text-indigo-800 hover:text-white hover:bg-indigo-500 focus:bg-indigo-900 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
                Voir les listes
            </Link>
        </div>
    );
}
