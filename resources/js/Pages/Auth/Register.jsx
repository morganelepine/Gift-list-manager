import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/Laravel/InputError";
import InputLabel from "@/Components/Laravel/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import TextInput from "@/Components/Laravel/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Inscription" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Prénom" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="E-mail" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Mot de passe" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirmer le mot de passe"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                {/* <div className="mt-4">
                    <InputLabel htmlFor="photo" value="Photo" />

                    <TextInput
                        id="photo"
                        type="file"
                        name="photo"
                        value={data.photo}
                        className="mt-1 block w-full"
                        autoComplete="photo"
                        onChange={(e) => setData("photo", e.target.value)}
                        required
                    />

                    <InputError message={errors.photo} className="mt-2" />
                </div> */}

                <div className="flex sm:flex-row flex-col items-center justify-end mt-4 sm:space-x-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-orange-500 rounded-md order-2 md:order-1 mt-2 sm:mt-0"
                    >
                        Déjà enregistré·e ?
                    </Link>

                    <PrimaryButton
                        className="order-1 md:order-2"
                        disabled={processing}
                    >
                        Créer mon compte
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
