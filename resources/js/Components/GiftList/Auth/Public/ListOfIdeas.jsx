import { Head } from "@inertiajs/react";
import PropTypes from "prop-types";
// import Ideas from "@/Components/GiftList/Auth/Ideas/Ideas";
import Ideas from "@/Components/Ideas/PublicList/Idea";
import Linkify from "linkify-react"; //rendre les liens cliquables

export default function ListOfIdeas({ ideas }) {
    // Regrouper les idées par marque
    const groupedIdeas = ideas.reduce((ideasByBrand, idea) => {
        const { brand, ...rest } = idea;

        if (!ideasByBrand[brand]) {
            ideasByBrand[brand] = { brand, ideas: [rest] };
        } else {
            ideasByBrand[brand].ideas.push(rest);
        }

        return ideasByBrand;
    }, {});

    // Convertir l'objet en tableau
    const groupedIdeasArray = Object.values(groupedIdeas);

    return (
        <>
            <Head title="Consulter ma liste" />

            <div className="w-full space-y-8">
                {Object.entries(groupedIdeas).map(([brand, brandData]) => (
                    <div key={brand} className="">
                        <div className="inline-flex items-center w-full">
                            <p className="min-w-max py-1 px-3 text-sm bg-orange-500 text-white rounded-full">
                                {brand}
                            </p>
                            <hr className="w-full h-px mt-3 mb-2 bg-orange-100 border-0"></hr>
                        </div>
                        {brandData.ideas.map((idea, index) => (
                            <div key={idea.id}>
                                <Ideas
                                    idea={idea}
                                    brand={brand}
                                    index={index}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}

ListOfIdeas.propTypes = {
    ideas: PropTypes.array,
};
