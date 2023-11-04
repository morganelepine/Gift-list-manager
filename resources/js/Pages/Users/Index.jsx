import { Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ auth, users }) {
    console.log("users : ", users);

    const secondButton =
        "text-center mt-4 px-4 py-2 bg-indigo-200 border border-transparent rounded-md font-semibold text-md text-indigo-800 hover:text-white hover:bg-indigo-500 focus:bg-indigo-900 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150";

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Les listes à suivre" />

            <ul>
                {users.map((user) => (
                    <li>
                        <Link
                            href={route("ideas.index")}
                            className={`${secondButton}`}
                        >
                            {user.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </AuthenticatedLayout>
    );
}

Index.propTypes = {
    auth: PropTypes.object.isRequired,
    users: PropTypes.array,
};
