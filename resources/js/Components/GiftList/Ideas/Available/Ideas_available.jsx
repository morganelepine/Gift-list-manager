import PropTypes from "prop-types";
import Ideas from "@/Components/GiftList/Ideas/Available/Ideas";

export default function Ideas_available({ ideas }) {
    // console.log("listOfIdeas : ", listOfIdeas);

    return (
        <div className="">
            {ideas.map((idea, index) => (
                <div key={idea.id}>
                    <Ideas idea={idea} index={index} />
                </div>
            ))}
        </div>
    );
}

Ideas_available.propTypes = {
    ideas: PropTypes.array,
};
