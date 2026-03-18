import React from 'react'
import {
  Rocket,
  Zap,
  ShieldCheck,
  UtensilsCrossed,
  Clock,
  Star
} from 'lucide-react'

export default function WhyChooseUs() {
  const features = [
    {
      icon: Clock,
      title: "Lightning Fast Delivery",
      description: "Your favorite meals arrive at your door in record time — hot and fresh.",
      color: "from-blue-500 to-cyan-400",
      iconColor: "text-cyan-500"
    },
    {
      icon: UtensilsCrossed,
      title: "Premium Quality Food",
      description: "We work only with carefully selected restaurants and highest-rated kitchens.",
      color: "from-amber-500 to-orange-400",
      iconColor: "text-amber-600"
    },
    {
      icon: ShieldCheck,
      title: "100% Trusted & Secure",
      description: "Safe payments, verified providers, and protected personal information.",
      color: "from-violet-500 to-purple-500",
      iconColor: "text-violet-600"
    }
  ]

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 font-medium text-sm mb-5">
            <Rocket size={18} className="text-orange-600" />
            <span>Why thousands choose us every day</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Why Choose <span className="text-orange-600">FoodHub</span>?
          </h2>

          <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
            We combine speed, quality, and trust so you can enjoy great food without compromise.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-7 lg:gap-9">

          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className={`
                  group relative overflow-hidden
                  bg-white rounded-2xl shadow-md hover:shadow-2xl
                  transition-all duration-400 ease-out
                  border border-gray-100
                  hover:-translate-y-2
                `}
              >
                {/* Gradient top bar */}
                <div className={`h-2 bg-gradient-to-r ${feature.color}`} />

                <div className="p-8 pb-10">

                  {/* Icon circle */}
                  <div className={`
                    inline-flex items-center justify-center 
                    w-16 h-16 rounded-2xl mb-6
                    bg-gradient-to-br ${feature.color} bg-opacity-10
                    text-white
                    group-hover:scale-110 group-hover:rotate-3
                    transition-transform duration-400
                  `}>
                    <Icon
                      size={32}
                      className={`${feature.iconColor} group-hover:scale-110 transition-transform duration-400`}
                      strokeWidth={1.8}
                    />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                </div>

                {/* Subtle hover shine effect */}
                <div className="
                  absolute inset-0 opacity-0 group-hover:opacity-10
                  bg-linear-to-br from-white via-transparent to-transparent
                  pointer-events-none transition-opacity duration-500
                "/>

              </div>
            )
          })}

        </div>

      </div>
    </section>
  )
}