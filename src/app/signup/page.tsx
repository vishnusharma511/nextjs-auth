"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";




export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");

        } catch (error: any) {
            console.log("Signup failed", error.message);

            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex h-screen items-center justify-center bg-gray-900 bg-cover bg-no-repeat">
            <div className="rounded-xl bg-gray-800 bg-opacity-50 px-6 py-10 shadow-lg backdrop-blur-md max-w-md">
                <div className="text-white">
                    <div className="mb-8 text-center">
                        <h1 className="mb-2 text-2xl">Signup</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="mb-4 text-lg">{loading ? "Processing" : "Success"}</h1>
                        <hr />

                        <div className="mb-4 w-full">
                            <label htmlFor="username" className="text-white text-sm">Username</label>
                            <input
                                className="rounded-3xl w-full border-none bg-yellow-400 bg-opacity-50 px-4 py-2 text-center text-black placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                                id="username"
                                type="text"
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                                placeholder="Enter your username"
                            />
                        </div>

                        <div className="mb-4 w-full">
                            <label htmlFor="email" className="text-white text-sm">Email</label>
                            <input
                                className="rounded-3xl w-full border-none bg-yellow-400 bg-opacity-50 px-4 py-2 text-center text-black placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                                id="email"
                                type="text"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="mb-4 w-full">
                            <label htmlFor="password" className="text-white text-sm">Password</label>
                            <input
                                className="rounded-3xl w-full border-none bg-yellow-400 bg-opacity-50 px-4 py-2 text-center text-black placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                                id="password"
                                type="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            onClick={onSignup}
                            disabled={buttonDisabled}
                            className={`w-full p-2 bg-yellow-400 bg-opacity-50 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 ${buttonDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-yellow-600'}`}>
                            {buttonDisabled ? "No signup" : "Signup"}
                        </button>

                        <div className="mt-4 text-white">
                            <Link href="/login" className="text-sm">Visit login page</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}