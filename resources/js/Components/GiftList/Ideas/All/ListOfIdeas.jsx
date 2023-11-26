import { useState } from "react";
import { Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import Ideas from "@/Components/GiftList/Ideas/All/Ideas";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

export default function Ideas_all({ auth, list, ideas }) {
    // console.log("listOfIdeas : ", listOfIdeas);
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

            {}
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="w-full">
                    <Droppable droppableId={"listOfIdeas"} key={listOfIdeas.id}>
                        {(provider) => (
                            <ul
                                {...provider.droppableProps}
                                ref={provider.innerRef}
                            >
                                {listOfIdeas.map((idea, index) => (
                                    <div key={idea.id}>
                                        <Ideas idea={idea} index={index} />
                                    </div>
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

Ideas_all.propTypes = {
    auth: PropTypes.object.isRequired,
    ideas: PropTypes.array,
    list: PropTypes.object,
};
