import { Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Ideas from "@/Components/GiftList/Auth/Ideas/Ideas";
export default function Index({ auth, ideas }) {
    // console.log("ideas : ", ideas);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Consulter ma liste" />

            <div className="max-w-4xl mx-auto pb-14 px-4 mt-6">
                <div className="">
                    {ideas.map((idea, index) => (
                        <Ideas key={idea.id} idea={idea} index={index} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

Index.propTypes = {
    auth: PropTypes.object.isRequired,
    ideas: PropTypes.array,
};
