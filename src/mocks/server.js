import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const handlers = [
  // Handler for a successful GET request to test URL
  http.get("http://test.com/data", () => {
    return HttpResponse.json({ message: "Success!" }, { status: 200 });
  }),

  // Handler for an error GET request to test ERROR URL
  http.get("http://test.com/error", () => {
    return HttpResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }),

  // Handler for a delayed GET request to test DELAYED URL
  http.get("http://test.com/delayed-data", async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return HttpResponse.json({ message: "Delayed Data" }, { status: 200 });
  }),
];

export const server = setupServer(...handlers);
