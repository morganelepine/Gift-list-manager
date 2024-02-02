import { Link } from "@inertiajs/react";
import PropTypes from "prop-types";
import ShowPrivateCode from "@/Components/GiftList/Lists/ShowPrivateCode";

export default function MyLists({ list }) {
    const seeButton =
        "min-w-full px-2 py-1 bg-indigo-700 border border-transparent rounded-md text-sm text-white hover:bg-indigo-900 transition ease-in-out duration-150";

    const addButton =
        "min-w-full px-2 py-1 border border-indigo-700 rounded-md text-sm text-indigo-700 hover:bg-indigo-50 hover:border-indigo-400 transition ease-in-out duration-150";

    return (
        <div className="relative flex items-start w-full">
            <div className="flex flex-col items-center w-full">
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

                    {/* PRIVATE CODE */}
                    <ShowPrivateCode list={list} />
                </div>
            </div>

            {/* DELETE BUTTON */}
            <div className="group absolute right-0 justify-center hidden sm:block">
                {" "}
                <Link
                    as="button"
                    href={route("lists.destroy", list.id)}
                    method="delete"
                >
                    <svg
                        xmlns="https://www.w3.org/2000/svg"
                        className="h-7 w-7 text-gray-300 hover:text-indigo-800"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </Link>
                <span className="absolute top-10 left-0 scale-0 transition-all rounded bg-indigo-900 p-2 text-xs text-center text-white group-hover:scale-100">
                    Une fois supprimée, pas de retour en arrière !
                </span>
            </div>
        </div>
    );
}

MyLists.propTypes = {
    list: PropTypes.object,
};
