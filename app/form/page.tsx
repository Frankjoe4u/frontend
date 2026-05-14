"use client";
// app/form/page.tsx
// A registration form using:
//   - react-hook-form  → manages form state, handles submission, tracks errors
//   - zod              → defines validation rules as a schema
//   - @hookform/resolvers/zod → bridges react-hook-form and zod together

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

// ============================================================
// STEP 1: Define the Zod validation schema
// This describes what valid form data looks like.
// ============================================================
const formSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .min(2, "First name must be at least 2 characters"),

    lastName: z
      .string()
      .min(1, "Last name is required")
      .min(2, "Last name must be at least 2 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  // .refine() lets us add a cross-field validation rule.
  // Here we check that both password fields match before allowing submission.
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    // This attaches the error message to the confirmPassword field specifically
    path: ["confirmPassword"],
  });

// ============================================================
// STEP 2: Infer a TypeScript type from the zod schema
// This gives us type safety without writing the type manually.
// ============================================================
type FormData = z.infer<typeof formSchema>;

export default function FormPage() {
  // ============================================================
  // STEP 3: Initialise react-hook-form
  // register  → connects an <input> to the form
  // handleSubmit → wraps your onSubmit, only calls it if validation passes
  // formState → contains { errors, isSubmitSuccessful, isSubmitting, ... }
  // reset     → clears all fields back to empty
  // ============================================================
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    reset,
  } = useForm<FormData>({
    // zodResolver converts zod errors into the format react-hook-form expects
    resolver: zodResolver(formSchema),
  });

  // ============================================================
  // STEP 4: The submit handler
  // This only runs when ALL zod validations pass (including password match).
  // ============================================================
  const onSubmit = (data: FormData) => {
    // In a real app you'd send this data to your API here.
    // We log it to the console for demonstration.
    console.log("Form submitted successfully:", data);
    // Note: we intentionally don't reset here so the success banner shows.
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back link */}
        <Link
          href="/"
          className="text-sm text-blue-500 hover:underline mb-6 inline-block"
        >
          Back to all posts
        </Link>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Register</h1>
          <p className="text-gray-400 text-sm mb-6">
            All fields are required. Errors appear on blur or submission.
          </p>

          {/* ============================================================
              Success banner — shown after a valid submission
          ============================================================ */}
          {isSubmitSuccessful && (
            <div className="mb-5 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              Registration successful! Check the browser console for the
              submitted data.
            </div>
          )}

          {/* ============================================================
              The form
              noValidate disables the browser's built-in HTML5 validation
              so that Zod/react-hook-form handles everything instead.
          ============================================================ */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >
            {/* ---------- First Name ---------- */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="John"
                // {...register("firstName")} connects this input to react-hook-form.
                // It wires up: onChange, onBlur, ref, and name.
                {...register("firstName")}
                className={
                  "w-full px-3 py-2 border rounded-md text-sm outline-none " +
                  "focus:ring-2 focus:ring-blue-300 transition-colors " +
                  (errors.firstName
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300")
                }
              />
              {/* Display the zod error message if validation failed */}
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* ---------- Last Name ---------- */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Doe"
                {...register("lastName")}
                className={
                  "w-full px-3 py-2 border rounded-md text-sm outline-none " +
                  "focus:ring-2 focus:ring-blue-300 transition-colors " +
                  (errors.lastName
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300")
                }
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* ---------- Email ---------- */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                className={
                  "w-full px-3 py-2 border rounded-md text-sm outline-none " +
                  "focus:ring-2 focus:ring-blue-300 transition-colors " +
                  (errors.email
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300")
                }
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* ---------- Password ---------- */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Minimum 8 characters"
                {...register("password")}
                className={
                  "w-full px-3 py-2 border rounded-md text-sm outline-none " +
                  "focus:ring-2 focus:ring-blue-300 transition-colors " +
                  (errors.password
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300")
                }
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* ---------- Confirm Password ---------- */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                {...register("confirmPassword")}
                className={
                  "w-full px-3 py-2 border rounded-md text-sm outline-none " +
                  "focus:ring-2 focus:ring-blue-300 transition-colors " +
                  (errors.confirmPassword
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300")
                }
              />
              {/*
                This error covers two scenarios:
                1. Field is empty → "Please confirm your password"
                2. Fields don't match → "Passwords do not match"  (from .refine())
              */}
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* ---------- Submit Button ---------- */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-md text-sm transition-colors mt-2"
            >
              {isSubmitting ? "Submitting..." : "Register"}
            </button>

            {/* ---------- Reset Button ---------- */}
            <button
              type="button"
              onClick={() => reset()} // Clears all fields and resets form state
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-2.5 rounded-md text-sm transition-colors"
            >
              Reset Form
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
