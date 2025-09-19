// import React, { useState } from 'react';
// import { 
//   Check, X, Star, ArrowRight, Users, Building, Zap, 
//   Shield, Headphones, Globe, Calendar, FileText,
//   Smartphone, BarChart3, Award, HelpCircle, Crown
// } from 'lucide-react';

// const SkyStructPricing = () => {
//   const [billingCycle, setBillingCycle] = useState('monthly');
//   const [hoveredPlan, setHoveredPlan] = useState(null);

//   const plans = [
//     {
//       id: 'starter',
//       name: 'Starter',
//       subtitle: 'Perfect for small teams',
//       icon: Building,
//       price: { monthly: 29, yearly: 25 },
//       description: 'Essential tools for small construction teams and independent contractors.',
//       popular: false,
//       features: [
//         { name: 'Up to 5 team members', included: true },
//         { name: '3 active projects', included: true },
//         { name: 'Basic project scheduling', included: true },
//         { name: 'Document storage (5GB)', included: true },
//         { name: 'Mobile app access', included: true },
//         { name: 'Email support', included: true },
//         { name: 'Basic reporting', included: true },
//         { name: 'Team chat', included: true },
//         { name: 'Advanced analytics', included: false },
//         { name: 'Custom integrations', included: false },
//         { name: 'Priority support', included: false },
//         { name: 'Advanced safety features', included: false }
//       ],
//       color: 'from-slate-600 to-slate-700',
//       buttonStyle: 'bg-slate-600 hover:bg-slate-700 text-white'
//     },
//     {
//       id: 'professional',
//       name: 'Professional',
//       subtitle: 'Most popular choice',
//       icon: Users,
//       price: { monthly: 79, yearly: 69 },
//       description: 'Complete project management solution for growing construction companies.',
//       popular: true,
//       features: [
//         { name: 'Up to 25 team members', included: true },
//         { name: 'Unlimited projects', included: true },
//         { name: 'Advanced scheduling & Gantt charts', included: true },
//         { name: 'Document storage (50GB)', included: true },
//         { name: 'Mobile app access', included: true },
//         { name: 'Priority email & chat support', included: true },
//         { name: 'Advanced reporting & analytics', included: true },
//         { name: 'Team collaboration tools', included: true },
//         { name: 'Safety & compliance tracking', included: true },
//         { name: 'Basic integrations', included: true },
//         { name: 'Custom workflows', included: true },
//         { name: 'API access', included: false }
//       ],
//       color: 'from-orange-600 to-orange-700',
//       buttonStyle: 'bg-orange-600 hover:bg-orange-700 text-white'
//     },
//     {
//       id: 'enterprise',
//       name: 'Enterprise',
//       subtitle: 'For large organizations',
//       icon: Crown,
//       price: { monthly: 149, yearly: 129 },
//       description: 'Full-featured platform with enterprise-grade security and support.',
//       popular: false,
//       features: [
//         { name: 'Unlimited team members', included: true },
//         { name: 'Unlimited projects', included: true },
//         { name: 'Advanced scheduling & resource management', included: true },
//         { name: 'Unlimited document storage', included: true },
//         { name: 'Mobile app access', included: true },
//         { name: '24/7 phone & chat support', included: true },
//         { name: 'Enterprise analytics & BI', included: true },
//         { name: 'Advanced collaboration suite', included: true },
//         { name: 'Complete safety & compliance suite', included: true },
//         { name: 'All integrations included', included: true },
//         { name: 'Custom workflows & automation', included: true },
//         { name: 'Full API access & white-label options', included: true }
//       ],
//       color: 'from-purple-600 to-purple-700',
//       buttonStyle: 'bg-purple-600 hover:bg-purple-700 text-white'
//     }
//   ];

