/** type of error response returned by parachains backend service */
type ParachainsServiceError = {
  error?: {
    reason?: string;
    details?: string;
  };
};

export type { ParachainsServiceError };
