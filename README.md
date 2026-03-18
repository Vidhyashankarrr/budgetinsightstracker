# Title: 📊 Budget Insights & Expense Tracker
## 🔗 Live Demo
[https://miniproject-budget-buddy.vercel.app/]

1. Project Overview

Budget Insights & Expense Tracker is a web-based application that helps users track their income, expenses, and monthly budget in an organized way.
The application provides real-time balance calculation, transaction history, visual insights, and budget monitoring to help users manage their finances effectively.

2. Project Objectives

Track income and expenses manually

Categorize expenses (Food, Transport, Bills, etc.)

Display real-time balance updates

Monitor monthly/yearly spending

Set a monthly budget and track remaining balance

Visualize spending using charts

Store data locally for persistence

3. Technology Stack
Category	Technology

Frontend	React (Vite)

Styling	Tailwind CSS

Charts	Chart.js / Recharts

State Management	React Hooks

Storage	LocalStorage

Routing	React Router DOM

4. Core Features
4.1 Dashboard

The dashboard provides an overview of the user’s financial status.

Includes:

Total Balance

Total Income

Total Expense

Monthly / Yearly toggle

Budget tracker

Recent transactions

Visual charts

4.2 Income Management

Add income transactions using a form

Specify:

Title

Amount

Category

Automatically updates total income and balance

4.3 Expense Management

Add expense transactions

Categorize expenses:

Food

Transport

Bills

Entertainment

Other

Automatically deducts from balance

Helps track spending habits

4.4 Transaction History

Displays recent transactions

Shows:

Transaction title

Category

Amount (+ / −)

Delete transactions



4.5 Budget Tracking

Set a monthly budget

Displays:

Total spent

Remaining balance

Progress bar

Shows warning when budget limit is exceeded

4.6 Visual Analytics

Charts provide clear insights into financial data.

Charts Used:

Pie Chart – Expense category distribution

Bar Chart – Income vs Expense comparison

Line Chart – Spending trend over time

5. Data Handling
Local Storage

All transactions are stored using LocalStorage

Data persists even after page refresh

No backend required

6. Application Structure
src/
│
├── components/

│   ├── Sidebar.jsx

│   ├── SummaryCards.jsx

│   ├── AddTransaction.jsx

│   ├── RecentTransactions.jsx

│   ├── Charts.jsx

│   ├── BudgetTracker.jsx
│
├── pages/

│   ├── Dashboard.jsx

│   ├── Income.jsx

│   ├── Expense.jsx

│
├── App.jsx

├── main.jsx

8. State Management

The application uses React Hooks:

useState – Manage transactions, budget, filters

useEffect – Sync data with LocalStorage

useMemo – Optimize calculations (totals, charts)

8. UI & Design

Clean and minimal UI

Responsive layout

Sidebar navigation

Tailwind CSS for fast styling

User-friendly forms and buttons

9. Optional / Advanced Features (Future Scope)

Export transactions as CSV/PDF

Auto-categorization using AI

Monthly spending prediction

Personalized saving tips

User authentication

10. Conclusion

The Budget Insights & Expense Tracker is a practical financial management application that helps users understand and control their spending.
It demonstrates skills in React, state management, component design, chart visualization, and UI development, making it suitable for academic projects and portfolio showcase.