//   const addOns = [
//     {
//       name: 'Advanced Analytics Pro',
//       description: 'Predictive insights, custom dashboards, and executive reporting',
//       price: 19,
//       icon: BarChart3
//     },
//     {
//       name: 'Safety Compliance Plus',
//       description: 'OSHA reporting, incident management, and safety training modules',
//       price: 15,
//       icon: Shield
//     },
//     {
//       name: 'BIM Integration',
//       description: 'Connect with Revit, AutoCAD, and other BIM software',
//       price: 25,
//       icon: Globe
//     },
//     {
//       name: 'Premium Support',
//       description: 'Dedicated account manager and priority implementation',
//       price: 39,
//       icon: Headphones
//     }
//   ];

//   const faqs = [
//     {
//       question: 'Can I change plans at any time?',
//       answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated and reflected in your next billing cycle.'
//     },
//     {
//       question: 'Is there a free trial available?',
//       answer: 'Absolutely! We offer a 14-day free trial with full access to Professional plan features. No credit card required to start.'
//     },
//     {
//       question: 'What payment methods do you accept?',
//       answer: 'We accept all major credit cards, ACH transfers, and can accommodate purchase orders for Enterprise customers.'
//     },
//     {
//       question: 'How does data migration work?',
//       answer: 'Our team provides free data migration assistance for all plans. We\'ll help you import your existing project data, contacts, and documents.'
//     },
//     {
//       question: 'Is my data secure?',
//       answer: 'Yes, we use enterprise-grade security with 256-bit SSL encryption, regular backups, and SOC 2 Type II compliance.'
//     },
//     {
//       question: 'Do you offer training and onboarding?',
//       answer: 'Yes! All plans include basic training resources. Professional and Enterprise plans include personalized onboarding sessions.'
//     }
//   ];

//   const getDiscountedPrice = (plan) => {
//     const basePrice = plan.price[billingCycle];
//     return billingCycle === 'yearly' ? basePrice : plan.price.monthly;
//   };

//   const getSavings = (plan) => {
//     const monthlyTotal = plan.price.monthly * 12;
//     const yearlyTotal = plan.price.yearly * 12;
//     const savings = monthlyTotal - yearlyTotal;
//     const percentage = Math.round((savings / monthlyTotal) * 100);
//     return { amount: savings, percentage };
//   };

//   return (
//     <div className="bg-white py-20">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-lg text-sm font-semibold mb-4">
//             Transparent Pricing
//           </div>
//           <h2 className="text-4xl font-bold text-slate-800 mb-6">
//             Choose the Perfect Plan for
//             <span className="text-orange-600"> Your Team</span>
//           </h2>
//           <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
//             Start building better with SkyStruct v2lite. All plans include our core construction 
//             management features with no hidden fees or surprise charges.
//           </p>

//           {/* Billing Toggle */}
//           <div className="flex items-center justify-center space-x-4">
//             <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-slate-800' : 'text-slate-500'}`}>
//               Monthly
//             </span>
//             <button
//               className="relative w-14 h-8 bg-slate-200 rounded-full transition-colors duration-200 focus:outline-none"
//               onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
//             >
//               <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${
//                 billingCycle === 'yearly' ? 'transform translate-x-6 bg-orange-600' : ''
//               }`} />
//             </button>
//             <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-slate-800' : 'text-slate-500'}`}>
//               Yearly
//             </span>
//             {billingCycle === 'yearly' && (
//               <span className="bg-green-100 text-green-600 px-2 py-1 rounded-md text-xs font-semibold">
//                 Save up to 17%
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Pricing Cards */}
//         <div className="grid lg:grid-cols-3 gap-8 mb-16">
//           {plans.map((plan, index) => (
//             <div
//               key={plan.id}
//               className={`relative bg-white rounded-2xl border-2 transition-all duration-300 ${
//                 plan.popular
//                   ? 'border-orange-600 shadow-xl scale-105'
//                   : hoveredPlan === index
//                     ? 'border-orange-300 shadow-lg scale-102'
//                     : 'border-gray-200 shadow-md hover:border-gray-300 hover:shadow-lg'
//               }`}
//               onMouseEnter={() => setHoveredPlan(index)}
//               onMouseLeave={() => setHoveredPlan(null)}
//             >
//               {/* Popular Badge */}
//               {plan.popular && (
//                 <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//                   <div className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
//                     <Star className="w-4 h-4" />
//                     <span>Most Popular</span>
//                   </div>
//                 </div>
//               )}

