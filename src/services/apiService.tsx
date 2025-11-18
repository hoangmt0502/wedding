import CONFIG from "../config";
import axios, { AxiosRequestConfig } from "axios";

const API_BASE_URL = CONFIG.API_BASE_URL;
const ACCESS_TOKEN_KEY = CONFIG.ACCESS_TOKEN_KEY;

const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor add token in header
apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const apiService = {
  get: async (endpoint: string, config = {}) => {
    try {
      const response = await apiInstance.get(endpoint, config);
      return response.data;
    } catch (error) {
      console.error("API GET Error:", error);
      throw error;
    }
  },
  post: async (endpoint: string, data?: any) => {
    try {
      const isFormData = data instanceof FormData;

      const response = await apiInstance.post(endpoint, data, {
        headers: isFormData ? undefined : { "Content-Type": "application/json" },
      });

      return response.data;
    } catch (error) {
      console.error("API POST Error:", error);
      throw error;
    }
  },
  put: async (endpoint: string, data?: any) => {
    try {
      const response = await apiInstance.put(endpoint, data);
      return response.data;
    } catch (error) {
      console.error("API PUT Error:", error);
      throw error;
    }
  },
  delete: async (endpoint: string, config = {}) => {
    try {
      const response = await apiInstance.delete(endpoint, config);
      return response.data;
    } catch (error) {
      console.error("API DELETE Error:", error);
      throw error;
    }
  },
  download: async (endpoint: string, config = {}) => {
    try {
      const response = await apiInstance.get(endpoint, {
        ...config,
        responseType: "blob",
      });
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("API DOWNLOAD Error:", error);
      throw error;
    }
  },
  post1: async (endpoint: string, data?: any, config: AxiosRequestConfig = {}) => {
    try {
      const isFormData = data instanceof FormData;

      const response = await apiInstance.post(endpoint, data, {
        headers: {
          ...(isFormData ? { 'Content-Type': 'multipart/form-data' } : {}),
          ...config.headers,
        },
        ...config,
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");

      if (isFirefox) {
        const printWindow = window.open("", "_blank");
        if (!printWindow) return;

        printWindow.document.write(`
          <html>
            <body style="margin:0; padding: 0; width:100vw;">
              <embed style="transform: scale=1.2; transform-origin: 0 0;" src="${url}" type="application/pdf" width="100%" height="100%" />
              <script>
                window.onload = function() {
                  setTimeout(() => {
                    window.print();
                  }, 0);
                };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      } else {
        const win = window.open(url);
        if (win) {
          win.addEventListener("load", () => {
            win.focus();
            win.print();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
          });
        }
      }
    } catch (error) {
      console.error("API POST Error:", error);
      throw error;
    }
  },
  importExcel: async (endpoint: string, file: File, config: AxiosRequestConfig = {}) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await apiInstance.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...config.headers,
        },
        ...config,
      });

      return response.data;
    } catch (error) {
      console.error("API IMPORT EXCEL Error:", error);
      throw error;
    }
  },
  print: async (endpoint: string, config = {}) => {
    try {
      const response = await apiInstance.get(endpoint, {
        ...config,
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");

      if (isFirefox) {
        const printWindow = window.open("", "_blank");
        if (!printWindow) return;

        printWindow.document.write(`
          <html>
            <body style="margin:0; padding: 0; width:100vw;">
              <embed style="transform: scale=1.2; transform-origin: 0 0;" src="${url}" type="application/pdf" width="100%" height="100%" />
              <script>
                window.onload = function() {
                  setTimeout(() => {
                    window.print();
                  }, 0);
                };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      } else {
        const win = window.open(url);
        if (win) {
          win.addEventListener("load", () => {
            win.focus();
            win.print();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
          });
        }
      }
    } catch (error) {
      console.error("API PRINT Error:", error);
      throw error;
    }
  },
  impersonation: async (endpoint: string, token: string) => {
    try {
      const response = await apiInstance.post(endpoint, null, {
        headers: { "X-Impersonation-Key": token },
      });
      return response.data;
    } catch (error) { 
      console.error("API POST Error:", error);
      throw error;
    }
  },
  printWithIframe: async (endpoint: string, config = {}) => {
  try {
    const response = await apiInstance.get(endpoint, {
      ...config,
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    // Tạo iframe ẩn
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;

    iframe.onload = () => {
      const win = iframe.contentWindow;
      if (win) {
        win.focus();

        // cleanup sau khi in xong
        win.addEventListener("afterprint", () => {
          document.body.removeChild(iframe);
          URL.revokeObjectURL(url);
        });

        win.print();
      }
    };

    document.body.appendChild(iframe);
  } catch (error) {
    console.error("API PRINT Error:", error);
    throw error;
  }
},



};

export default apiService;
