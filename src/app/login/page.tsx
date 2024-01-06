"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";





export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",

    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
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
                        <h1 className="mb-2 text-2xl">Login</h1>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <h1 className="mb-4 text-lg">{loading ? "Processing" : ""}</h1>
                        <hr />

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

                        <div className="mb-4 flex justify-center">
                            <button
                                onClick={onLogin}
                                className="rounded-3xl bg-yellow-400 bg-opacity-50 px-8 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">
                                Login
                            </button>
                        </div>

                        <div className="flex justify-center text-lg text-white">
                            <Link href="/signup" className="text-sm">Visit Signup page</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}