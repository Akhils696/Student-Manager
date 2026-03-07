import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Student Planner</h3>
            <p className="text-gray-400 text-sm">
              A comprehensive student management application to help educators and students track academic progress.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="/students" className="hover:text-white transition-colors">Students</a></li>
              <li><a href="/tasks" className="hover:text-white transition-colors">Tasks</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: support@studentplanner.com</li>
              <li>Phone: (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Student Planner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;