import { Link } from "@inertiajs/react";

export default function OneAuthList({ list }) {
    return (
        <>
            <div className="flex items center justify-between">
                {/* LIST NAME */}
                <div className="mb-2 text-lg">
                    <p className="uppercase font-semibold">{list.name}</p>
                </div>

                {/* DELETE BUTTON */}
                <div className="group relative flex justify-center">
                    {" "}
                    <Link
                        as="button"
                        href={route("lists.destroy", list.id)}
                        method="delete"
                    >
                        <svg
                            xmlns="https://www.w3.org/2000/svg"
                            className="h-7 w-7 text-gray-300 hover:text-orange-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Link>
                    <span className="absolute top-10 scale-0 transition-all rounded bg-gradient-to-r from-orange-500 to-bordeaux-500 p-2 text-xs text-center text-white group-hover:scale-100">
                        Une fois supprimée, pas de retour en arrière !
                    </span>
                </div>
            </div>

            {/* SEE BUTTON */}
            <div>
                <Link
                    as="button"
                    href={route("lists.show", list.id)}
                    className="flex items-center my-1"
                >
                    <div className="h-6 w-6 mr-2 text-white bg-gradient-to-r from-bordeaux-500 to-orange-500 flex items-center justify-center rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>
                    <p className="hover:text-orange-500">Consulter la liste</p>
                </Link>
            </div>

            {/* EDIT BUTTON */}
            <div className="mt-2">
                <Link
                    as="button"
                    href={route("ideas.create_idea", list.id)}
                    className="flex items-center my-1"
                >
                    <div className="h-6 w-6 mr-2 text-white bg-gradient-to-r from-bordeaux-500 to-orange-500 flex items-center justify-center rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.3"
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </div>
                    <p className="hover:text-orange-500">Compléter la liste</p>
                </Link>
            </div>
        </>
    );
}
