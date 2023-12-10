import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Button from "@/Components/GiftList/Ideas/Reserved/Button";
import Linkify from "linkify-react"; //rendre les liens cliquables

dayjs.extend(relativeTime);

export default function Ideas_reserved({ auth, ideas }) {
    // console.log("listOfIdeas : ", listOfIdeas);

    return (
        <div className="w-full space-y-5 sm:space-y-0">
            {ideas.map((idea) => (
                <div key={idea.id}>
                    <div className="my-2 sm:flex items-center">
                        {/* BUTTON */}
                        <div className="flex sm:flex-col mr-2 mb-1">
                            <Button auth={auth} idea={idea} />
                        </div>

                        {/* IDEA */}
                        <div className="p-3 flex flex-1 flex-col bg-indigo-50 shadow-sm rounded-lg">
                            <div className="flex flex-col">
                                <div className="flex flex-col">
                                    <div className="flex justify-between">
                                        <div className="flex flex-col mr-3 w-full">
                                            <div className="flex flex-wrap items-center">
                                                {idea.idea && (
                                                    <p className="text-sm sm:uppercase font-semibold text-gray-900 mr-2 mb-1 sm:mb-0 sm:mr-4">
                                                        {idea.idea}
                                                    </p>
                                                )}
                                                {idea.details && (
                                                    <p className="min-w-max text-xs text-center text-gray-900 bg-indigo-200 rounded-md px-2 mb-1 sm:mb-0 mr-4">
                                                        {idea.details}
                                                    </p>
                                                )}
                                                {idea.brand && (
                                                    <small className="text-sm text-center text-gray-600 mb-1 sm:mb-0 mr-4">
                                                        {idea.brand}
                                                    </small>
                                                )}
                                            </div>
                                            {idea.link && (
                                                <p className="text-sm italic text-indigo-800 hover:text-indigo-500 max-h-5 text-ellipsis overflow-hidden break-all">
                                                    <Linkify
                                                        className=""
                                                        options={{
                                                            target: "blank",
                                                        }}
                                                    >
                                                        {idea.link}
                                                    </Linkify>
                                                </p>
                                            )}
                                            <div className="text-right">
                                                <small className="text-xs italic text-gray-700">
                                                    Reserved by{" "}
                                                    {idea.status_user}{" "}
                                                    {dayjs(
                                                        idea.updated_at
                                                    ).fromNow()}
                                                </small>
                                            </div>
                                        </div>
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
