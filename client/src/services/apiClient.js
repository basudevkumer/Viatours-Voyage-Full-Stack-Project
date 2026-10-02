const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";

export class ApiError extends Error {
  constructor(message, { status = 0, errors = [], response } = {}) {
    super(message || "The request could not be completed.");
    this.name = "ApiError";
    this.success = false;
    this.status = status;
    this.errors = Array.isArray(errors) ? errors : [];
    this.response = response;
  }
}

export async function apiRequest(path, { timeout = 10000, headers = {}, ...options } = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(`${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`, {
      ...options,
      headers: { Accept: "application/json", ...(options.body ? { "Content-Type": "application/json" } : {}), ...headers },
      signal: controller.signal,
    });
    const body = response.status === 204 ? null : await response.json().catch(() => null);
    if (!response.ok || body?.success === false) throw new ApiError(body?.message || `Request failed (${response.status}).`, { status: response.status, errors: body?.errors, response: body });
    if (body && typeof body === "object" && "success" in body) return body;
    return { success: true, message: "Request completed.", data: body };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error.name === "AbortError") throw new ApiError("The request timed out.");
    throw new ApiError(error.message || "A network error occurred.");
  } finally { clearTimeout(timeoutId); }
}

export default apiRequest;
