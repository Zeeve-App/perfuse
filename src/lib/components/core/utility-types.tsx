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

type RequiredNotNull<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

type RequiredProperties<T, P extends keyof T> = T & Required<RequiredNotNull<Pick<T, P>>>;
type OptionalProperties<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type RemoveProperties<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type { RequiredProperties, OptionalProperties, RemoveProperties };
