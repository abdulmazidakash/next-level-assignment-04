"use client";

import { loginUser } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

export function LoginForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const res = await loginUser(data);

    if (res?.success) {
      toast.success("Login successful");
      router.push("/");
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">

      <div className="text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-muted-foreground">
          Welcome back 👋
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >

        <Input
          placeholder="Email"
          {...form.register("email")}
        />

        <Input
          type="password"
          placeholder="Password"
          {...form.register("password")}
        />

        <Button className="w-full">
          Login
        </Button>

      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?
        <Link
          href="/register"
          className="text-primary ml-1"
        >
          Register
        </Link>
      </p>

    </div>
  );
}