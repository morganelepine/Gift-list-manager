import { Head, Link } from "@inertiajs/react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BudgetIdeasPurchased from "@/Components/Profile/Budget/BudgetIdeasPurchased";

export default function Gifts({ auth, ideas }) {
    const groupedIdeas = ideas.reduce((giftsReceivedByUser, idea) => {
        const year = new Date(idea.updated_at).getFullYear();

        if (giftsReceivedByUser[year]) {
            giftsReceivedByUser[year].ideas.push(idea);
        } else {
            giftsReceivedByUser[year] = {
                ideas: [idea],
            };
        }

        return giftsReceivedByUser;
    }, {});

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="sm:flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Mes cadeaux reçus
                    </h2>
                    {ideas.length === 0 && (
                        <Link
                            as="button"
                            href={route("lists.followedLists")}
                            className="flex items-center mt-2 sm:mt-0 hover:text-orange-500"
                        >
                            <div className="h-6 w-6 mr-1 flex items-center justify-center rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </div>
                            <p className="text-sm">Voir mes listes suivies</p>
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Mes achats" />

            <div className="max-w-3xl mx-auto pb-14 px-4 mt-10">
                {ideas.length > 0 ? (
                    <div className="space-y-10">
                        {Object.entries(groupedIdeas)
                            .sort(([yearA], [yearB]) => yearB - yearA)
                            .map(([updated_at, userData]) => (
                                <div key={updated_at} className="space-y-5">
                                    <div className="flex justify-between text-orange-500 font-bold">
                                        <p>Cadeaux reçus en {updated_at}</p>
                                    </div>
                                    <div className="space-y-3">
                                        {userData.ideas.map((idea) => (
                                            <BudgetIdeasPurchased
                                                key={idea.id}
                                                idea={idea}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                    </div>
                ) : (
                    <p className="text-center">
                        Vous n'avez reçu aucun cadeau provenant de vos listes
                        pour le moment.
                    </p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

Gifts.propTypes = {
    auth: PropTypes.object,
    ideas: PropTypes.array,
};
