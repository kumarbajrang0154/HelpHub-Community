import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Bug, Globe, BookOpen } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Code,
      title: 'Java Project Help',
      description: 'Expert assistance with Java assignments, projects, and complex applications. OOP, data structures, algorithms, and more.',
      features: ['Code Review', 'Debugging', 'Architecture Design']
    },
    {
      icon: Bug,
      title: 'Bug Fixing',
      description: 'Identify and fix bugs in your code. Quick turnaround on debugging complex issues across multiple languages.',
      features: ['Quick Fixes', 'Root Cause Analysis', 'Performance Optimization']
    },
    {
      icon: Globe,
      title: 'Website Development',
      description: 'Help with web development projects using HTML, CSS, JavaScript, React, and backend technologies.',
      features: ['Frontend Development', 'Backend Support', 'Full Stack Projects']
    },
    {
      icon: BookOpen,
      title: 'Assignments & Learning',
      description: 'Get guidance on assignments, understand concepts, and improve your coding skills with expert mentorship.',
      features: ['Concept Explanation', 'Code Optimization', 'Best Practices']
    }
  ];

  return (
    <div>
      {/* Header */}
      <section className="pt-16 pb-12 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container-max">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-lg text-gray-600">
            Comprehensive solutions for all your academic and coding needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card">
                <service.icon size={40} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="mb-6 space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn-primary">
                  Request Service
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="py-16 bg-gray-50">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">Flexible Pricing</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each project is unique. Contact us with your requirements and we'll provide a customized quote.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Services;
