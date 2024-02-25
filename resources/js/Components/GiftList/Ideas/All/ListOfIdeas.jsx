import { useState } from "react";
import { Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import Ideas from "@/Components/GiftList/Ideas/All/Ideas";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import Linkify from "linkify-react"; //rendre les liens cliquables
export default function Ideas_all({ ideas }) {
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

    //Permettre le drag&drop
    const [listOfIdeas, setListOfIdeas] = useState(groupedIdeasArray);

    const onDragEnd = (result) => {
        // si la nouvelle position est en dehors du cadre : on arrete l'exécution de la fonction
        if (!result.destination) {
            return;
        }

        const newListOfIdeas = Array.from(listOfIdeas);
        const [reorderedIdeas] = newListOfIdeas.splice(result.source.index, 1);
        newListOfIdeas.splice(result.destination.index, 0, reorderedIdeas);
        setListOfIdeas(newListOfIdeas);

        let ideaId;
        listOfIdeas.map((idea) => (ideaId = idea.id));
    };
    return (
        <>
            <Head title="Consulter ma liste" />

            {}
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="w-full">
                    <Droppable droppableId={"listOfIdeas"} key={listOfIdeas.id}>
                        {(provider) => (
                            <ul
                                {...provider.droppableProps}
                                ref={provider.innerRef}
                                className="space-y-8"
                            >
                                {Object.entries(groupedIdeas).map(
                                    ([brand, brandData]) => (
                                        <div key={brand}>
                                            <div className="inline-flex items-center w-full">
                                                <p className="min-w-max py-1 px-3 text-sm bg-orange-500 text-white rounded-full">
                                                    {brand}
                                                </p>
                                                <hr className="w-full h-px mt-3 mb-2 bg-orange-100 border-0"></hr>
                                            </div>
                                            {brand === "Nébuleuse" && (
                                                <div className="flex flex-wrap bg-orange-50 sm:bg-transparent rounded p-1 sm:p-0 mt-1">
                                                    <p className="text-xs italic ">
                                                        Lien à utiliser pour
                                                        bénéficier de la
                                                        réduction de parrainage
                                                        (-15%)&nbsp;:&nbsp;
                                                    </p>
                                                    <p className="text-xs italic text-orange-500 hover:text-orange-500">
                                                        <Linkify
                                                            options={{
                                                                target: "blank",
                                                            }}
                                                        >
                                                            https://snwbl.io/nebuleuse/ROXANE66244
                                                        </Linkify>
                                                    </p>
                                                </div>
                                            )}
                                            {brandData.ideas.map(
                                                (idea, index) => (
                                                    <div key={idea.id}>
                                                        <Ideas
                                                            idea={idea}
                                                            brand={brand}
                                                            index={index}
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )
                                )}
                                {provider.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </>
    );
}

Ideas_all.propTypes = {
    ideas: PropTypes.array,
};
