import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings, LogOut, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./TeacherDashboard.scss";

export default function TeacherDashboard() {
  const revenueData = [
    { month: "Jan", revenue: 800 },
    { month: "Feb", revenue: 1200 },
    { month: "Mar", revenue: 900 },
    { month: "Apr", revenue: 1500 },
    { month: "May", revenue: 1100 },
    { month: "Jun", revenue: 2000 },
  ];

  const courses = [
    {
      id: 1,
      name: "React Complete Guide",
      price: "$49",
      students: 122,
      revenue: "$5980",
      thumbnail: "https://placehold.co/80x80",
    },
    {
      id: 2,
      name: "Node.js Mastery",
      price: "$59",
      students: 98,
      revenue: "$5782",
      thumbnail: "https://placehold.co/80x80",
    },
  ];

  return (
    <div className="teacher-dashboard">

      {/* HEADER */}
      <div className="header">
        <h1>Teacher Dashboard</h1>

        <div className="header-right">
          <Button className="flex gap-2">
            <PlusCircle size={18} /> Upload Course
          </Button>

          <img src="https://placehold.co/40" width={40} height={40} />

          <Button variant="ghost" className="flex gap-2">
            <Settings size={18} />
          </Button>

          <Button variant="destructive" className="flex gap-2">
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </div>

      {/* REVENUE GRAPH */}
      <Card className="card">
        <CardContent className="card-content">
          <h2 className="revenue-title">
            <DollarSign size={20} /> Monthly Revenue
          </h2>

          <div className="chart-container">
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

      {/* COURSE TABLE */}
      <Card className="card">
        <CardContent className="card-content">
          <h2 className="course-title">Your Courses</h2>

          <table>
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Name</th>
                <th>Price</th>
                <th>Students</th>
                <th>Revenue</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((c) => (
                <tr key={c.id}>
                  <td>
                    <img src={c.thumbnail} alt={c.name} />
                  </td>

                  <td className="font-medium">{c.name}</td>
                  <td>{c.price}</td>
                  <td>{c.students}</td>
                  <td className="font-semibold">{c.revenue}</td>

                  <td>
                    <div className="actions">
                      <Button size="sm" variant="secondary">Edit</Button>
                      <Button size="sm" variant="destructive">Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </CardContent>
      </Card>
    </div>
  );
}
