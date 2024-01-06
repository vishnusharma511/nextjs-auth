"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("loading");

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/login');
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const res = await axios.get('/api/users/me');
                setData(res.data.data);
            } catch (error) {
                console.error(error.message);
                toast.error(error.message);
            }
        };

        fetchUserDetails();
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
        <div className="flex flex-col h-screen items-center justify-center bg-gray-900">
            <div className="rounded-xl bg-gray-800 bg-opacity-50 px-6 py-10 shadow-lg backdrop-blur-md max-w-md mb-4">
                <div className="text-white">
                    <div className="mb-8 text-center">
                        <h1 className="mb-2 text-2xl font-bold">Profile</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <ProfileDetail label="Username" value={data.username} />
                        <ProfileDetail label="Email" value={data.email} />
                    </div>
                </div>
            </div>

            <button
                onClick={logout}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
        </div>

    );
}

const ProfileDetail = ({ label, value }) => (
    <div className="mb-4 text-white flex items-center">
        <label htmlFor={label.toLowerCase()} className="mr-2 font-bold">{label}:</label>
        <p id={label.toLowerCase()} className={`text-yellow-400 ${!value ? 'italic' : ''}`}>{value || "Loading..."}</p>
    </div>
);
