import { useState } from "react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Brand from "@/Components/Idea/Brand";
import { DragDropContext } from "@hello-pangea/dnd";
export default function Index({ auth, ideas, ideasByBrand }) {
    // console.log("ideasByBrand : ", ideasByBrand);
    // console.log("ideas : ", ideas);

    const [datas, setDatas] = useState(ideasByBrand);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        // si la nouvelle position est en dehors du cadre : on arrete l'exécution de la fonction
        if (!destination) {
            return;
        }
        // si la destination est pas la meme que la source : on arrete l'exécution de la fonction
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // on récupère la marque dans laquelle on veut modifier  l'ordre des idées
        const brand = datas[source.droppableId];
        // on fait une copie du tableau d'idées actuelles
        const newIdeas = Array.from(brand);
        // on remplace les places dans l'array
        newIdeas.splice(source.index, 1);
        newIdeas.splice(destination.index, 0, draggableId);
        // on crée une copie de la marque dont l'ordre des idées a été modifié
        const newBrand = {
            ...brand,
            ideas: newIdeas,
        };
        // et on met à jour le state
        const newState = {
            ...datas,
            brands: {
                ...datas.brands,
                [newBrand.id]: newBrand,
            },
        };
        setDatas(newState);
        return;
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Consulter ma liste" />

            <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-4">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="mt-6">
                        {Object.keys(datas).map((brandName) => {
                            const brand = datas[brandName];
                            {
                                /* console.log("brand : ", brand); */
                            }
                            let ideas = [];
                            for (const idea of brand) {
                                ideas.push(idea);
                            }
                            {
                                /* console.log("array of ideas : ", ideas); */
                            }
                            return (
                                <Brand
                                    key={brandName.id}
                                    brand={brand}
                                    ideas={ideas}
                                    brandName={brandName}
                                    datas={datas}
                                />
                            );
                        })}
                    </div>
                </DragDropContext>

                {/* <div className="mt-6">
                    {ideas.map((idea) => (
                        <Idea key={idea.id} idea={idea} />
                    ))}
                </div> */}
            </div>
        </AuthenticatedLayout>
    );
}

Index.propTypes = {
    auth: PropTypes.object.isRequired,
    ideas: PropTypes.array,
    ideasByBrand: PropTypes.object,
};