//               <div className="p-8">
//                 {/* Plan Header */}
//                 <div className="text-center mb-8">
//                   <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${plan.color} text-white mb-4`}>
//                     <plan.icon className="w-6 h-6" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-slate-800 mb-2">{plan.name}</h3>
//                   <p className="text-slate-600 text-sm mb-4">{plan.subtitle}</p>
                  
//                   {/* Price */}
//                   <div className="mb-4">
//                     <div className="flex items-baseline justify-center">
//                       <span className="text-4xl font-bold text-slate-800">
//                         ${getDiscountedPrice(plan)}
//                       </span>
//                       <span className="text-slate-600 ml-1">
//                         /{billingCycle === 'monthly' ? 'month' : 'month'}
//                       </span>
//                     </div>
//                     {billingCycle === 'yearly' && (
//                       <div className="text-sm text-green-600 font-medium">
//                         Save ${getSavings(plan).amount}/year ({getSavings(plan).percentage}% off)
//                       </div>
//                     )}
//                   </div>
                  
//                   <p className="text-slate-600 text-sm">{plan.description}</p>
//                 </div>

//                 {/* Features List */}
//                 <div className="space-y-3 mb-8">
//                   {plan.features.map((feature, featureIndex) => (
//                     <div key={featureIndex} className="flex items-start space-x-3">
//                       {feature.included ? (
//                         <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
//                       ) : (
//                         <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
//                       )}
//                       <span className={`text-sm ${feature.included ? 'text-slate-700' : 'text-slate-400'}`}>
//                         {feature.name}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* CTA Button */}
//                 <button className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 ${plan.buttonStyle}`}>
//                   {plan.id === 'enterprise' ? 'Contact Sales' : 'Start Free Trial'}
//                 </button>

//                 {plan.id !== 'enterprise' && (
//                   <p className="text-center text-xs text-slate-500 mt-3">
//                     14-day free trial • No credit card required
//                   </p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Add-ons Section */}
//         <div className="bg-slate-50 rounded-2xl p-12 mb-16">
//           <div className="text-center mb-12">
//             <h3 className="text-3xl font-bold text-slate-800 mb-4">
//               Powerful Add-ons
//             </h3>
//             <p className="text-slate-600 max-w-2xl mx-auto">
//               Enhance your SkyStruct experience with specialized tools designed for specific construction workflows and requirements.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {addOns.map((addon, index) => (
//               <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300">
//                 <div className="text-center">
//                   <div className="inline-flex p-3 bg-orange-100 rounded-xl mb-4">
//                     <addon.icon className="w-6 h-6 text-orange-600" />
//                   </div>
//                   <h4 className="font-semibold text-slate-800 mb-2">{addon.name}</h4>
//                   <p className="text-sm text-slate-600 mb-4">{addon.description}</p>
//                   <div className="text-2xl font-bold text-slate-800 mb-4">
//                     ${addon.price}<span className="text-sm font-normal text-slate-600">/month</span>
//                   </div>
//                   <button className="w-full py-2 px-4 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200">
//                     Add to Plan
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Enterprise Section */}
//         <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-12 text-white mb-16">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <h3 className="text-3xl font-bold mb-4">
//                 Need Something Custom?
//               </h3>
//               <p className="text-slate-300 mb-6 leading-relaxed">
//                 For large construction companies with unique requirements, we offer custom solutions 
//                 tailored to your specific workflows, integrations, and compliance needs.
//               </p>
              
