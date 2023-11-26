import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Button from "@/Components/GiftList/Ideas/Reserved/Button";
import Linkify from "linkify-react"; //rendre les liens cliquables

dayjs.extend(relativeTime);

export default function Ideas_reserved({ auth, ideas }) {
    // console.log("listOfIdeas : ", listOfIdeas);

    return (
        <div className="w-full">
            {ideas.map((idea) => (
                <div key={idea.id}>
                    <div className="my-2 flex justify-between">
                        {/* BUTTON */}
                        <div className="flex items-center mr-2">
                            <Button auth={auth} idea={idea} />
                        </div>

                        {/* IDEA */}
                        <div className="p-3 flex flex-1 flex-col bg-indigo-50 shadow-sm rounded-lg">
                            <div className="flex flex-col">
                                <div className="flex flex-col">
                                    <div className="flex justify-between">
                                        <div className="flex flex-col mr-10">
                                            <div className="flex items-center">
                                                {idea.idea && (
                                                    <p className="text-sm uppercase font-semibold text-gray-900 mr-4">
                                                        {idea.idea}
                                                    </p>
                                                )}
                                                {idea.brand && (
                                                    <small className="text-sm text-gray-600 mr-4">
                                                        {idea.brand}
                                                    </small>
                                                )}
                                            </div>
                                            {idea.link && (
                                                <p className="text-sm italic text-indigo-800 hover:text-indigo-500 max-w-lg overflow-ellipsis overflow-hidden">
                                                    <Linkify
                                                        options={{
                                                            target: "blank",
                                                        }}
                                                    >
                                                        {idea.link}
                                                    </Linkify>
                                                </p>
                                            )}
                                        </div>
                                        {idea.details && (
                                            <div className="w-2/12">
                                                <p className="text-xs text-gray-900 bg-indigo-200 rounded-lg p-1 text-center">
                                                    {idea.details}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <small className="text-xs italic text-gray-700">
                                            Reserved by {idea.status_user}{" "}
                                            {dayjs(idea.updated_at).fromNow()}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

Ideas_reserved.propTypes = {
    ideas: PropTypes.array,
};
