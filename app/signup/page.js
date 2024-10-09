"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';

export default function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = (data) => {
        console.log(data);
        // signup logic here
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-zinc-800 p-6 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-center mb-6">Create Your Account</h1>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', { required: 'Name is required', minLength: { value: 3, message: 'Name must be at least 3 characters' } })}
                            className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-lg bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Email is not valid',
                                },
                            })}
                            className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 8, message: 'Password must be at least 8 characters' },
                                })}
                                className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-lg bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                                placeholder="Create a password"
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
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                {...register('confirmPassword', {
                                    required: 'Confirm password is required',
                                    validate: (value) => value === watch('password') || 'Passwords do not match',
                                })}
                                className={`w-full p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} rounded-lg bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-200"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                <Image
                                    src={showConfirmPassword ? "/icons/eye-closed.svg" : "/icons/eye-open.svg"}
                                    alt="Toggle Confirm Password Visibility"
                                    width={20}
                                    height={20}
                                    style={{ filter: 'invert(100%)' }} // Apply white color to the icon
                                />
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-lg transition duration-300"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="text-center mt-4">
                    Already have an account?
                    <Link href="/login" className="text-emerald-500 hover:text-emerald-400 font-semibold"> Log In</Link>
                </p>
            </div>
        </div>
    );
}
