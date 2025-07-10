🌟 Chapa Frontend Interview Assignment
This is a Next.js project implementing a role-based dashboard application with authentication, session persistence, and mock APIs. The application supports three user roles—User, Admin, and Super Admin—with distinct dashboard functionalities, including wallet balance, transaction management, user management, admin management, and system statistics. The project uses modern web technologies to deliver a responsive and secure user experience.

🚀 Features
🔐 Authentication


Login System: Secure login with predefined credentials:
🧑 User: john@gmail.com / userpass
👨‍💼 Admin: jane@gmail.com / userpass
👑 Super Admin: super@gmail.com / userpass




Session Persistence: Uses js-cookie to store user data (email, role) 
Homepage Redirect: Redirects to role-specific dashboards on / if logged in:
User → /dashboard/wallet
Admin → /dashboard/users
Super Admin → /dashboard/admins



🖥️ Role-Based Dashboards

User Dashboard:
📊 Wallet: Displays mock wallet balance (e.g., $500.75).
📜 Transactions: Lists recent transactions (50 mock entries) and includes a form to initiate transactions with UI feedback.


Admin Dashboard:
👥 Users: CRUD operations (create, read, delete) for 20 mock users, with toggleable active/inactive status.


Super Admin Dashboard:
🛠️ Admins: Form to add/remove admins (5 mock admins).
📊 Stats: System-wide stats (total payments, active users).



🔒 Access Control

Role-based route protection:
User: Access to /dashboard/wallet, /dashboard/transactions.
Admin: Access to  /dashboard/users, /dashboard/payments.
Super Admin: Access to   /dashboard/admins, /dashboard/stats.


🛠️ Technical Features

Mock APIs: Uses MSW to simulate async APIs for /api/login, /api/transactions, /api/users, and /api/admins.
CRUD Operations: Implemented for users (Admin+) and admins (Super Admin).
Role Enum: Defined in src/types/index.ts for type safety.
Centralized APIs: All API handlers in src/services/api/handlers.ts.


🧰 Technologies Used

Next.js 🌐: React framework for server-side rendering and routing.
TypeScript 🛡️: Static typing for improved code reliability.
Redux Toolkit 🗃️: State management for user authentication.
Tailwind CSS 🎨: Utility-first CSS framework for responsive styling.
React Hook Form 📝: Performant form handling with validation.
Zod ✅: Schema validation for forms and API payloads.
MSW (Mock Service Worker) 🕸️: Mock API endpoints for development.
Recharts 📊: Charting library for payment summaries.
js-cookie 🍪: Client-side cookie management for session persistence.
Lucide React 🖼️: Icon library for UI elements (e.g., logout icon).


📂 Project Structure (I used clean Archticure)
chapa-frontend-interview-assignment/
├── public/
│   └── mockServiceWorker.js       # MSW service worker
├── src/
│   ├── components/
│   │   ├── SigninForm.tsx         # Login form
│   │   ├── TransactionForm.tsx    # Transaction initiation form
│   │   ├── UserList.tsx           # User management with CRUD
│   │   ├── PaymentSummary.tsx     # Payment summary chart
│   │   └── AdminForm.tsx          # Admin management form
│   ├── redux/
│   │   ├── slices/
│   │   │   └── authSlice.ts       # Auth state management
│   │   ├── hooks.ts               # Typed Redux hooks
│   │   └── store.ts               # Redux store configuration
│   ├── services/
│   │   ├── api/
│   │   │   └── handlers.ts        # Centralized MSW API handlers
│   │   └── mocks/
│   │       ├── users.ts           # 20 mock users
│   │       ├── transactions.ts    # 50 mock transactions
│   │       └── admins.ts          # 5 mock admins
│   ├── types/
│   │   └── index.ts               # Role enum and type definitions
├── app/
│   ├── dashboard/
│   │   ├── layout.tsx             # Dashboard layout with sidebar
│   │   ├── page.tsx               # Dashboard entry (redirects)
│   │   ├── wallet/page.tsx        # Wallet page
│   │   ├── transactions/page.tsx  # Transactions page
│   │   ├── users/page.tsx         # Users page
│   │   ├── payments/page.tsx      # Payments page
│   │   ├── admins/page.tsx        # Admins page
│   │   ├── stats/page.tsx         # Stats page
│   ├── _not-found/page.tsx        # Custom 404 page
│   ├── layout.tsx                 # Root layout (Redux, Tailwind)
│   ├── page.tsx                   # Homepage (SigninForm)
│   └── globals.css                # Tailwind styles
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── next.config.mjs                # Next.js config
├── tailwind.config.ts             # Tailwind config
├── postcss.config.mjs             # PostCSS config


