import React from "react";
import { headers } from "next/headers";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { redirect } from "next/navigation";
import { Typography } from "@/lib/components/Typography";
import { withBasePath } from "@/utils/helpers";
import { tx } from "@/utils/shared";
import HyperLink from "@/lib/components/utils/hyper-link";

export default function Home() {
  const header = headers();
  const rawCookie = header.get("cookie");
  const cookie = parseCookie(rawCookie ?? "");
  const token = cookie.get("accessToken");
  if (!token) {
    return redirect("/login");
  }
  return (
    <div className={tx(`grid grid-cols-12 gap-3 `)}>
      <div className="col-span-12 flex h-full items-center justify-center align-middle">
        <div className="w-1/2 ">
          <div className="flex flex-col justify-between gap-3">
            <Typography className="" variant="title">
              Error 404: Page Not Found
            </Typography>
            <Typography variant="paragraph">
              The resource you’re trying to access is unavailable. This may be due to a broken link or an incorrect URL.
              <HyperLink href={withBasePath("/")}>[Return to Homepage]</HyperLink>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
