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

/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Utility type to define a component that can accept an `as` prop to render
 * a different React element or component type.
 *
 * @template C - The type of the React element or component.
 */
type As<C extends React.ElementType> = {
  as?: C;
};

/**
 * Utility type to extract the props of a given component, considering JSX intrinsic elements
 * or custom React components.
 *
 * @template C - The type of the component (JSX element or React component).
 */
type PropsOf<C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> = JSX.LibraryManagedAttributes<
  C,
  React.ComponentProps<C>
>;

/**
 * Utility type to compute the keys to omit when combining props.
 * It merges the `As` type and custom props and calculates their keys.
 *
 * @template C - The React element or component type.
 * @template P - Additional props to include.
 */
type PropsToOmit<C extends React.ElementType, P> = keyof (As<C> & P);

/**
 * Type to define props for a polymorphic component that supports the `as` prop.
 * Combines:
 * - The `as` prop for rendering a different element/component.
 * - The component's own props.
 * - Omits conflicting props derived from the `as` type and custom props.
 *
 * @template C - The React element or component type.
 * @template Props - Additional custom props for the component.
 */
type PolymorphicComponentProps<C extends React.ElementType, Props = {}> = React.PropsWithChildren<Props & As<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

/**
 * Type to extract the `ref` type for a given React component or element.
 *
 * @template C - The React element or component type.
 */
type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>["ref"];

/**
 * Type to define props for a polymorphic component that includes support for refs.
 * Extends `PolymorphicComponentProps` with a `ref` property.
 *
 * @template C - The React element or component type.
 * @template Props - Additional custom props for the component.
 */
type PolymorphicComponentPropsWithRef<C extends React.ElementType, Props = {}> = PolymorphicComponentProps<C, Props> & {
  ref?: PolymorphicRef<C>;
};

export type { As, PropsOf, PropsToOmit, PolymorphicComponentProps, PolymorphicRef, PolymorphicComponentPropsWithRef };
