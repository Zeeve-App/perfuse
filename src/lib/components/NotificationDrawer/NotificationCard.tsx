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

import React from "react";
import { format } from "date-fns";
import { Heading } from "../Heading";
import { Notification } from "./types";
import SvgInfoCircle from "@/lib/icons/essential/outline/InfoCircle";
import SvgExclamationTriangle from "@/lib/icons/essential/outline/ExclamationTriangle";
import SvgXMarkCircle from "@/lib/icons/essential/outline/XMarkCircle";
import SvgCheckCircle from "@/lib/icons/essential/outline/CheckCircle";

const NotificationCard = ({ item }: { item: Notification }) => {
  let status: React.ReactElement;

  switch (item.level) {
    case "info": {
      status = (
        <div className="flex size-full items-center justify-center rounded-full bg-brand-purple text-white">
          <SvgInfoCircle />
        </div>
      );
      break;
    }
    case "warning": {
      status = (
        <div className="flex size-full items-center justify-center rounded-full bg-brand-yellow text-white">
          <SvgExclamationTriangle />
        </div>
      );
      break;
    }
    case "error":
      status = (
        <div className="flex size-full items-center justify-center rounded-full bg-brand-red text-white">
          <SvgXMarkCircle />
        </div>
      );

      break;
    default:
      status = (
        <div className="flex size-full items-center justify-center rounded-full bg-brand-green text-white">
          <SvgCheckCircle />
        </div>
      );
      break;
  }

  return (
    <a
      href={item.redirection?.URL ? item.redirection.URL : "#"}
      className="flex flex-row items-start justify-start gap-4 border-b border-brand-outline p-6"
      target={item.redirection?.newTab ? "_blank" : "_self"}
      rel={item.redirection?.newTab ? "noopener noreferrer" : undefined}
    >
      {/* status indicator */}
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-outline p-1">{status}</div>
      {/* notification details */}
      <div className="relative flex w-full flex-col gap-y-2">
        <div className="flex flex-col gap-y-1">
          <Heading as="h6" className="break-words">
            {item.heading}
          </Heading>
          <p className="break-words text-sm text-brand-gray">{item.description}</p>
        </div>
        <p className="text-xs text-brand-gray">{format(new Date(item.createdAt), "MMM dd, yyyy 'at' hh:mm a")}</p>
        {/* read indicator */}
        <span className="absolute right-0 top-0">
          {item.read ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10.8124 4.43829C10.5687 4.19454 10.1749 4.19454 9.93115 4.43829L6.40615 7.96329L7.2874 8.84454L10.8124 5.31329C11.0499 5.07579 11.0499 4.67579 10.8124 4.43829ZM13.4624 4.43204L7.2874 10.607L5.1124 8.43829C4.86865 8.19454 4.4749 8.19454 4.23115 8.43829C3.9874 8.68204 3.9874 9.07579 4.23115 9.31954L6.84365 11.932C7.0874 12.1758 7.48115 12.1758 7.7249 11.932L14.3437 5.31954C14.5874 5.07579 14.5874 4.68204 14.3437 4.43829H14.3374C14.0999 4.18829 13.7062 4.18829 13.4624 4.43204ZM0.699902 9.32579L3.3124 11.9383C3.55615 12.182 3.9499 12.182 4.19365 11.9383L4.63115 11.5008L1.58115 8.43829C1.3374 8.19454 0.943652 8.19454 0.699902 8.43829C0.456152 8.68204 0.456152 9.08204 0.699902 9.32579Z"
                fill="url(#paint0_linear_854_80815)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_854_80815"
                  x1="0.51709"
                  y1="5.17601"
                  x2="14.6862"
                  y2="5.51877"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#32B8B2" />
                  <stop offset="1" stopColor="#088DB2" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10.8124 4.43829C10.5687 4.19454 10.1749 4.19454 9.93115 4.43829L6.40615 7.96329L7.2874 8.84454L10.8124 5.31329C11.0499 5.07579 11.0499 4.67579 10.8124 4.43829ZM13.4624 4.43204L7.2874 10.607L5.1124 8.43829C4.86865 8.19454 4.4749 8.19454 4.23115 8.43829C3.9874 8.68204 3.9874 9.07579 4.23115 9.31954L6.84365 11.932C7.0874 12.1758 7.48115 12.1758 7.7249 11.932L14.3437 5.31954C14.5874 5.07579 14.5874 4.68204 14.3437 4.43829H14.3374C14.0999 4.18829 13.7062 4.18829 13.4624 4.43204ZM0.699902 9.32579L3.3124 11.9383C3.55615 12.182 3.9499 12.182 4.19365 11.9383L4.63115 11.5008L1.58115 8.43829C1.3374 8.19454 0.943652 8.19454 0.699902 8.43829C0.456152 8.68204 0.456152 9.08204 0.699902 9.32579Z"
                fill="#57647D"
              />
            </svg>
          )}
        </span>
      </div>
    </a>
  );
};

export { NotificationCard };
