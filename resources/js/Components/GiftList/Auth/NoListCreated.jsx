import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";

export default function NoListCreated({ listType }) {
    return (
        <div className="text-center">
            <p>
                Vous n’avez pas encore créé de liste {listType}. <br></br>
            </p>

            <Link href={route("lists.create")}>
                <PrimaryButton className="mt-3">
                    Créer une liste {listType}
                </PrimaryButton>
            </Link>
        </div>
    );
}

NoListCreated.propTypes = {
    listType: PropTypes.string,
};
