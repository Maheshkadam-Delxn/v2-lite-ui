import React, { useState, useEffect } from 'react';
import { 
  Star, Quote, ArrowRight, Building, Users, Calendar, 
  TrendingUp, Award, MapPin, CheckCircle, Zap, DollarSign
} from 'lucide-react';

const SkyStructTestimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeCase, setActiveCase] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Marcus Rodriguez",
      title: "Project Director",
      company: "BuildCorp Construction",
      location: "Chicago, IL",
      avatar: "MR",
      rating: 5,
      quote: "SkyStruct v2lite transformed how we manage our commercial projects. The real-time collaboration features alone saved us 40% in project coordination time. Our teams are more connected than ever.",
      metrics: {
        timeSaved: "40%",
        projectsCompleted: "127",
        teamSatisfaction: "96%"
      },
      projectType: "Commercial Construction",
      teamSize: "85+ members",
      bgColor: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Sarah Chen",
      title: "Operations Manager", 
      company: "Urban Development Co.",
      location: "San Francisco, CA",
      avatar: "SC",
      rating: 5,
      quote: "The mobile-first approach is game-changing. Our field supervisors can update progress, upload photos, and coordinate with the office team seamlessly, even in areas with poor connectivity.",
      metrics: {
        timeSaved: "35%",
        projectsCompleted: "89",
        teamSatisfaction: "94%"
      },
      projectType: "Residential Towers",
      teamSize: "120+ members",
      bgColor: "from-green-500 to-green-600"
    },
    {
      id: 3,
      name: "David Thompson",
      title: "Site Supervisor",
      company: "SteelFrame Solutions",
      location: "Houston, TX", 
      avatar: "DT",
      rating: 5,
      quote: "Safety compliance tracking in SkyStruct is outstanding. We've maintained a perfect safety record for 18 months straight. The automated reporting saves hours of paperwork weekly.",
      metrics: {
        timeSaved: "45%",
        projectsCompleted: "156",
        teamSatisfaction: "98%"
      },
      projectType: "Industrial Construction",
      teamSize: "200+ members",
      bgColor: "from-orange-500 to-orange-600"
    },
    {
      id: 4,
      name: "Jennifer Walsh",
      title: "Project Manager",
      company: "Heritage Builders",
      location: "Boston, MA",
      avatar: "JW",
      rating: 5,
      quote: "The cost tracking and budget management features helped us come in 12% under budget on our last three major projects. The ROI analytics are incredibly detailed and actionable.",
      metrics: {
        timeSaved: "38%",
        projectsCompleted: "73",
        teamSatisfaction: "95%"
      },
      projectType: "Historic Renovation",
      teamSize: "45+ members", 
      bgColor: "from-purple-500 to-purple-600"
    }
  ];

  const caseStudies = [
    {
      id: 1,
      company: "MetroBuild Corporation",
      project: "Downtown Financial District Tower",
      location: "New York, NY",
      duration: "24 months",
      value: "$85M",
      teamSize: "150 workers",
      image: "🏢",
      challenge: "Managing complex coordination between 12 subcontractors across a 45-floor high-rise construction project with strict deadlines.",
      solution: "Implemented SkyStruct v2lite for unified project management, real-time communication, and automated progress tracking.",
      results: [
        { metric: "Project Completion", value: "2 weeks early", icon: Calendar },
        { metric: "Cost Savings", value: "$3.2M", icon: DollarSign },
        { metric: "Safety Incidents", value: "Zero", icon: Award },
        { metric: "Team Efficiency", value: "+42%", icon: TrendingUp }
      ],
      quote: "SkyStruct helped us deliver our most complex project ahead of schedule and significantly under budget.",
      author: "Michael Patterson, Project Executive"
    },
    {
      id: 2,
      company: "GreenBuild Solutions", 
      project: "Sustainable Housing Complex",
      location: "Portland, OR",
      duration: "18 months",
      value: "$45M",
      teamSize: "85 workers",
      image: "🌱",
      challenge: "Coordinating eco-friendly materials delivery and ensuring LEED certification compliance across 200 residential units.",
      solution: "Used SkyStruct's document management and compliance tracking to maintain sustainability standards and certifications.",
      results: [
        { metric: "LEED Platinum", value: "Achieved", icon: Award },
        { metric: "Material Waste", value: "-65%", icon: TrendingUp },
        { metric: "Energy Efficiency", value: "+85%", icon: Zap },
        { metric: "Documentation Time", value: "-70%", icon: Calendar }
      ],
      quote: "The compliance tracking made LEED certification process incredibly smooth and transparent.",
      author: "Lisa Martinez, Sustainability Director"
    },
    {
      id: 3,
      company: "Rapid Construction Inc.",
      project: "Emergency Hospital Wing",
      location: "Miami, FL", 
      duration: "8 months",
      value: "$28M",
      teamSize: "120 workers",
      image: "🏥",
      challenge: "Fast-track construction of critical healthcare facility during pandemic with strict health protocols and accelerated timeline.",
      solution: "Leveraged SkyStruct's mobile capabilities and safety features to maintain productivity while ensuring worker safety.",
      results: [
        { metric: "Timeline", value: "Met critical deadline", icon: Calendar },
        { metric: "Safety Compliance", value: "100%", icon: Award },
        { metric: "Remote Coordination", value: "Seamless", icon: Users },
        { metric: "Quality Score", value: "99.2%", icon: CheckCircle }
      ],
      quote: "SkyStruct's mobile platform was essential for maintaining operations during challenging conditions.",
      author: "Robert Kim, Construction Manager"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-lg text-sm font-semibold mb-4">
            Customer Success
          </div>
          <h2 className="text-4xl font-bold text-slate-800 mb-6">
            Trusted by Construction
            <span className="text-orange-600"> Professionals</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From small contractors to enterprise construction companies, SkyStruct v2lite delivers 
            measurable results that transform how teams build together.
          </p>
        </div>

        {/* Customer Testimonials */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Testimonial Content */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 min-h-[400px]">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center shadow-lg">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-lg text-slate-700 leading-relaxed mb-8 italic">
                  "{testimonials[activeTestimonial].quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${testimonials[activeTestimonial].bgColor} rounded-full flex items-center justify-center text-white font-bold`}>
                    {testimonials[activeTestimonial].avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{testimonials[activeTestimonial].name}</div>
                    <div className="text-sm text-slate-600">{testimonials[activeTestimonial].title}</div>
                    <div className="text-sm text-slate-500">{testimonials[activeTestimonial].company}</div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">{testimonials[activeTestimonial].projectType}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">{testimonials[activeTestimonial].teamSize}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">{testimonials[activeTestimonial].location}</span>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center space-x-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeTestimonial === index ? 'bg-orange-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                  />
                ))}
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Impact Metrics</h3>
              
              <div className="grid gap-4">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-600 font-medium">Time Saved</span>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {testimonials[activeTestimonial].metrics.timeSaved}
                  </div>
                  <div className="text-sm text-slate-500">Project coordination efficiency</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-600 font-medium">Projects Completed</span>
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {testimonials[activeTestimonial].metrics.projectsCompleted}
                  </div>
                  <div className="text-sm text-slate-500">Using SkyStruct platform</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-600 font-medium">Team Satisfaction</span>
                    <Award className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    {testimonials[activeTestimonial].metrics.teamSatisfaction}
                  </div>
                  <div className="text-sm text-slate-500">User satisfaction rating</div>
                </div>
              </div>

              {/* Overall Stats */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white">
                <h4 className="font-semibold mb-4">Platform Performance</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-orange-400">500+</div>
                    <div className="text-sm text-slate-300">Active Companies</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">$2.4B</div>
                    <div className="text-sm text-slate-300">Projects Managed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">99.9%</div>
                    <div className="text-sm text-slate-300">Uptime</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">24/7</div>
                    <div className="text-sm text-slate-300">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Case Studies */}
        <div className="border-t border-gray-300 pt-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              Success Stories in Action
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Real projects, real results. See how construction teams are achieving exceptional 
              outcomes with SkyStruct v2lite.
            </p>
          </div>

          {/* Case Study Tabs */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-1 bg-gray-200 rounded-lg p-1">
              {caseStudies.map((study, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeCase === index
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                  onClick={() => setActiveCase(index)}
                >
                  {study.company}
                </button>
              ))}
            </div>
          </div>

          {/* Active Case Study */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Case Study Content */}
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-4xl">{caseStudies[activeCase].image}</div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800">{caseStudies[activeCase].project}</h4>
                    <p className="text-slate-600">{caseStudies[activeCase].company}</p>
                    <p className="text-sm text-slate-500">{caseStudies[activeCase].location}</p>
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-slate-50 rounded-lg">
                  <div className="text-center">
                    <div className="font-bold text-slate-800">{caseStudies[activeCase].duration}</div>
                    <div className="text-xs text-slate-600">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-slate-800">{caseStudies[activeCase].value}</div>
                    <div className="text-xs text-slate-600">Project Value</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-slate-800">{caseStudies[activeCase].teamSize}</div>
                    <div className="text-xs text-slate-600">Team Size</div>
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-2">Challenge</h5>
                    <p className="text-slate-600 text-sm">{caseStudies[activeCase].challenge}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-2">Solution</h5>
                    <p className="text-slate-600 text-sm">{caseStudies[activeCase].solution}</p>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="border-l-4 border-orange-600 pl-4 italic text-slate-700 mb-4">
                  "{caseStudies[activeCase].quote}"
                </blockquote>
                <p className="text-sm text-slate-500">— {caseStudies[activeCase].author}</p>
              </div>

              {/* Results */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-white">
                <h5 className="text-xl font-bold mb-6">Key Results</h5>
                <div className="space-y-4">
                  {caseStudies[activeCase].results.map((result, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-white/10 rounded-lg">
                      <div className="p-2 bg-orange-600 rounded-lg">
                        <result.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-slate-300">{result.metric}</div>
                        <div className="text-xl font-bold">{result.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <button className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors duration-200">
                    <span className="font-medium">Read Full Case Study</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Construction Projects?</h3>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Join thousands of construction professionals who are building faster, safer, and more efficiently with SkyStruct v2lite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200 shadow-lg">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors duration-200">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkyStructTestimonials;