import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Button from "@/Components/GiftList/Ideas/Purchased/Button";
import Linkify from "linkify-react"; //rendre les liens cliquables

dayjs.extend(relativeTime);

export default function Ideas_purchased({ auth, ideas }) {
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
                        <div className="p-3 flex flex-1 flex-col bg-gray-200 shadow-sm rounded-lg">
                            <div className="flex flex-col">
                                <div className="flex flex-col">
                                    <div className="flex justify-between">
                                        <div className="flex flex-col mr-3 w-full">
                                            <div className="flex flex-wrap items-center">
                                                {idea.idea && (
                                                    <p className="text-sm sm:uppercase text-gray-400 mr-2 mb-1 sm:mb-0 sm:mr-4 line-through">
                                                        {idea.idea}
                                                    </p>
                                                )}
                                                {idea.brand && (
                                                    <small className="text-sm text-center text-gray-400 mb-1 sm:mb-0 mr-4 line-through">
                                                        {idea.brand}
                                                    </small>
                                                )}
                                            </div>
                                            {idea.link && (
                                                <p className="text-sm italic text-gray-400 hover:text-indigo-500 max-h-5 text-ellipsis overflow-hidden break-all line-through">
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
                                                    Purchased by{" "}
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

Ideas_purchased.propTypes = {
    auth: PropTypes.object.isRequired,
    ideas: PropTypes.array,
};
