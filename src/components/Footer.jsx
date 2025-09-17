import React, { useState } from 'react';
import { 
  ArrowRight, Mail, Phone, MapPin, Twitter, 
  Facebook, Youtube, Award, Shield, Globe, Users,
  Download, BookOpen, FileText, Headphones, Building,
  Zap, Clock, CheckCircle, Star, ExternalLink
} from 'lucide-react';

const SkyStructFooter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const productLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Integrations', href: '#integrations' },
    { name: 'Mobile Apps', href: '#mobile', icon: Download },
    { name: 'API Documentation', href: '#api', icon: FileText },
    { name: 'System Status', href: '#status', icon: Zap }
  ];

  const solutionsLinks = [
    { name: 'Commercial Construction', href: '#commercial' },
    { name: 'Residential Development', href: '#residential' },
    { name: 'Infrastructure Projects', href: '#infrastructure' },
    { name: 'Renovation & Remodeling', href: '#renovation' },
    { name: 'Industrial Construction', href: '#industrial' },
    { name: 'Emergency Response', href: '#emergency' }
  ];

  const resourcesLinks = [
    { name: 'Help Center', href: '#help', icon: BookOpen },
    { name: 'Video Tutorials', href: '#tutorials', icon: Youtube },
    { name: 'Best Practices Guide', href: '#guide', icon: Award },
    { name: 'Case Studies', href: '#cases' },
    { name: 'Webinars', href: '#webinars' },
    { name: 'Construction Blog', href: '#blog' }
  ];

  const companyLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Careers', href: '#careers' },
    { name: 'Press & Media', href: '#press' },
    { name: 'Partner Program', href: '#partners' },
    { name: 'Contact Sales', href: '#contact', icon: Headphones },
    { name: 'Customer Stories', href: '#stories' }
  ];

  const certifications = [
    { name: 'SOC 2 Type II', icon: Shield },
    { name: 'ISO 27001', icon: Award },
    { name: 'GDPR Compliant', icon: Shield },
    { name: '99.9% Uptime', icon: Zap }
  ];

  const integrations = [
    'Procore', 'Autodesk', 'Microsoft 365', 'Slack', 'QuickBooks', 'Revit'
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Stay Updated with Construction Industry Insights
              </h3>
              <p className="text-orange-100 leading-relaxed">
                Get the latest construction technology trends, project management tips, and SkyStruct 
                product updates delivered to your inbox monthly.
              </p>
            </div>
            <div className="space-y-4">
              <div onSubmit={handleNewsletterSubmit} className="flex space-x-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  required
                />
                <button
                  type="submit"
                  onClick={handleNewsletterSubmit}
                  className="bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center space-x-2 text-green-200">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">Thanks for subscribing! Check your email for confirmation.</span>
                </div>
              )}
              <p className="text-orange-200 text-sm">
                Join 15,000+ construction professionals. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-6 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div>
                  <div className="text-xl font-bold">SkyStruct</div>
                  <div className="text-orange-400 text-sm">v2lite</div>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                Empowering construction teams worldwide with intelligent project management solutions. 
                Build faster, safer, and more efficiently with SkyStruct v2lite.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-400" />
                <span className="text-slate-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-400" />
                <span className="text-slate-300">hello@skystruct.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-400 mt-1" />
                <div className="text-slate-300">
                  <div>123 Construction Way</div>
                  <div>BuildTech Plaza, Suite 500</div>
                  <div>San Francisco, CA 94105</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Users, href: '#linkedin', label: 'LinkedIn' },
                { icon: Twitter, href: '#twitter', label: 'Twitter' },
                { icon: Facebook, href: '#facebook', label: 'Facebook' },
                { icon: Youtube, href: '#youtube', label: 'YouTube' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="flex items-center space-x-2 text-slate-300 hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Solutions</h4>
            <ul className="space-y-3">
              {solutionsLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Resources</h4>
            <ul className="space-y-3">
              {resourcesLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="flex items-center space-x-2 text-slate-300 hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="flex items-center space-x-2 text-slate-300 hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats and Certifications */}
        <div className="border-t border-slate-800 mt-12 pt-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Platform Stats */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Trusted Worldwide</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">500+</div>
                  <div className="text-slate-400 text-sm">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">$2.4B</div>
                  <div className="text-slate-400 text-sm">Projects Managed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">15K+</div>
                  <div className="text-slate-400 text-sm">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
                  <div className="text-slate-400 text-sm">Uptime</div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Security & Compliance</h4>
              <div className="grid grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-slate-800 rounded-lg p-4">
                    <cert.icon className="w-6 h-6 text-orange-400" />
                    <span className="text-slate-300 text-sm font-medium">{cert.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* Mobile Apps */}
        <div className="border-t border-slate-800 mt-12 pt-12">
          <div className="text-center mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">
              Take SkyStruct Anywhere
            </h4>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Access your projects, communicate with your team, and manage construction tasks from anywhere with our mobile apps.
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <button className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-700 rounded-md flex items-center justify-center">
                <span className="text-white text-xs font-bold">📱</span>
              </div>
              <div className="text-left">
                <div className="text-xs text-slate-400">Download on the</div>
                <div className="text-white font-semibold">App Store</div>
              </div>
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-700 rounded-md flex items-center justify-center">
                <span className="text-white text-xs font-bold">🤖</span>
              </div>
              <div className="text-left">
                <div className="text-xs text-slate-400">Get it on</div>
                <div className="text-white font-semibold">Google Play</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-slate-400 text-sm">
              © 2025 SkyStruct Technologies, Inc. All rights reserved.
            </div>
            
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <a href="#privacy" className="text-slate-400 hover:text-orange-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#terms" className="text-slate-400 hover:text-orange-400 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#cookies" className="text-slate-400 hover:text-orange-400 transition-colors duration-200">
                Cookie Policy
              </a>
              <a href="#accessibility" className="text-slate-400 hover:text-orange-400 transition-colors duration-200">
                Accessibility
              </a>
              <a href="#sitemap" className="text-slate-400 hover:text-orange-400 transition-colors duration-200">
                Sitemap
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-slate-400" />
                <select className="bg-transparent text-slate-400 text-sm border-none outline-none">
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-400 text-sm">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SkyStructFooter;