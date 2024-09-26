"use client";

import { useState } from "react";
import { auth } from "../firebase/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(email, password);

      if (result && result.user) {
        setEmail("");
        setPassword("");
        return router.push("/");
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 mt-1 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 mt-1 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
            <div className="text-red-600 text-sm text-center">
              {errorMessage}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <p className="text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
