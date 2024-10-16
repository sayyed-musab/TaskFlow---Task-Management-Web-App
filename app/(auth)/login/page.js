"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [loginErrMsg, setLoginErrMsg] = useState("");
    const router = useRouter();

    const onSubmit = async (data) => {
        setLoginErrMsg(""); 
        try {
            const response = await fetch('/api/login', { // Update the API endpoint if necessary
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Login failed');
            }

            router.push('/dashboard')
        } catch (error) {
        setLoginErrMsg(error.message); // Set error message for display
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-zinc-800 p-6 rounded-lg shadow-md">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Login to TaskFlow</h1>
                {loginErrMsg && <p className="text-red-400 text-center">{loginErrMsg}</p>}
                <div className="flex items-center justify-center">
                    <div className={isSubmitting ? "spinner" : ""}></div>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Email is not valid",
                                },
                            })}
                            className={`w-full p-3 border ${errors.email ? "border-red-500" : "border-gray-600"
                                } rounded-lg bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                                className={`w-full p-3 border ${errors.password ? "border-red-500" : "border-gray-600"
                                    } rounded-lg bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-200"
                                onClick={togglePasswordVisibility}
                            >
                                <Image
                                    src={showPassword ? "/icons/eye-closed.svg" : "/icons/eye-open.svg"}
                                    alt="Toggle Password Visibility"
                                    width={20}
                                    height={20}
                                    style={{ filter: 'invert(100%)' }} // Apply white color to the icon
                                />
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-lg transition duration-300"
                            disabled={isSubmitting}
                        >
                            Log In
                        </button>
                    </div>
                </form>

                <p className="text-center mt-4">
                    {"Don't have an account? "}
                    <Link href="/signup" className="text-emerald-500 hover:text-emerald-400 font-semibold">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
