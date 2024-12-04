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

import HTTP_STATUS from "@/constants/http";

/** sending a success response back to client */
export const sendDataResponse = (
  data: Record<string, object | string | number | boolean>,
  status?: HTTP_STATUS,
  config?: ResponseInit,
) => {
  return new Response(
    JSON.stringify({
      success: true,
      data,
    }),
    {
      ...config,
      status: status || 200,
    },
  );
};

/** sending a error response back to user */
export const sendErrorResponse = (
  data: Record<string, object | string | number>,
  status?: HTTP_STATUS,
  config?: ResponseInit,
) => {
  return new Response(
    JSON.stringify({
      success: false,
      data,
    }),
    {
      ...config,
      status: status || 400,
    },
  );
};
