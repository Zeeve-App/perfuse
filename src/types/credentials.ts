type AuthenticationMethods = "api_key" | "basic_auth";

const authenticationMethods: {
  name: string;
  value: AuthenticationMethods;
  tooltipText?: string;
  isDisabled?: boolean;
}[] = [
  {
    tooltipText: "Secret key ID gets included in the public endpoint.",
    name: "API Key",
    value: "api_key",
  },
  {
    tooltipText: "Coming soon.",
    name: "Basic",
    value: "basic_auth",
    isDisabled: true,
  },
];

export { authenticationMethods };
export type { AuthenticationMethods };
