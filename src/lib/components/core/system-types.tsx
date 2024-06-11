/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
type As<C extends React.ElementType> = {
  as?: C;
};

type PropsOf<C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> = JSX.LibraryManagedAttributes<
  C,
  React.ComponentProps<C>
>;

type PropsToOmit<C extends React.ElementType, P> = keyof (As<C> & P);

type PolymorphicComponentProps<C extends React.ElementType, Props = {}> = React.PropsWithChildren<Props & As<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>["ref"];

type PolymorphicComponentPropsWithRef<C extends React.ElementType, Props = {}> = PolymorphicComponentProps<C, Props> & {
  ref?: PolymorphicRef<C>;
};

export type { As, PropsOf, PropsToOmit, PolymorphicComponentProps, PolymorphicRef, PolymorphicComponentPropsWithRef };
