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

/**
 * Transforms a type by making all its properties required and ensuring
 * none of them are `null` or `undefined`.
 *
 * @template T - The original type.
 */
type RequiredNotNull<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

/**
 * Combines the original type `T` with a subset of its properties `P`
 * made required and non-null.
 *
 * @template T - The original type.
 * @template P - The keys in `T` to make required and non-null.
 */
type RequiredProperties<T, P extends keyof T> = T & Required<RequiredNotNull<Pick<T, P>>>;

/**
 * Combines the original type `T` with a subset of its properties `K`
 * made optional, while the rest remain as they are in `T`.
 *
 * @template T - The original type.
 * @template K - The keys in `T` to make optional.
 */
type OptionalProperties<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Creates a new type by removing a subset of properties `K` from the
 * original type `T`.
 *
 * @template T - The original type.
 * @template K - The keys in `T` to exclude from the resulting type.
 */
type RemoveProperties<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type { RequiredProperties, OptionalProperties, RemoveProperties };
