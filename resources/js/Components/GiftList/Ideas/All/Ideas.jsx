import React, { useState, useRef, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import IdeaShow from "@/Components/GiftList/Ideas/All/State/IdeaShow";
import IdeaEdit from "@/Components/GiftList/Ideas/All/State/IdeaEdit";
import Buttons from "@/Components/GiftList/Ideas/All/Buttons";
import { Draggable } from "@hello-pangea/dnd";

dayjs.extend(relativeTime);

export default function IdeaAdmin({ brand, idea, index }) {
    // console.log("idea : ", idea);

    const { auth } = usePage().props;

    const [editing, setEditing] = useState(false);

    const ideaDiv = useRef();
    let divHeight = "";
    const [flexDirection, setFlexDirection] = useState("flex-col");

    useEffect(() => {
        if (ideaDiv.current) {
            divHeight = ideaDiv.current.offsetHeight;
            // console.log("Hauteur de la div :", divHeight);
        }
        if (divHeight < 84) {
            setFlexDirection("");
        }
    }, []);

    return (
        <Draggable draggableId={idea.id.toString()} index={index} key={idea.id}>
            {(provided) => (
                <div
                    className="my-2 sm:flex items-center"
                    // ref={ideaDiv}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {/* EDIT & DELETE BUTTONS */}
                    <div className={`flex ${flexDirection} items-center w-16 `}>
                        <Buttons idea={idea} setEditing={setEditing} />
                    </div>

                    {/* IDEA */}
                    <div className="p-3 flex flex-1 flex-col bg-white shadow-sm rounded-lg">
                        {editing ? (
                            <IdeaEdit
                                auth={auth}
                                idea={idea}
                                setEditing={setEditing}
                            />
                        ) : (
                            <IdeaShow idea={idea} brand={brand} />
                        )}
                    </div>

                    {/* DRAG & DROP BUTTON */}
                    <div className="hidden sm:block">
                        <button>
                            <svg
                                xmlns="https://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-6 w-6 my-2 ml-4 text-gray-300 hover:text-indigo-800"
                            >
                                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </Draggable>
    );
}
