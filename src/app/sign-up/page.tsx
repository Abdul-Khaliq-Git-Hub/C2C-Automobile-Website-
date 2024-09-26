"use client";

import { useState } from "react";
import { auth } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      alert("New Account Created");
      return router.push("/sign-in");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
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
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
