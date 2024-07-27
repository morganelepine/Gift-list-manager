import { Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import Intro from "@/Components/Home/Intro";
import LoginRegister from "@/Components/Home/LoginRegister";
import Footer from "@/Components/Home/Footer";

export default function Home({ auth }) {
    return (
        <>
            <Head title="Home" />

            <div className="min-h-screen flex flex-col justify-between items-center">
                <LoginRegister auth={auth} />
                <Intro />
                <Footer />
            </div>
        </>
    );
}

Home.propTypes = {
    auth: PropTypes.object.isRequired,
};
