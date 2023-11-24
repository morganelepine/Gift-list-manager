import { useState } from "react";
import { Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Idea from "@/Components/GiftList/Ideas/Available/Ideas";
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

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Consulter ma liste" />

            <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-4">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="mt-6">
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
                                        <Idea
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
