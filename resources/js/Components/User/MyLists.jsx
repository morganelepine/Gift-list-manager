import { Link } from "@inertiajs/react";
import PropTypes from "prop-types";

export default function MyLists({ list }) {
    const seeButton =
        "min-w-full px-2 py-1 bg-indigo-700 border border-transparent rounded-md text-sm text-white hover:bg-indigo-900 transition ease-in-out duration-150";

    const addButton =
        "min-w-full px-2 py-1 border border-indigo-700 rounded-md text-sm text-indigo-700 hover:bg-indigo-50 hover:border-indigo-400 transition ease-in-out duration-150";

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items center">
                {/* LIST NAME */}
                <p>
                    Ma liste{" "}
                    <span className="uppercase font-semibold text-indigo-700">
                        {list.name}
                    </span>{" "}
                </p>
                <small className="italic text-gray-500 mt-1 mb-2">
                    Mise à jour le {list.formatted_updated_at}
                </small>
            </div>

            <div className="flex flex-col items-center space-y-2 max-w-max">
                {/* SEE BUTTON */}
                <Link
                    as="button"
                    href={route("lists.show", list.id)}
                    className={seeButton}
                >
                    Voir ma liste
                </Link>

                {/* EDIT BUTTON */}
                <Link
                    as="button"
                    href={route("ideas.create_idea", list.id)}
                    className={addButton}
                >
                    Compléter ma liste
                </Link>

                {/* DELETE BUTTON */}
                {/* <Link
                    as="button"
                    href={route("lists.destroy", list.id)}
                    method="delete"
                >
                    <small className="italic hover:text-indigo-600">
                        Supprimer ma liste{" "}
                    </small>
                </Link> */}
            </div>
        </div>
    );
}

MyLists.propTypes = {
    list: PropTypes.object,
};
