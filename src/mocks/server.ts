import { setupServer } from "msw/node";
import { http, HttpHandler, HttpResponse } from "msw";

type SuccessResponse = {
  message: string,
}

type ErrorResponse = {
  error: string,
}

type DelayedResponse = {
  message: string,
}

export const handlers: HttpHandler[] = [
  // Handler for a successful GET request to test URL
  http.get("http://test.com/data", () => {
    return HttpResponse.json<SuccessResponse>({ message: "Success!" }, { status: 200 });
  }),

  // Handler for an error GET request to test ERROR URL
  http.get("http://test.com/error", () => {
    return HttpResponse.json<ErrorResponse>({ error: "Failed to fetch" }, { status: 500 });
  }),

  // Handler for a delayed GET request to test DELAYED URL
  http.get("http://test.com/delayed-data", async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return HttpResponse.json<DelayedResponse>({ message: "Delayed Data" }, { status: 200 });
  }),
];

export const server = setupServer(...handlers);
