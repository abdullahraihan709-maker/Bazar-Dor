"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, updateUser, signOut } from "@/lib/auth-client";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [loading, setLoading] = useState(false);

  // Sync initial name when session loads
  React.useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("প্রোফাইল আপডেট হচ্ছে...");

    try {
      const { data, error } = await updateUser({
        name: name,
      });

      if (error) {
        toast.error(error.message || "আপডেট ব্যর্থ হয়েছে", { id: toastId });
      } else {
        toast.success("সফলভাবে আপনার নাম আপডেট করা হয়েছে!", { id: toastId });
        refetch();
        router.refresh();
      }
    } catch (err) {
      toast.error("কিছু ভুল হয়েছে। আবার চেষ্টা করুন।", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const toastId = toast.loading("লগআউট হচ্ছে...");
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে লগআউট হয়েছে!", { id: toastId });
          router.push("/");
          router.refresh();
        },
        onError: () => {
          toast.error("লগআউট ব্যর্থ হয়েছে।", { id: toastId });
        }
      }
    });
  };

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />

      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Title Section */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">আমার প্রোফাইল</h1>
          <p className="text-sm text-gray-500 mt-1">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন এবং পরিবর্তন করুন।</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-2xl overflow-hidden border border-emerald-200 shrink-0">
              {session?.user?.image ? (
                <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
              ) : (
                session?.user?.name?.charAt(0).toUpperCase() || "U"
              )}
            </div>
            <div className="overflow-hidden">
              <h2 className="text-lg font-bold text-gray-900 truncate">{session?.user?.name}</h2>
              <p className="text-xs sm:text-sm text-gray-500 truncate">{session?.user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>↩</span>
            <span>সাইন আউট</span>
          </button>
        </div>

        {/* Update Form Section */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs">
          <h3 className="text-md font-bold text-gray-900 mb-6">তথ্য</h3>

          <form onSubmit={handleUpdateUser} className="space-y-5">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">নাম</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="আপনার নাম লিখুন"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600 bg-white text-gray-900 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#0a8145] hover:bg-[#076435] text-white font-medium text-sm rounded-xl transition-colors shadow-xs disabled:opacity-50 cursor-pointer flex items-center justify-center"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}