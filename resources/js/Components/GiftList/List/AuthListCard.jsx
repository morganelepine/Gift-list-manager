import { Link } from "@inertiajs/react";
import PropTypes from "prop-types";
import ShowPrivateCode from "@/Components/GiftList/Auth/Lists/ShowPrivateCode";
import DeleteListButton from "@/Components/GiftList/Auth/Lists/DeleteListButton";
import SmallButton from "@/Components/Buttons/SmallButton";

export default function AuthListCard({ list }) {
    const isSharedList = list.isPrivate === 0;

    return (
        <div className="relative flex items-start w-full">
            <div className="flex flex-col items-center w-full">
                <div className="flex flex-col items center">
                    {/* LIST NAME */}
                    <p>
                        Ma liste{" "}
                        <span className="uppercase font-semibold text-orange-500">
                            {list.name}
                        </span>{" "}
                    </p>
                    <small className="italic text-gray-500 mt-1 mb-2">
                        {list.isEmpty
                            ? `Créée le ${list.formatted_created_at}`
                            : `Mise à jour le ${list.formatted_updated_at}`}
                    </small>{" "}
                </div>

                <div className="flex flex-col items-center space-y-2 max-w-max">
                    {/* SEE BUTTON */}
                    <Link as="button" href={route("lists.show", list.id)}>
                        <SmallButton>
                            {isSharedList ? (
                                <span>Voir ma liste</span>
                            ) : (
                                <span>Voir et compléter ma liste</span>
                            )}
                        </SmallButton>
                    </Link>

                    {/* EDIT BUTTON */}
                    {isSharedList && (
                        <Link
                            as="button"
                            href={route("ideas.create_idea", list.id)}
                            className="px-3 py-1 bg-white rounded-full text-sm border border-orange-500 hover:bg-gradient-to-r hover:from-orange-200 hover:to-bordeaux-200 transition ease-in-out duration-150"
                        >
                            Compléter ma liste
                        </Link>
                    )}

                    {/* PRIVATE CODE */}
                    {isSharedList && <ShowPrivateCode list={list} />}
                </div>
            </div>

            {/* DELETE BUTTON */}
            <DeleteListButton list={list} />
        </div>
    );
}

AuthListCard.propTypes = {
    list: PropTypes.object,
};
