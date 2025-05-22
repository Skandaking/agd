export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to the AGD admin dashboard.</p>
      </div>
      
      {/* Dashboard stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total News", value: "24", change: "+3", color: "bg-primary" },
          { title: "Media Items", value: "156", change: "+12", color: "bg-secondary" },
          { title: "Press Releases", value: "18", change: "+2", color: "bg-accent" },
          { title: "Page Views", value: "2,345", change: "+105", color: "bg-green-500" }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-500 font-medium">{stat.title}</div>
              <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
            </div>
            <div className="text-3xl font-bold mb-2">{stat.value}</div>
            <div className="text-sm text-green-600">
              {stat.change} since last month
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent activity */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="divide-y">
            {[
              { action: "New news item added", user: "Admin", time: "2 hours ago" },
              { action: "Media gallery updated", user: "Editor", time: "5 hours ago" },
              { action: "Press release published", user: "Admin", time: "1 day ago" },
              { action: "User settings updated", user: "Admin", time: "2 days ago" },
              { action: "System maintenance performed", user: "System", time: "3 days ago" }
            ].map((activity, index) => (
              <div key={index} className="py-4 first:pt-0 last:pb-0 flex justify-between">
                <div>
                  <div className="font-medium">{activity.action}</div>
                  <div className="text-sm text-gray-500">By {activity.user}</div>
                </div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Quick actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x">
          {[
            { title: "Add News", description: "Create a new news article" },
            { title: "Upload Media", description: "Add images or videos" },
            { title: "New Press Release", description: "Publish a press release" },
            { title: "Manage Users", description: "Add or edit user accounts" }
          ].map((action, index) => (
            <div key={index} className="p-6 text-center">
              <h3 className="font-medium mb-2">{action.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{action.description}</p>
              <button className="text-primary hover:underline">Get Started →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 