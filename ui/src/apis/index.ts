import { FAST_API_ORIGIN } from "../constants";
const FAST_API = `${FAST_API_ORIGIN}contributions`;

export async function getData<T>(
  path: string,
  controller: AbortController,
): Promise<T> {
  let response: Response;
  let resJSON: T = {} as T;
  try {
    response = await fetch(`${FAST_API}/${path}`, {
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    resJSON = await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("There is a Typeerror", error);
    } else {
      console.error("There was a problem with the Fetch operation:", error);
    }
  }
  return resJSON;
}
