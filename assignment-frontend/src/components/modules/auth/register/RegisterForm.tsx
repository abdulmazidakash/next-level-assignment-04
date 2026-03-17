"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/services/auth";
import { uploadImageToImgbb } from "@/lib/uploadImage";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export function RegisterForm() {

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const file = data.image[0];

      let imageUrl = "";

      if (file) {
        imageUrl = await uploadImageToImgbb(file);
      }

      const payload = {
        ...data,
        image: imageUrl,
        role: "CUSTOMER",
      };

      const result = await registerUser(payload);

      if (result?.success) {
        toast.success("Account created!");
        router.push("/");
      } else {
        toast.error(result.message);
      }

    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">

      <div className="text-center">
        <h1 className="text-3xl font-bold">
          Create Account
        </h1>
        <p className="text-muted-foreground">
          Join FoodHub today 🍔
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <Input
          type="file"
          accept="image/*"
          id="image"
        />

        <Input
          placeholder="Name"
          {...form.register("name")}
        />

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
          Register
        </Button>

      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?
        <Link
          href="/login"
          className="text-primary ml-1"
        >
          Login
        </Link>
      </p>

    </div>
  );
}