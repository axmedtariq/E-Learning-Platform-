import { Card, CardContent } from "../../Components/ui/card.jsx";
import { Button } from "../../Components/ui/button.jsx";
import { Settings, LogOut, Users, BookOpen, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "./Admin.scss";

export default function AdminDashboard() {
  const { logout } = useContext(AuthContext);  // ✅ Get logout function
  const navigate = useNavigate();              // ✅ For redirection

  // Sample data
  const revenueData = [
    { month: "Mon", revenue: 800 },
    { month: "Tue", revenue: 1200 },
    { month: "Wed", revenue: 900 },
    { month: "Thu", revenue: 1500 },
    { month: "Fri", revenue: 1100 },
    { month: "Sat", revenue: 2000 },
    { month: "Sun", revenue: 1700 },
  ];

  const payouts = [
    { id: 1, teacher: "Maryam Noor", amount: "$420", status: "Paid" },
    { id: 2, teacher: "Ahmed Ali", amount: "$310", status: "Pending" },
  ];

  const approvals = [
    { id: 1, course: "UI/UX Design", teacher: "John Omar", status: "Waiting" },
    { id: 2, course: "Next.js Mastery", teacher: "Ali Muse", status: "Waiting" },
  ];

  const notifications = [
    "New course submitted for approval",
    "Teacher payout request received",
    "System update scheduled for tomorrow",
  ];

  const messages = [
    { from: "Teacher Support", text: "Need help verifying course." },
    { from: "Student Helpdesk", text: "Refund request for Python course." },
  ];

  // ---------- HANDLE LOGOUT ----------
  const handleLogout = () => {
    logout();           // clear user and token
    navigate("/admin-login");  // redirect to login page
  };

  return (
    <div className="admin-dashboard">
      {/* TOP RIGHT TOGGLE */}
      <div className="toggle-wrapper">
        <Button variant="secondary">Toggle Dark Mode</Button>
      </div>

      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>

        <div className="header-right">
          <img src="https://placehold.co/40" alt="profile" />

          <Button variant="ghost" className="icon-btn">
            <Settings size={18} />
          </Button>

          <Button
            variant="destructive"
            className="icon-btn logout-btn"
            onClick={handleLogout}  // ✅ Logout works
          >
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="metrics-grid">
        {/* ... your existing metrics cards ... */}
      </div>

      {/* REVENUE CHART */}
      <Card className="chart-card">
        <CardContent className="chart-content">
          <h2 className="section-title">
            <DollarSign size={20} /> Website Revenue (Daily)
          </h2>

          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* COURSE APPROVALS, PAYOUTS, MESSAGES, NOTIFICATIONS */}
      {/* ... keep your existing code ... */}

    </div>
  );
}
