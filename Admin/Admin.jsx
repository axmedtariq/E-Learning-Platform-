import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, Users, BookOpen, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./Admin.scss";

export default function AdminDashboard() {
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

          <Button variant="destructive" className="icon-btn logout-btn">
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="metrics-grid">
        <Card className="metrics-card">
          <CardContent className="metrics-content">
            <div className="metric">
              <Users size={28} />
              <div>
                <p className="metric-label">Students</p>
                <h3 className="metric-value">12,430</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metrics-card">
          <CardContent className="metrics-content">
            <div className="metric">
              <Users size={28} />
              <div>
                <p className="metric-label">Teachers</p>
                <h3 className="metric-value">320</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metrics-card">
          <CardContent className="metrics-content">
            <div className="metric">
              <BookOpen size={28} />
              <div>
                <p className="metric-label">Courses</p>
                <h3 className="metric-value">980</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metrics-card">
          <CardContent className="metrics-content">
            <div className="metric">
              <DollarSign size={28} />
              <div>
                <p className="metric-label">Revenue</p>
                <h3 className="metric-value">$245,000</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* REVENUE CHART */}
      <Card className="chart-card">
        <CardContent className="chart-content">
          <h2 className="section-title">
            <DollarSign size={20} /> Website Revenue (Daily)
          </h2>

          <div className="chart-area">
            <ResponsiveContainer>
              <BarChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* COURSE APPROVALS */}
      <Card className="section-card">
        <CardContent className="section-content">
          <h2 className="section-title">Course Approval Requests</h2>

          {approvals.map((a) => (
            <div key={a.id} className="list-item">
              <p>
                {a.course} — <span>{a.teacher}</span>
              </p>
              <Button size="sm">Approve</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* PAYOUTS */}
      <Card className="section-card">
        <CardContent className="section-content">
          <h2 className="section-title">Teacher Payments & Payouts</h2>

          {payouts.map((p) => (
            <div key={p.id} className="list-item">
              <p>
                {p.teacher} — <strong>{p.amount}</strong>
              </p>
              <span>{p.status}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* MESSAGE SYSTEM */}
      <Card className="section-card">
        <CardContent className="section-content">
          <h2 className="section-title">Messaging System</h2>

          {messages.map((m, i) => (
            <div key={i} className="list-item">
              <strong>{m.from}:</strong> {m.text}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* NOTIFICATIONS */}
      <Card className="section-card">
        <CardContent className="section-content">
          <h2 className="section-title">Notifications</h2>

          {notifications.map((n, i) => (
            <div key={i} className="list-item">{n}</div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
