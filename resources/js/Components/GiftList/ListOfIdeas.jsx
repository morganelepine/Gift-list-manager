import { useState } from "react";
import { Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Idea from "@/Components/Idea/Idea";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

export default function Index({ auth, ideas }) {
    // console.log("listsOfIdeas : ", listsOfIdeas);

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
        <>
            <Head title="Consulter ma liste" />

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="mt-6">
                    <Droppable droppableId={"listOfIdeas"} key={listOfIdeas.id}>
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
        </>
    );
}

Index.propTypes = {
    auth: PropTypes.object.isRequired,
    ideas: PropTypes.array,
};
