import { FAST_API_ORIGIN } from "../constants";
import { getData } from "./index";

global.fetch = jest.fn();

jest.mock("../constants", () => ({
  PAGINATION_SIZE: "14",
  FAST_API_ORIGIN: "http://127.0.0.1:8000/",
}));

describe("getData()", () => {
  const mockPath = "test-path";
  const mockController = new AbortController();
  const mockUrl = `${FAST_API_ORIGIN}contributions/${mockPath}`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Happy path", () => {
    it("should fetch data successfully and return JSON response", async () => {
      const mockResponseData = { key: "value" };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponseData),
      });

      const result = await getData<typeof mockResponseData>(
        mockPath,
        mockController,
      );

      expect(fetch).toHaveBeenCalledWith(mockUrl, {
        signal: mockController.signal,
      });
      expect(result).toEqual(mockResponseData);
    });

    it("should handle non-OK response status by throwing an error", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: "Not Found",
      });
      const result = await getData(mockPath, mockController);
      expect(fetch).toHaveBeenCalledWith(mockUrl, {
        signal: mockController.signal,
      });
      expect(result).toEqual({});
    });

    it("should handle fetch throwing a TypeError", async () => {
      const typeError = new TypeError("Failed to fetch");
      (fetch as jest.Mock).mockRejectedValueOnce(typeError);
      const result = await getData(mockPath, mockController);
      expect(fetch).toHaveBeenCalledWith(mockUrl, {
        signal: mockController.signal,
      });
      expect(result).toEqual({});
    });

    it("should handle fetch throwing a generic error", async () => {
      const genericError = new Error("Network error");
      (fetch as jest.Mock).mockRejectedValueOnce(genericError);
      const result = await getData(mockPath, mockController);
      expect(fetch).toHaveBeenCalledWith(mockUrl, {
        signal: mockController.signal,
      });
      expect(result).toEqual({});
    });
  });
});
