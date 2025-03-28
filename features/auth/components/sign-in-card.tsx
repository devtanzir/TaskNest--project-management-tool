"use client"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import DottedSeparator from "@/components/shared/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {signUpWithGithub, signUpWithGoogle} from "@/lib/oauth"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { loginSchema } from "../schemas";
import { useLogin } from "../api/use-login";

const SignInCard = () => {

  const {mutate, isPending} = useLogin()


  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate({json: values});
  };
  return (
    <>
      <Card className="w-full h-full md:w-[487px] border-none shadow-none">
        <CardHeader className="flex items-center justify-center text-center p-7">
          <CardTitle className="text-2xl">Welcome Back!</CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter email address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} size={"lg"} className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <DottedSeparator />
        <CardContent className="p-7 flex flex-col gap-y-4">
          <Button
          onClick={() => signUpWithGoogle()}
            variant={"secondary"}
            size={"lg"}
            disabled={isPending}
            className="w-full"
          >
            {" "}
            <FcGoogle className="mr-2 size-5" /> Login with Google
          </Button>
          <Button
          onClick={() => signUpWithGithub()}
            variant={"secondary"}
            size={"lg"}
            disabled={isPending}
            className="w-full"
          >
            {" "}
            <FaGithub className="mr-2 size-5" /> Login with Github
          </Button>
        </CardContent>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7 flex items-center justify-center">
          <p>
            Don&apos;t have an account?{" "}
            <Link className="text-blue-700" href={"/sign-up"}>
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default SignInCard;
