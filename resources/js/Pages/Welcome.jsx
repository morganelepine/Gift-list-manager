import { Link, Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import Intro from "@/Components/Welcome/Intro";
import LoginRegister from "@/Components/Welcome/LoginRegister";
import Footer from "@/Components/Welcome/Footer";
export default function Welcome({ auth }) {
    const link =
        "flex items-center m-4 p-4 font-medium text-xl text-indigo-500 hover:text-indigo-700";

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen flex flex-col justify-between items-center bg-gradient-to-r from-indigo-100 to-pink-100">
                {auth.user ? (
                    <div className="flex flex-col max-w-4xl mx-auto">
                        <Link href={route("lists.index")} className={`${link}`}>
                            Bienvenue
                        </Link>
                    </div>
                ) : (
                    <>
                        <LoginRegister auth={auth} />
                        <Intro />
                    </>
                )}
                <Footer />
            </div>
        </>
    );
}

Welcome.propTypes = {
    auth: PropTypes.object.isRequired,
};
