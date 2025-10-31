const API_BASE_URL = 'http://localhost:3000/api';

// Types
export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'student' | 'teacher';
  isVerified?: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  phone?: string;
  role: 'student' | 'teacher';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Generic API call function
const apiCall = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Authentication API Calls
export const authAPI = {
  // Sign Up
  signUp: async (userData: SignUpData): Promise<AuthResponse> => {
    return await apiCall<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  // Sign In
  signIn: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return await apiCall<AuthResponse>('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  // Request OTP
  requestOTP: async (email: string): Promise<ApiResponse> => {
    return await apiCall<ApiResponse>('/auth/request-otp', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  },

  // Verify OTP
  verifyOTP: async (email: string, otp: string): Promise<AuthResponse> => {
    return await apiCall<AuthResponse>('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp })
    });
  },

  // Forgot Password
  forgotPassword: async (email: string): Promise<ApiResponse> => {
    return await apiCall<ApiResponse>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  },

  // Reset Password
  resetPassword: async (email: string, otp: string, newPassword: string): Promise<ApiResponse> => {
    return await apiCall<ApiResponse>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, otp, newPassword })
    });
  }
};

// Protected API Calls
export const protectedAPI = {
  // Get User Profile
  getProfile: async (): Promise<ApiResponse<{ user: User }>> => {
    return await apiCall<ApiResponse<{ user: User }>>('/protected/profile', {
      method: 'GET',
      headers: getAuthHeaders()
    });
  },

  // Student Dashboard
  getStudentDashboard: async (): Promise<ApiResponse> => {
    return await apiCall<ApiResponse>('/protected/student/dashboard', {
      method: 'GET',
      headers: getAuthHeaders()
    });
  },

  // Teacher Dashboard
  getTeacherDashboard: async (): Promise<ApiResponse> => {
    return await apiCall<ApiResponse>('/protected/teacher/dashboard', {
      method: 'GET',
      headers: getAuthHeaders()
    });
  },

  // Get Courses (for both students and teachers)
  getCourses: async (): Promise<ApiResponse> => {
    return await apiCall<ApiResponse>('/protected/courses', {
      method: 'GET',
      headers: getAuthHeaders()
    });
  }
};

// Auth storage helper
export const authStorage = {
  // Save auth data
  setAuth: (token: string, user: User): void => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Get auth data
  getAuth: (): { token: string | null; user: User | null } => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return {
      token,
      user: user ? JSON.parse(user) : null
    };
  },

  // Clear auth data
  clearAuth: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  // Get user role
  getUserRole: (): string | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : null;
  }
};