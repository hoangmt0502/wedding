export function extractErrorMessage(error: any): string {
  if (!error) return "";

  if (typeof error === "object") {
    const messages: string[] = [];

    for (const field in error) {
      const fieldErrors = error[field];

      if (Array.isArray(fieldErrors)) {
        messages.push(...fieldErrors);
      } else if (typeof fieldErrors === "string") {
        messages.push(fieldErrors);
      }
    }

    return messages.join("\n");
  }

  if (typeof error === "string") {
    return error;
  }

  if (typeof error.message === "string") {
    return error.message;
  }

  return "";
}