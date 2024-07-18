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
    <div className="grid h-screen grid-cols-12 gap-3 bg-brand-light">
      <div className="col-span-6 h-full rounded-lg  ">
        <div className="flex flex-col items-center  justify-evenly gap-3 p-3 align-middle lg:gap-6 lg:p-6">
          <div className="flex flex-col items-center justify-center">
            <Image src={withBasePath("/logo.png")} alt="Zeeve Logo" width={50} height={50} />
            <Heading as="h3">Perfuse</Heading>
          </div>
          <Heading as="h2">
            Build, Deploy and Manage <br />
            your Parachains <br />
            node infrastructure
          </Heading>
        </div>
      </div>
      <div className="col-span-12 rounded-lg  bg-white shadow-brand-shadow lg:col-span-5">
        <form autoComplete="off" className="" onSubmit={handleSubmit(onSubmit)}>
          {/* form fields */}
          <div className="flex flex-col gap-3 p-3 lg:gap-6 lg:p-6">
            <Heading as="h2">Welcome To Perfuse</Heading>
            <Heading as="h3">Login to your account</Heading>
            <FormField
              className="col-span-12 md:col-span-6 lg:col-span-3"
              helper={{
                status: "error",
                text: errors.email?.message,
              }}
            >
              <Label>Email Address</Label>
              <Input
                {...register("email")}
                type="text"
                isRequired
                placeholder="Email"
                floatingLabel={{
                  labelText: "Email",
                }}
              />
            </FormField>
            <FormField
              className="col-span-12 md:col-span-6 lg:col-span-3"
              helper={{
                status: "error",
                text: errors.password?.message,
              }}
            >
              <Label>Password</Label>
              <Input
                {...register("password")}
                type="text"
                isRequired
                placeholder="Password"
                floatingLabel={{
                  labelText: "Password",
                }}
              />
            </FormField>
          </div>
          <div className="flex w-full items-center justify-end gap-4 px-6 py-4">
            <Button type="submit" variant={"outline"} isDisabled={!isValid} size={"large"}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
