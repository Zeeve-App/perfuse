const REGEX_NODE_NAME = /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/;
const REGEX_USERNAME = /^[A-Za-z]([A-Za-z0-9]){7,19}$/;
const REGEX_PASSWORD = /^[A-Za-z0-9]{8,20}$/;

export { REGEX_NODE_NAME, REGEX_USERNAME, REGEX_PASSWORD };
