import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { AuthState, User, Role, StatusType, Transaction, Stats } from "@/types";

export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
  const response = await fetch("/api/users");
  return await response.json();
});

export const toggleUserStatus = createAsyncThunk(
  "auth/toggleUserStatus",
  async ({ userId, status }: { userId: number; status: StatusType }) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    return await response.json();
  }
);

export const addAdmin = createAsyncThunk(
  "auth/addAdmin",
  async (adminData: { name: string; email: string }) => {
    const response = await fetch("/api/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminData),
    });
    return await response.json();
  }
);

export const removeAdmin = createAsyncThunk(
  "auth/removeAdmin",
  async (userId: number) => {
    await fetch(`/api/admins/${userId}`, { method: "DELETE" });
    return userId;
  }
);

export const fetchTransactions = createAsyncThunk(
  "auth/fetchTransactions",
  async (userId: number) => {
    const response = await fetch(`/api/transactions?userId=${userId}`);
    const data = await response.json();
    console.log("fetchTransactions raw response:", data); // Debug API response
    // Filter out undefined/null transactions and ensure valid structure
    const validTransactions = (data.transactions || []).filter(
      (tx: Transaction) =>
        tx &&
        tx.id &&
        typeof tx.amount === "number" &&
        tx.date &&
        tx.status &&
        tx.recipient
    );
    return validTransactions;
  }
);

export const initiateTransaction = createAsyncThunk(
  "auth/initiateTransaction",
  async (transactionData: {
    userId: number;
    amount: number;
    recipient: string;
  }) => {
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactionData),
    });
    const data = await response.json();
    if (!data.transaction) throw new Error("Invalid transaction data received");
    return data.transaction;
  }
);

export const fetchStats = createAsyncThunk("auth/fetchStats", async () => {
  const response = await fetch("/api/stats");
  return await response.json();
});

const initialState: AuthState = {
  user: null,
  email: null,
  role: Role.USER,
  isAuthenticated: false,
  users: [],
  transactions: [],
  stats: null,
  status: "idle",
  transactionsLoaded: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; role: Role }>) => {
      state.user = action.payload.user;
      state.email = action.payload.user.email;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      document.cookie = `role=${action.payload.role}; path=/`;
    },
    logout: (state) => {
      state.user = null;
      state.email = null;
      state.role = Role.USER;
      state.isAuthenticated = false;
      document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    },
    setUser: (
      state,
      action: PayloadAction<{ id: number; email: string; role: Role }>
    ) => {
      state.user = {
        id: action.payload.id,
        email: action.payload.email,
        role: action.payload.role,
      } as User;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },

    clearUser: (state) => {
      state.user = null;
      state.email = null;
      state.role = Role.USER;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        const exists = state.users.find(
          (u) => u.email === action.payload.email
        );
        if (exists) {
          exists.role = Role.ADMIN;
        } else {
          state.users.push(action.payload);
        }
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.users = state.users.map((u) =>
          u.id === updatedUser.id ? updatedUser : u
        );
      })
      .addCase(removeAdmin.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      })
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
        state.transactionsLoaded = false;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.status = "succeeded";
        state.transactionsLoaded = true;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch transactions";
        state.transactionsLoaded = true;
      })

      .addCase(initiateTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(fetchStats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch stats";
      });
  },
});

export const { login, logout, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

function addCase(
  fulfilled: ActionCreatorWithPreparedPayload<
    [any, string, { name: string; email: string }, unknown?],
    any,
    string,
    never,
    {
      arg: { name: string; email: string };
      requestId: string;
      requestStatus: "fulfilled";
    }
  >,
  arg1: (state: any, action: any) => void
) {
  throw new Error("Function not implemented.");
}
