"use client";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

import { createProvider } from "@/services/provider";
import { useRouter } from "next/navigation";

const providerSchema = z.object({
  restaurantName: z.string().min(3),
  bio: z.string().min(5),
  address: z.string().min(5),
  cuisineType: z.string().min(3),
});

export function CreateProviderFormClient() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      restaurantName: "",
      bio: "",
      address: "",
      cuisineType: "",
    },

    validators: {
      onSubmit: providerSchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating provider profile...");

      try {
        const res = await createProvider(value);

        if (res?.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }

        toast.success("Provider profile created", { id: toastId });
        router.push('/dashboard/profile')
        form.reset();
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create Provider Profile</CardTitle>
        <CardDescription>
          Add your restaurant information
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="provider-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>

            {/* Restaurant Name */}
            <form.Field
              name="restaurantName"
              children={(field) => (
                <Field>
                  <FieldLabel>Restaurant Name</FieldLabel>

                  <Input
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="Burger House"
                  />

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            {/* Bio */}
            <form.Field
              name="bio"
              children={(field) => (
                <Field>
                  <FieldLabel>Bio</FieldLabel>

                  <Textarea
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="Best burgers in town..."
                  />

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            {/* Address */}
            <form.Field
              name="address"
              children={(field) => (
                <Field>
                  <FieldLabel>Address</FieldLabel>

                  <Input
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="Dhaka, Bangladesh"
                  />

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            {/* Cuisine Type */}
            <form.Field
              name="cuisineType"
              children={(field) => (
                <Field>
                  <FieldLabel>Cuisine Type</FieldLabel>

                  <Input
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="Fast Food / Chinese / Italian"
                  />

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          form="provider-form"
          className="w-full"
        >
          Create Provider Profile
        </Button>
      </CardFooter>
    </Card>
  );
}