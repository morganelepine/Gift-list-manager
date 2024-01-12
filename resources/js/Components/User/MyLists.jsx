import { Link } from "@inertiajs/react";
import PropTypes from "prop-types";

export default function MyLists({ list }) {
    return (
        <>
            <div className="flex flex-col items center justify-between">
                {/* LIST NAME */}
                <p>
                    Ma liste{" "}
                    <span className="uppercase font-semibold text-indigo-700">
                        {list.name}
                    </span>{" "}
                </p>
                <small className="italic text-gray-500 mt-1 mb-2">
                    Créée le {list.formatted_created_at}
                </small>
            </div>

            {/* SEE BUTTON */}
            <div>
                <Link
                    as="button"
                    href={route("lists.show", list.id)}
                    className="max-w-max px-2 py-1 bg-indigo-700 border border-transparent rounded-md font-normal text-sm text-white hover:bg-indigo-900 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    Voir ma liste
                </Link>
            </div>

            {/* EDIT BUTTON */}
            <div className="mt-2">
                <Link
                    as="button"
                    href={route("ideas.create_idea", list.id)}
                    className="max-w-max px-2 py-1 bg-indigo-700 border border-transparent rounded-md font-normal text-sm text-white hover:bg-indigo-900 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    Compléter ma liste
                </Link>
            </div>

            {/* DELETE BUTTON */}
            <div>
                <Link
                    as="button"
                    href={route("lists.destroy", list.id)}
                    method="delete"
                >
                    <small className="italic mt-1">Supprimer ma liste </small>
                </Link>
            </div>
        </>
    );
}

MyLists.propTypes = {
    auth: PropTypes.object.isRequired,
    list: PropTypes.array,
};
