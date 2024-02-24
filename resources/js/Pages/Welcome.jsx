import { Link, Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import Intro from "@/Components/Welcome/Intro";
import LoginRegister from "@/Components/Welcome/LoginRegister";
import Footer from "@/Components/Welcome/Footer";
export default function Welcome({ auth }) {
    const link =
        "flex items-center m-4 p-4 font-medium text-xl text-orange-500 hover:text-orange-700";

    return (
        <>
            <Head title="Welcome" />
            {/* <div
                className="bg-cover bg-center min-h-screen flex flex-col justify-between items-center "
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?q=80&w=1907&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}
            > */}
            <div className="min-h-screen flex flex-col justify-between items-center bg-gradient-to-r from-bordeaux-100 to-orange-100">
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
