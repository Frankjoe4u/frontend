"use client";

import { useState } from "react";
import { z } from "zod";
import Link from "next/link";

const schema = z
  .object({
    firstName: z.string().min(2, "Min 2 characters"),
    lastName: z.string().min(2, "Min 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Min 8 characters"),
    confirmPassword: z.string().min(1, "Required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormErrors = Partial<Record<string, string>>;

export default function FormPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (fields: object) => {
    const result = schema.safeParse(fields);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue: z.ZodIssue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleChange = (field: string, value: string) => {
    const fields = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      [field]: value,
    };
    validate(fields);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = { firstName, lastName, email, password, confirmPassword };
    if (validate(fields)) {
      setSubmitted(true);
      console.log("Submitted:", fields);
    }
  };

  const inputClass = (field: string) =>
    "w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white placeholder-gray-400 " +
    (errors[field] ? "border-red-400" : "border-gray-600");

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <Link
          href="/"
          className="text-sm text-blue-500 hover:underline mb-6 inline-block"
        >
          Back
        </Link>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">Register</h1>

        {submitted && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
            Submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                handleChange("firstName", e.target.value);
              }}
              placeholder="Peter"
              className={inputClass("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                handleChange("lastName", e.target.value);
              }}
              placeholder="Obi"
              className={inputClass("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleChange("email", e.target.value);
              }}
              placeholder="frankjoe@gmail.com"
              className={inputClass("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleChange("password", e.target.value);
              }}
              placeholder="Min 8 characters"
              className={inputClass("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                handleChange("confirmPassword", e.target.value);
              }}
              placeholder="Re-enter password"
              className={inputClass("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md text-sm transition-colors"
          >
            Register
          </button>

          <button
            type="button"
            onClick={() => {
              setFirstName("");
              setLastName("");
              setEmail("");
              setPassword("");
              setConfirmPassword("");
              setErrors({});
              setSubmitted(false);
            }}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-2.5 rounded-md text-sm transition-colors"
          >
            Reset
          </button>
        </form>
      </div>
    </main>
  );
}
