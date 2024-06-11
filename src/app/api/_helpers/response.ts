import HTTP_STATUS from "@/constants/http";

export const sendDataResponse = (data: Record<string, object | string | number>, status?: HTTP_STATUS) => {
  return new Response(
    JSON.stringify({
      success: true,
      data,
    }),
    {
      status: status || 200,
    },
  );
};

export const sendErrorResponse = (data: Record<string, object | string | number>, status?: HTTP_STATUS) => {
  return new Response(
    JSON.stringify({
      success: true,
      data,
    }),
    {
      status: status || 400,
    },
  );
};