⚙️ Setup Instructions

Clone the Repository:
git clone <repository-url>
cd chapa-frontend-interview-assignment


Install Dependencies:
yarn /yarn install 


Setup MSW:
npx msw init public/ --save


Ensures public/mockServiceWorker.js is created.


Run Development Server:
yarn run dev


Open http://localhost:3000.
Verify console shows [MSW] Mocking enabled.




🧪 Testing Instructions
1. Homepage Redirect 🔗

![image](https://github.com/user-attachments/assets/ab370f31-4925-494f-9c04-96fc92d2b78f)


No Cookie:
Visit http://localhost:3000 → Shows login form.


With Cookie:
Log in with  email and password
Revisit http://localhost:3000 → Redirects to /dashboard/wallet.
Repeat for:
admin@gmail.com/admin → /dashboard/users.
superadmin@gmail.com/superadmin → /dashboard/admins.





2. User Dashboard 🧑

Log in as john@gmail.com / userpass → Redirects to /dashboard/wallet.
![image](https://github.com/user-attachments/assets/e0f50842-dc41-4cc2-967a-4a043d886f54)


Wallet (/dashboard/wallet):
![image](https://github.com/user-attachments/assets/c5643543-b5c9-450d-a887-8dadc4d79472)

![image](https://github.com/user-attachments/assets/1e97a90a-7d32-4f67-a00d-cfb257df4593)

Shows balance (e.g., $500.75).
![image](https://github.com/user-attachments/assets/ff263cc7-e015-43ab-b8c4-01ec3a28dda3)

Transactions (/dashboard/transactions):
Lists 20 transactions (filtered by user ID).
Submit transaction (e.g., Amount: 100, Description: Test) → Shows “Transaction initiated successfully!”.
Verify no redirect to /dashboard/wallet.





3. Admin Dashboard 👨‍💼

Log in as   jane@gmail.com / userpass
Users (/dashboard/users):
Toggle status (e.g., Deactivate Alice Johnson) → Updates to inactive.
Edit user (e.g., change Bob Brown’s name) → Saves changes.
![image](https://github.com/user-attachments/assets/04c877a4-69df-4423-82f7-9b6afd82e66c)


Payments (/dashboard/payments):
Shows by card of user payments.

![image](https://github.com/user-attachments/assets/456c0e3c-b5dd-4f16-9469-8ccc07dd89be)






4. Super Admin Dashboard 👑

Log in as super@gmail.com / userpass
Admins (/dashboard/admins):
Lists 5 admins.
Delete admin (e.g., Michael Brown) → Removes from list.
![image](https://github.com/user-attachments/assets/326cb32c-711a-4ed0-a953-5d16845aa2c7)

![image](https://github.com/user-attachments/assets/881551c5-94fa-4d17-9788-81260fbcbced)



Stats (/dashboard/stats):
Shows total payments and active users.
![image](https://github.com/user-attachments/assets/762da597-0be9-4d43-b205-6d769e07d133)




5. Error Handling 🚨

Invalid login (e.g., invalid@gmail.com/wrongpass) → Shows “Invalid email or password”.
Non-Gmail email → Shows “Email must be a Gmail address”.

6, Fully mobile responsive 

![image](https://github.com/user-attachments/assets/8a994f8b-d436-409e-bc5e-f2ed47aa3e3c)

![image](https://github.com/user-attachments/assets/086de72b-c381-4e72-9ffd-e445e2964173)

![image](https://github.com/user-attachments/assets/47c62d01-1a86-4503-9e07-f10c23d4f9e4)





🛠️ Troubleshooting

Redirect Issues 🚫:
Ensure app/dashboard/page.tsx checks pathname === '/dashboard'.
Verify app/dashboard/layout.tsx uses permittedRoutes for access control.
Check cookie in DevTools > Application > Cookies.



TypeScript Errors:
For ts(7016) with js-cookie:npm install --save-dev @types/js-cookie


Clear .next cache:rm -rf .next


MSW Issues:
Ensure public/mockServiceWorker.js exists.
Re-run:npx msw init public/ --save


Check console for [MSW] Mocking enabled.




📝 Notes

Redirect Fix: Prevents /dashboard/transactions from redirecting to /dashboard/wallet for User role.
Unauthorized Message: Displays for restricted routes instead of 404.
CRUD Operations: Implemented for users and admins via mock APIs.
Mock Data: Includes 20 users, 50 transactions, 5 admins.
Role Enum: Defined in src/types/index.ts for type safety.
Centralized APIs: All handlers in src/services/api/handlers.ts.

For further enhancements or issues, contact the developer with specific details (e.g., console errors, desired features).


Built with ❤️ using Next.js and TypeScript on July 9, 2025.
