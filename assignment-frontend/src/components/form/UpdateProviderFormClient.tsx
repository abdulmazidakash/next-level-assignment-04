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

import { updateProvider } from "@/services/provider";
import { useRouter } from "next/navigation";

const providerSchema = z.object({
  restaurantName: z.string().min(3),
  bio: z.string().min(5),
  address: z.string().min(5),
  cuisineType: z.string().min(3),
});

export function UpdateProviderFormClient({ provider }: any) {
    const router = useRouter();

  const form = useForm({
    defaultValues: {
      restaurantName: provider.restaurantName || "",
      bio: provider.bio || "",
      address: provider.address || "",
      cuisineType: provider.cuisineType || "",
    },

    validators: {
      onSubmit: providerSchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating provider profile...");

      try {
        const res = await updateProvider(value);

        if (res?.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }

        toast.success("Provider profile updated", { id: toastId });

        router.push('/dashboard/profile')

      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Update Provider Profile</CardTitle>
        <CardDescription>
          Edit your restaurant information
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="provider-update-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>

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
                  />

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

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
                  />

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

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
                  />

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

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
          form="provider-update-form"
          className="w-full"
        >
          Update Provider Profile
        </Button>
      </CardFooter>
    </Card>
  );
}