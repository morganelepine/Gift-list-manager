import { Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import Intro from "@/Components/Welcome/Intro";
import LoginRegister from "@/Components/Welcome/LoginRegister";
import Footer from "@/Components/Welcome/Footer";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen flex flex-col justify-between items-center bg-gradient-to-r from-bordeaux-100 to-orange-100">
                <LoginRegister auth={auth} />
                <Intro />
                <Footer />
            </div>
        </>
    );
}

Welcome.propTypes = {
    auth: PropTypes.object.isRequired,
};
