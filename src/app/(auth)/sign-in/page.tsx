'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { signIn } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import toast from "react-hot-toast";

function getReturnTo() {
    const returnTo = new URLSearchParams(window.location.search).get("returnTo");
    return returnTo?.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/";
}

const SignInPage = () => {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState<string | null>(null);

    // Email/Password Sign In Handler
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        setLoading(true);
        const toastId = toast.loading("লগইন করা হচ্ছে...");

        const { data: resData, error } = await signIn.email({
            email: data.email as string,
            password: data.password as string,
            rememberMe: true,
        }, {
            onSuccess: () => {
                toast.success("সফলভাবে লগইন হয়েছে!", { id: toastId });
                router.push(getReturnTo());
                router.refresh();
            },
            onError: (ctx) => {
                toast.error(ctx.error.message || "লগইন ব্যর্থ হয়েছে। সঠিক ইমেইল ও পাসওয়ার্ড দিন।", { id: toastId });
                setLoading(false);
            }
        });

        if (error) {
            setLoading(false);
        }
    };

    // Social Sign In Handler (Google / GitHub)
    const handleSocialSignIn = async (provider: "google" | "github") => {
        setSocialLoading(provider);
        const toastId = toast.loading(`${provider === "google" ? "Google" : "GitHub"} দিয়ে লগইন হচ্ছে...`);

        await signIn.social({
            provider: provider,
            callbackURL: getReturnTo(),
        }, {
            onSuccess: () => {
                toast.success("সফলভাবে লগইন হয়েছে!", { id: toastId });
            },
            onError: (ctx) => {
                toast.error(ctx.error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে।", { id: toastId });
                setSocialLoading(null);
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#f0f5f0] flex flex-col justify-between">
            {/* Main Form Section */}
            <main className="grow flex items-center justify-center px-4 py-6">
                <div className="max-w-md w-full bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
                    
                    {/* Title Section */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">সাইন ইন</h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
                            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                        </p>
                    </div>

                    <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                        {/* Email Field */}
                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "দয়া করে একটি সঠিক ইমেইল দিন";
                                }
                                return null;
                            }}
                            className="flex flex-col gap-1.5"
                        >
                            <Label className="text-xs sm:text-sm font-semibold text-gray-700">ইমেইল</Label>
                            <Input placeholder="you@example.com" className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-600 bg-white text-gray-900" />
                            <FieldError className="text-xs text-red-500" />
                        </TextField>

                        {/* Password Field */}
                        <TextField 
                            isRequired
                            minLength={8}
                            name="password"
                            type="password"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে";
                                }
                                return null;
                            }}
                            className="flex flex-col gap-1.5"
                        >
                            <Label className="text-xs sm:text-sm font-semibold text-gray-700">পাসওয়ার্ড</Label>
                            
                            <InputGroup className="relative flex items-center w-full">
                                <InputGroup.Input
                                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-600 bg-white text-gray-900 pr-10"
                                    placeholder="কমপক্ষে ৮ অক্ষর"
                                    type={isVisible ? "text" : "password"}
                                />
                                <InputGroup.Suffix className="absolute right-3 flex items-center pe-0">
                                    <Button
                                        isIconOnly
                                        aria-label={isVisible ? "Hide password" : "Show password"}
                                        size="sm"
                                        variant="ghost"
                                        onPress={() => setIsVisible(!isVisible)}
                                        className="text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer"
                                    >
                                        {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                                    </Button>
                                </InputGroup.Suffix>
                            </InputGroup>
                            <FieldError className="text-xs text-red-500" />
                        </TextField>

                        <Button 
                            type="submit"
                            isDisabled={loading}
                            className="w-full bg-[#0a8145] hover:bg-[#076435] text-white font-medium py-2.5 rounded-xl transition-colors text-sm shadow-xs mt-2 cursor-pointer flex items-center justify-center"
                        >
                            {loading ? "লগইন হচ্ছে..." : "সাইন ইন"}
                        </Button>
                    </Form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-3 text-gray-400">অথবা</span>
                        </div>
                    </div>

                    {/* Social Logins */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => handleSocialSignIn("google")}
                            disabled={socialLoading !== null}
                            className="flex items-center justify-center space-x-2 py-2 px-3 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white cursor-pointer"
                        >
                            <span><svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                            </svg></span>
                            <span>Google দিয়ে চালিয়ে যান</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleSocialSignIn("github")}
                            disabled={socialLoading !== null}
                            className="flex items-center justify-center space-x-2 py-2 px-3 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white cursor-pointer"
                        >
                            <span><svg className="w-4 h-4 fill-current text-gray-900" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                            </svg></span>
                            <span>GitHub দিয়ে চালিয়ে যান</span>
                        </button>
                    </div>

                    {/* Register Link */}
                    <div className="text-center mt-6 text-xs sm:text-sm text-gray-500">
                        অ্যাকাউন্ট নেই?{" "}
                        <Link href="/sign-up" className="text-[#0a8145] font-semibold hover:underline">
                            সাইন আপ করুন
                        </Link>
                    </div>

                  {/* Footer Back Link */}
                  <div className="text-center py-6">
                      <Link href="/" className="text-xs sm:text-sm text-gray-500 hover:text-gray-800 transition-colors">
                          ← হোম পেজে ফিরে যান
                      </Link>
                  </div>

                </div>
            </main>


        </div>
    );
};

export default SignInPage;
