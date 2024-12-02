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

/* eslint-disable react/display-name */
import React, { MutableRefObject, forwardRef, useEffect, useId, useState } from "react";
import Select, {
  Props,
  MultiValueRemoveProps,
  GroupBase,
  components,
  SelectInstance,
  DropdownIndicatorProps,
  ClearIndicatorProps,
} from "react-select";
import { RemoveProperties } from "../core";
// import IconArrow2Down from "@/lib/icons/arrows/Icon-arrow-2-down";
import { tx } from "@/utils/shared";
import SvgArrow2Down from "@/lib/icons/arrows/outline/Arrow2Down";

const DropdownIndicator = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: DropdownIndicatorProps<Option, IsMulti, Group>,
) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        fill="none"
        viewBox="0 0 24 24"
        className="text-brand-dark"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1"
          d="M12 6h2.67c3.31 0 4.67 2.35 3.01 5.22l-1.34 2.31L15 15.84c-1.66 2.87-4.37 2.87-6.03 0l-1.34-2.31-1.34-2.31C4.66 8.35 6.01 6 9.33 6H12Z"
        ></path>
      </svg>
    </components.DropdownIndicator>
  );
};

const ClearIndicator = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: ClearIndicatorProps<Option, IsMulti, Group>,
) => {
  return (
    <components.ClearIndicator {...props}>
      <SvgArrow2Down className="rounded-full bg-brand-red/10 p-1 text-xl text-brand-red transition duration-200 ease-in-out hover:bg-brand-red/20" />
    </components.ClearIndicator>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <SvgArrow2Down className="text-lg text-brand-red transition duration-200 ease-in-out hover:text-brand-red/50" />
    </components.MultiValueRemove>
  );
};

interface ReactSelectProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>>
  extends RemoveProperties<Props<Option, IsMulti, Group>, "required"> {
  /** select input size */
  size?: "small" | "medium" | "large";
  /** marks the value-holding input as required for form validation */
  isRequired?: boolean;
}

/**
 * Custom wrapper for `react-select` package.
 * `react-select` is dependent on the browser `window` object to function.
 * The browser’s `window` object is unavailable with `SSR` until a component is fully mounted.
 */
const ReactSelect = forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: ReactSelectProps<Option, IsMulti, Group>,
    ref:
      | ((instance: SelectInstance<Option, IsMulti, Group> | null) => void)
      | MutableRefObject<SelectInstance<Option, IsMulti, Group> | null>
      | null,
  ) => {
    const { size = "medium", isRequired, id, instanceId, ...rest } = props;

    const _id = useId();
    const _instanceId = useId();

    // Must be deleted once
    // https://github.com/JedWatson/react-select/issues/5459 is fixed.
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    return isMounted ? (
      <Select
        unstyled
        ref={ref}
        id={id ?? _id}
        instanceId={instanceId ?? _instanceId}
        required={isRequired}
        styles={{
          container: (base) => ({ ...base, fontWeight: "500" }),
          valueContainer: (base) => ({
            ...base,
            overflow: "auto",
            flexWrap: "nowrap",
          }),
          input: (base) => ({
            ...base,
            "input:focus": {
              boxShadow: "none",
            },
          }),
          multiValueLabel: (base) => ({
            ...base,
            whiteSpace: "normal",
            overflow: "visible",
          }),
          control: (base, state) => ({
            ...base,
            transition: "none",
            ...(state.isDisabled && {
              pointerEvents: "auto",
              cursor: "not-allowed",
            }),
          }),
        }}
        classNames={{
          control: ({ isFocused, isDisabled }) =>
            tx(
              "rounded-lg border border-brand-outline bg-brand-light flex items-center",
              { "h-[50px] max-h-[50px] text-sm placeholder:text-sm": size === "small" },
              { "h-[60px] max-h-[60px] text-base placeholder:text-base": size === "medium" },
              { "h-[70px] max-h-[70px] text-xl placeholder:text-xl": size === "large" },
              { "ring-1 ring-zinc-300": isFocused },
              { "opacity-50": isDisabled },
            ),
          placeholder: () =>
            tx("text-brand-dark/60 px-1", {
              "after:pl-1 after:text-brand-red after:content-['*']": isRequired,
            }),
          input: () => "px-1",
          singleValue: () => "px-1",
          multiValue: () => "bg-gray-100 rounded items-center px-2 gap-1 shrink-0",
          multiValueLabel: () => "leading-6",
          valueContainer: () => "px-3 gap-1 scrollbar-hide",
          indicatorsContainer: () =>
            tx(
              "px-2 gap-1",
              { "h-[50px] max-h-[50px] text-[22px]": size === "small" },
              { "h-[60px] max-h-[60px] text-2xl": size === "medium" },
              { "h-[70px] max-h-[70px] text-3xl": size === "large" },
            ),
          indicatorSeparator: () => "bg-transparent",
          dropdownIndicator: () => "py-0.5 rounded-md",
          menu: () => "px-1 py-1 mt-2 border border-brand-gray/50 shadow rounded-lg bg-white",
          groupHeading: () => "px-3 mt-2 mb-1 font-bold text-brand-gray text-sm",
          option: ({ isFocused, isSelected }) =>
            tx(
              "rounded px-3 py-2 hover:cursor-pointer",
              isFocused && "bg-gray-100 active:bg-gray-200",
              isSelected && "text-brand-gray/70",
            ),
          noOptionsMessage: () => "text-brand-gray p-2 bg-white rounded-sm",
        }}
        components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
        {...rest}
      />
    ) : null;
  },
);

export type { ReactSelectProps };
export { ReactSelect };
