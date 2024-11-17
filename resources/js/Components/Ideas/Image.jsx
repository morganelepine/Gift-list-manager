import { useState } from "react";

export default function Image({ idea }) {
    const [showImageZoom, setShowImageZoom] = useState(false);
    const image = `/storage/${idea.image}`;

    return (
        <>
            <div className="h-48 w-48 mt-2 overflow-hidden">
                <img
                    src={image}
                    alt="Image réduite"
                    className="h-full w-full object-cover cursor-pointer rounded-lg"
                    onClick={() => setShowImageZoom(true)}
                />
            </div>

            {showImageZoom && (
                <div
                    className="fixed p-8 top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={() => setShowImageZoom(false)}
                >
                    <img
                        src={image}
                        alt="Image zoomée"
                        className="max-h-full max-w-full"
                    />
                </div>
            )}
        </>
    );
}
