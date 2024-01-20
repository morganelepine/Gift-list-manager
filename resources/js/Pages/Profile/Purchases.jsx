import { Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import IdeasPurchased from "@/Components/Profile/IdeasPurchased";

export default function Purchases({ auth, ideas, totalPrice }) {
    // Regrouper les idées par user_name
    const groupedIdeas = ideas.reduce((acc, idea) => {
        const { user_name, price } = idea;

        // Ajouter l'idée à la liste des idées pour le user_name correspondant
        if (!acc[user_name]) {
            acc[user_name] = {
                ideas: [idea],
                total: price,
            };
        } else {
            acc[user_name].ideas.push(idea);
            acc[user_name].total += price;
        }

        return acc;
    }, {});

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Mes achats
                </h2>
            }
        >
            <Head title="Mes achats" />

            <div className="max-w-3xl mx-auto pb-20 px-4 mt-10">
                <div className="space-y-10">
                    <div className="flex justify-between mt-10 text-indigo-900 text-xl uppercase font-extrabold">
                        <p>Budget total</p>
                        <p>{totalPrice} €</p>
                    </div>

                    {Object.entries(groupedIdeas).map(
                        ([user_name, userData]) => (
                            <div key={user_name} className="space-y-5">
                                <div className="flex justify-between text-indigo-700 font-bold">
                                    <p>Budget pour {user_name}</p>
                                    <p>{userData.total} €</p>
                                </div>
                                <div className="space-y-3">
                                    {userData.ideas.map((idea) => (
                                        <IdeasPurchased
                                            key={idea.id}
                                            idea={idea}
                                        />
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

Purchases.propTypes = {
    auth: PropTypes.object,
    ideas: PropTypes.array,
};
