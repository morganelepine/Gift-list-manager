import { useState } from "react";
import { Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Ideas from "@/Components/GiftList/Auth/Ideas/Ideas";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
export default function Index({ auth, ideas }) {
    // console.log("ideas : ", ideas);

    const [listOfIdeas, setListOfIdeas] = useState(ideas);

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

    // Regrouper les idées par brand
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
    listOfIdeas = Object.values(groupedIdeas);
    // const groupedIdeasArray = Object.values(groupedIdeas);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Consulter ma liste" />

            <div className="max-w-4xl mx-auto pb-14 px-4 mt-6">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="">
                        <Droppable
                            droppableId={"listOfIdeas"}
                            key={listOfIdeas.id}
                        >
                            {(provider) => (
                                <ul
                                    {...provider.droppableProps}
                                    ref={provider.innerRef}
                                >
                                    {listOfIdeas.map((idea, index) => (
                                        <Ideas
                                            key={idea.id}
                                            idea={idea}
                                            index={index}
                                        />
                                    ))}
                                    {provider.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </div>
                </DragDropContext>
            </div>
        </AuthenticatedLayout>
    );
}

Index.propTypes = {
    auth: PropTypes.object.isRequired,
    ideas: PropTypes.array,
};