//               <div className="space-y-3 mb-8">
//                 {[
//                   'Custom integrations and APIs',
//                   'Dedicated infrastructure and support',
//                   'Advanced security and compliance',
//                   'Custom training and implementation',
//                   'Volume discounts available'
//                 ].map((feature, index) => (
//                   <div key={index} className="flex items-center space-x-3">
//                     <Check className="w-5 h-5 text-green-400" />
//                     <span className="text-slate-300">{feature}</span>
//                   </div>
//                 ))}
//               </div>

//               <button className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 flex items-center space-x-2">
//                 <span>Contact Enterprise Sales</span>
//                 <ArrowRight className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="grid grid-cols-2 gap-6">
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-orange-400 mb-2">500+</div>
//                 <div className="text-slate-300 text-sm">Enterprise Customers</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
//                 <div className="text-slate-300 text-sm">Uptime SLA</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
//                 <div className="text-slate-300 text-sm">Premium Support</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-purple-400 mb-2">SOC 2</div>
//                 <div className="text-slate-300 text-sm">Compliance</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* FAQ Section */}
//         <div className="text-center mb-12">
//           <h3 className="text-3xl font-bold text-slate-800 mb-4">
//             Frequently Asked Questions
//           </h3>
//           <p className="text-slate-600 max-w-2xl mx-auto">
//             Get answers to common questions about SkyStruct v2lite pricing and features.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8 mb-16">
//           {faqs.map((faq, index) => (
//             <div key={index} className="bg-slate-50 rounded-xl p-6">
//               <div className="flex items-start space-x-3">
//                 <HelpCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
//                 <div>
//                   <h4 className="font-semibold text-slate-800 mb-2">{faq.question}</h4>
//                   <p className="text-slate-600 text-sm">{faq.answer}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Final CTA */}
//         <div className="text-center bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-12">
//           <h3 className="text-3xl font-bold text-slate-800 mb-4">
//             Ready to Transform Your Construction Projects?
//           </h3>
//           <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
//             Join thousands of construction professionals who are building faster, safer, and more efficiently. 
//             Start your free trial today.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 shadow-lg">
//               Start 14-Day Free Trial
//             </button>
//             <button className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-lg font-semibold hover:border-slate-400 hover:bg-slate-50 transition-colors duration-200">
//               Schedule Demo
//             </button>
//           </div>
//           <p className="text-sm text-slate-500 mt-4">
//             No credit card required • Full access to Professional features
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SkyStructPricing;

import React, { useState } from 'react';
import { 
  Check, X, Star, ArrowRight, Users, Building, Zap, 
  Shield, Headphones, Globe, Calendar, FileText,
  Smartphone, BarChart3, Award, HelpCircle, Crown
} from 'lucide-react';

const SkyStructPricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      subtitle: 'Perfect for small teams',
      icon: Building,
      price: { monthly: 29, yearly: 25 },
      description: 'Essential tools for small construction teams and independent contractors.',
      popular: false,
      features: [
        { name: 'Up to 5 team members', included: true },
        { name: '3 active projects', included: true },
        { name: 'Basic project scheduling', included: true },
        { name: 'Document storage (5GB)', included: true },
        { name: 'Mobile app access', included: true },
        { name: 'Email support', included: true },
        { name: 'Basic reporting', included: true },
        { name: 'Team chat', included: true },
        { name: 'Advanced analytics', included: false },
        { name: 'Custom integrations', included: false },
        { name: 'Priority support', included: false },
        { name: 'Advanced safety features', included: false }
      ],
      color: 'from-slate-600 to-slate-700',
      buttonStyle: 'bg-slate-600 hover:bg-slate-700 text-white'
    },
    {
      id: 'professional',
      name: 'Professional',
      subtitle: 'Most popular choice',
      icon: Users,
      price: { monthly: 79, yearly: 69 },
      description: 'Complete project management solution for growing construction companies.',
      popular: true,
      features: [
        { name: 'Up to 25 team members', included: true },
        { name: 'Unlimited projects', included: true },
        { name: 'Advanced scheduling & Gantt charts', included: true },
        { name: 'Document storage (50GB)', included: true },
        { name: 'Mobile app access', included: true },
        { name: 'Priority email & chat support', included: true },
        { name: 'Advanced reporting & analytics', included: true },
        { name: 'Team collaboration tools', included: true },
        { name: 'Safety & compliance tracking', included: true },
        { name: 'Basic integrations', included: true },
        { name: 'Custom workflows', included: true },
        { name: 'API access', included: false }
      ],
      color: 'from-blue-400 to-blue-500',
      buttonStyle: 'bg-blue-400 hover:bg-blue-500 text-white'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      subtitle: 'For large organizations',
      icon: Crown,
      price: { monthly: 149, yearly: 129 },
      description: 'Full-featured platform with enterprise-grade security and support.',
      popular: false,
      features: [
        { name: 'Unlimited team members', included: true },
        { name: 'Unlimited projects', included: true },
        { name: 'Advanced scheduling & resource management', included: true },
        { name: 'Unlimited document storage', included: true },
        { name: 'Mobile app access', included: true },
        { name: '24/7 phone & chat support', included: true },
        { name: 'Enterprise analytics & BI', included: true },
        { name: 'Advanced collaboration suite', included: true },
        { name: 'Complete safety & compliance suite', included: true },
        { name: 'All integrations included', included: true },
        { name: 'Custom workflows & automation', included: true },
        { name: 'Full API access & white-label options', included: true }
      ],
      color: 'from-purple-600 to-purple-700',
      buttonStyle: 'bg-purple-600 hover:bg-purple-700 text-white'
    }
  ];

  const addOns = [
    {
      name: 'Advanced Analytics Pro',
      description: 'Predictive insights, custom dashboards, and executive reporting',
      price: 19,
      icon: BarChart3
    },
    {
      name: 'Safety Compliance Plus',
      description: 'OSHA reporting, incident management, and safety training modules',
      price: 15,
      icon: Shield
    },
    {
      name: 'BIM Integration',
      description: 'Connect with Revit, AutoCAD, and other BIM software',
      price: 25,
      icon: Globe
    },
    {
      name: 'Premium Support',
      description: 'Dedicated account manager and priority implementation',
      price: 39,
      icon: Headphones
    }
  ];

  const faqs = [
    {
      question: 'Can I change plans at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated and reflected in your next billing cycle.'
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Absolutely! We offer a 14-day free trial with full access to Professional plan features. No credit card required to start.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, ACH transfers, and can accommodate purchase orders for Enterprise customers.'
    },
    {
      question: 'How does data migration work?',
      answer: 'Our team provides free data migration assistance for all plans. We\'ll help you import your existing project data, contacts, and documents.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we use enterprise-grade security with 256-bit SSL encryption, regular backups, and SOC 2 Type II compliance.'
    },
    {
      question: 'Do you offer training and onboarding?',
      answer: 'Yes! All plans include basic training resources. Professional and Enterprise plans include personalized onboarding sessions.'
    }
  ];

  const getDiscountedPrice = (plan) => {
    const basePrice = plan.price[billingCycle];
    return billingCycle === 'yearly' ? basePrice : plan.price.monthly;
  };

  const getSavings = (plan) => {
    const monthlyTotal = plan.price.monthly * 12;
    const yearlyTotal = plan.price.yearly * 12;
    const savings = monthlyTotal - yearlyTotal;
    const percentage = Math.round((savings / monthlyTotal) * 100);
    return { amount: savings, percentage };
  };

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold mb-4">
            Transparent Pricing
          </div>
          <h2 className="text-4xl font-bold text-slate-800 mb-6">
            Choose the Perfect Plan for
            <span className="text-blue-400"> Your Team</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Start building better with SkyStruct v2lite. All plans include our core construction 
            management features with no hidden fees or surprise charges.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-slate-800' : 'text-slate-500'}`}>
              Monthly
            </span>
            <button
              className="relative w-14 h-8 bg-slate-200 rounded-full transition-colors duration-200 focus:outline-none"
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${
                billingCycle === 'yearly' ? 'transform translate-x-6 bg-blue-400' : ''
              }`} />
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-slate-800' : 'text-slate-500'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-md text-xs font-semibold">
                Save up to 17%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl border-2 transition-all duration-300 ${
                plan.popular
                  ? 'border-blue-400 shadow-xl scale-105'
                  : hoveredPlan === index
                    ? 'border-blue-300 shadow-lg scale-102'
                    : 'border-gray-200 shadow-md hover:border-gray-300 hover:shadow-lg'
              }`}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-400 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${plan.color} text-white mb-4`}>
                    <plan.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">{plan.name}</h3>
                  <p className="text-slate-600 text-sm mb-4">{plan.subtitle}</p>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-slate-800">
                        ${getDiscountedPrice(plan)}
                      </span>
                      <span className="text-slate-600 ml-1">
                        /{billingCycle === 'monthly' ? 'month' : 'month'}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <div className="text-sm text-green-600 font-medium">
                        Save ${getSavings(plan).amount}/year ({getSavings(plan).percentage}% off)
                      </div>
                    )}
                  </div>
                  
                  <p className="text-slate-600 text-sm">{plan.description}</p>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-slate-700' : 'text-slate-400'}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 ${plan.buttonStyle}`}>
                  {plan.id === 'enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                </button>

                {plan.id !== 'enterprise' && (
                  <p className="text-center text-xs text-slate-500 mt-3">
                    14-day free trial • No credit card required
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="bg-slate-50 rounded-2xl p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              Powerful Add-ons
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Enhance your SkyStruct experience with specialized tools designed for specific construction workflows and requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <div className="text-center">
                  <div className="inline-flex p-3 bg-blue-100 rounded-xl mb-4">
                    <addon.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">{addon.name}</h4>
                  <p className="text-sm text-slate-600 mb-4">{addon.description}</p>
                  <div className="text-2xl font-bold text-slate-800 mb-4">
                    ${addon.price}<span className="text-sm font-normal text-slate-600">/month</span>
                  </div>
                  <button className="w-full py-2 px-4 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                    Add to Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise Section */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-12 text-white mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Need Something Custom?
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                For large construction companies with unique requirements, we offer custom solutions 
                tailored to your specific workflows, integrations, and compliance needs.
              </p>
              
              <div className="space-y-3 mb-8">
                {[
                  'Custom integrations and APIs',
                  'Dedicated infrastructure and support',
                  'Advanced security and compliance',
                  'Custom training and implementation',
                  'Volume discounts available'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-500 transition-colors duration-200 flex items-center space-x-2">
                <span>Contact Enterprise Sales</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
                <div className="text-slate-300 text-sm">Enterprise Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
                <div className="text-slate-300 text-sm">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                <div className="text-slate-300 text-sm">Premium Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">SOC 2</div>
                <div className="text-slate-300 text-sm">Compliance</div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-800 mb-4">
            Frequently Asked Questions
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Get answers to common questions about SkyStruct v2lite pricing and features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-slate-50 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <HelpCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">{faq.question}</h4>
                  <p className="text-slate-600 text-sm">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-slate-800 mb-4">
            Ready to Transform Your Construction Projects?
          </h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Join thousands of construction professionals who are building faster, safer, and more efficiently. 
            Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-500 transition-colors duration-200 shadow-lg">
              Start 14-Day Free Trial
            </button>
            <button className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-lg font-semibold hover:border-slate-400 hover:bg-slate-50 transition-colors duration-200">
              Schedule Demo
            </button>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            No credit card required • Full access to Professional features
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkyStructPricing;