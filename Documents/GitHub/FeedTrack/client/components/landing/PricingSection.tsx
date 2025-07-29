import { Button } from "@/components/ui/button";
import { Check, Zap, Crown, Rocket } from "lucide-react";

export function PricingSection() {
  const plans = [
    {
      name: "Starter",
      icon: Zap,
      price: "Free",
      originalPrice: "$29",
      period: "for first 100 users",
      description: "Perfect for testing the waters",
      features: [
        "1 video review per month",
        "Basic expert matching",
        "Standard turnaround (72hrs)",
        "Download in 1080p",
        "Basic social optimization"
      ],
      cta: "Claim Free Spot",
      popular: false,
      gradient: "from-music-blue-500 to-music-blue-600"
    },
    {
      name: "Creator",
      icon: Crown,
      price: "$49",
      originalPrice: "$79",
      period: "/month",
      description: "For serious content creators",
      features: [
        "3 video reviews per month",
        "Premium expert matching",
        "Fast turnaround (48hrs)",
        "Download in 4K",
        "Advanced social optimization",
        "Custom thumbnails",
        "Priority support"
      ],
      cta: "Start Creating",
      popular: true,
      gradient: "from-music-purple-500 to-music-pink-500"
    },
    {
      name: "Pro",
      icon: Rocket,
      price: "$149",
      originalPrice: "$199",
      period: "/month",
      description: "For labels and power users",
      features: [
        "Unlimited video reviews",
        "Expert team collaboration",
        "Express turnaround (24hrs)",
        "White-label options",
        "API access",
        "Analytics dashboard",
        "Dedicated account manager",
        "Custom branding"
      ],
      cta: "Go Pro",
      popular: false,
      gradient: "from-music-pink-500 to-music-purple-600"
    }
  ];

  return (
    <section className="py-20 bg-black" style={{paddingBottom: '53px'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            🚀 Early Bird Pricing - Limited Time
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free and scale as you grow. All plans include our viral video guarantee.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-black border-2 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 ${
                plan.popular 
                  ? 'border-primary shadow-xl scale-105' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-music-purple-600 to-music-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} text-white mb-4`}>
                  <plan.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              {/* Pricing */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
                {plan.originalPrice && (
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-muted-foreground line-through">{plan.originalPrice}</span>
                    <span className="bg-destructive/10 text-destructive px-2 py-1 rounded-full text-xs font-medium">
                      {index === 0 ? '100% OFF' : '38% OFF'}
                    </span>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button 
                size="lg" 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-music-purple-600 to-music-pink-600 hover:from-music-purple-700 hover:to-music-pink-700' 
                    : ''
                }`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center" />

        {/* Urgency element */}
        <div className="mt-12 text-center" />
      </div>
    </section>
  );
}
