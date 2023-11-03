import React from "react";
import PropTypes from "prop-types";
import Idea from "@/Components/Idea/Idea";
import { Droppable } from "@hello-pangea/dnd";

export default function Brand({ brandName, brand, ideas, datas }) {
    return (
        <div key={brandName}>
            {brand.length > 0 ? (
                <>
                    <hr className="mt-10"></hr>
                    <h3 className="my-3 text-center text-md">{brandName}</h3>
                </>
            ) : (
                <>
                    <hr className="mt-10"></hr>
                    <h3 className="my-3 text-center text-md">Autres</h3>
                </>
            )}
            <Droppable droppableId={brand.id} key={brand.id}>
                {(provider) => (
                    <ul {...provider.droppableProps} ref={provider.innerRef}>
                        {ideas.map((idea, index) => (
                            <Idea key={idea.id} idea={idea} index={index} />
                        ))}
                        {provider.placeholder}
                    </ul>
                )}
            </Droppable>
        </div>
    );
}

Brand.propTypes = {
    brand: PropTypes.string,
    datas: PropTypes.object,
};
