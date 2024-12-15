const FeaturesSection = () => {
    const features = [
      {
        icon: "🛡️", // Replace this with the actual SVG or image
        title: "Secure & Speedy",
        description:
          "We ensure that your purchases are quickly delivered to your doorstep in secure packaging.",
      },
      {
        icon: "❓", // Replace this with the actual SVG or image
        title: "Wholesome & Helpful",
        description:
          "We are always here to be of assistance to you — so don’t hesitate to ask us any questions.",
      },
      {
        icon: "🦋", // Replace this with the actual SVG or image
        title: "Bold & Beautiful",
        description:
          "We select and sell only the highest quality products. We are committed to your satisfaction.",
      },
    ];
  
    return (
      <section className="bg-gray-300 py-10">
        <div className="container mx-auto flex justify-around text-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center max-w-xs px-6 py-8 bg-white shadow-lg rounded-lg m-4 transition transform hover:scale-105"
            >
              {/* Replace with actual image or SVG */}
              <div className="text-5xl mb-4 text-blue-600">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default FeaturesSection;
  