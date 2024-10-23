/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * Copyright (C) 2024 [Perfuse]
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormField } from "@/lib/components/Form/FormField";
import { Input, Label } from "@/lib/components/Form";
import { Heading } from "@/lib/components/Heading";
import { Button } from "@/lib/components/Button";
import { withBasePath } from "@/utils/helpers";
import { tx } from "@/utils/shared";

const loginSchema = yup.object({
  email: yup.string(),
  password: yup.string(),
});

type LoginSchemaType = yup.InferType<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(loginSchema),
    mode: "all",
    defaultValues: {},
  });

  const onSubmit = async (data: LoginSchemaType) => {
    console.log(data);
    await axios.post("/api/login", {
      email: data.email,
      password: data.password,
    });
    router.push("/");
  };

  return (
    <div
      className={tx(`grid h-screen grid-cols-12 gap-3 bg-[#100628] text-[#D2D2D2] bg-cover`)}
      style={{
        backgroundImage: `URL("${withBasePath("/assets/images/login/login-bg.png")}")`,
      }}
    >
      <div className="col-span-6 flex max-w-fit items-center justify-center rounded-lg p-6 lg:p-12">
        <div className="m-auto flex flex-col   justify-evenly gap-3 align-middle lg:gap-6 lg:p-6">
          <div className="flex items-center justify-center gap-4">
            {
              <Image
                src={withBasePath("/assets/images/perfuse-no-bg.svg")}
                alt="Zeeve Logo"
                width={200}
                height={200}
                className="w-72"
              />
            }
            <p>| Powered by Zeeve</p>
          </div>
          <Heading className="text-6xl text-[#D2D2D2]" as="h1">
            <span className="text-theme-gradient">
              Build, Deploy <br />
            </span>
            and <span className="text-theme-gradient">Manage</span>
            <br /> your Blockchain
            <br /> apps and nodes
          </Heading>
          <p className="">Save up to 97% in time and 60%+ in costs using Zeeve</p>
        </div>
      </div>
      <div className="col-span-12 flex h-full items-center justify-center  lg:col-span-5">
        <form
          autoComplete="off"
          className="rounded-2xl border-2 border-transparent bg-[linear-gradient(180deg,rgba(57,19,147,0.3)_0%,rgba(17,6,45,0)_100%)] p-6 lg:p-12"
          onSubmit={handleSubmit(onSubmit)}
          style={{
            borderImageSource: "linear-gradient(162.28deg, #AA25D9 12.8%, rgba(14, 4, 38, 0) 62.41%)",
            borderImageSlice: 1,
          }}
        >
          {/* form fields */}
          <div className="flex flex-col gap-3 lg:gap-6">
            <div>
              <Heading className="text-[#D2D2D2]" as="h2">
                Welcome To Perfuse
              </Heading>
              <p className="text-white">Login to your account</p>
            </div>
            <FormField
              className="col-span-12 md:col-span-6 lg:col-span-3"
              helper={{
                status: "error",
                text: errors.email?.message,
              }}
            >
              <Label className="text-white">Email Address</Label>
              <Input {...register("email")} type="text" isRequired placeholder="Email" />
            </FormField>
            <FormField
              className="col-span-12 md:col-span-6 lg:col-span-3"
              helper={{
                status: "error",
                text: errors.password?.message,
              }}
            >
              <Label className="text-white">Password</Label>
              <Input {...register("password")} type="text" isRequired placeholder="Password" />
            </FormField>
            <Button
              type="submit"
              variant={"solid"}
              colorScheme={"primary"}
              isDisabled={!isValid}
              size={"large"}
              className="w-full rounded-sm bg-theme-purple-gradient"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
