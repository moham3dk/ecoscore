import React from "react";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-500 p-4">
        <div className="bg-black bg-opacity-60 p-12 rounded-3xl shadow-xl max-w-7xl mx-auto mt-20">
          <h1 className="text-4xl font-extrabold text-white text-center leading-tight drop-shadow-lg mb-8">
            About EcoScore
          </h1>
          <section className="text-white opacity-90">
            <div className="flex flex-col lg:flex-row mb-12">
              <div className="lg:w-1/2 mb-6 lg:mb-0">
                <img
                  src="https://live.staticflickr.com/8099/8547476618_bdfb4f299f.jpg"
                  alt="EcoScore Team"
                  className="rounded-lg w-full h-64 object-cover shadow-lg"
                />
              </div>
              <div className="lg:w-1/2 flex flex-col justify-center lg:ml-8">
                <h2 className="text-3xl font-semibold mb-4 drop-shadow-lg">
                  Our Mission
                </h2>
                <p className="text-lg mb-4 font-light">
                  At EcoScore, we are passionate about finding practical ways to
                  reduce carbon emissions. Our team—Abhi, Faraz, Vijay, and
                  Mohamed—came together with a shared commitment to
                  environmental sustainability. Our goal is to provide
                  accessible tools and insights to empower individuals and
                  communities to make eco-friendly choices. Through EcoScore, we
                  hope to contribute to a greener, more sustainable future.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-semibold mb-4 drop-shadow-lg">
                The Urgency of Climate Action
              </h2>
              <p className="text-lg mb-6 font-light">
                The Earth currently emits around{" "}
                <span className="font-bold text-green-400">
                  37.4 billion tonnes of carbon dioxide annually,
                </span>{" "}
                contributing to increased climate instability—from extreme
                weather events to rising sea levels. At EcoScore, our aim is to
                help reduce global carbon emissions to net zero by 2050.
                Achieving this will require collective action, and small changes
                like reducing energy use, opting for public transport, and
                advocating for renewable energy can make a real difference.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-semibold mb-4 drop-shadow-lg">
                The Impact of Air Pollution
              </h2>
              <p className="text-lg mb-6 font-light">
                Every year,{" "}
                <span className="text-green-400 font-bold">
                  8.1 million premature deaths
                </span>{" "}
                are attributed to air pollution, and{" "}
                <span className="font-bold text-green-400">
                  90% of the world's population
                </span>{" "}
                breathes air that exceeds the World Health Organization's
                guideline limits. Pollution is a major threat to human health,{" "}
                <span className="font-bold text-green-400">
                  affecting over 100 million people globally.
                </span>{" "}
                At EcoScore, we believe that by spreading awareness and
                encouraging sustainable choices, we can reduce emissions and
                improve air quality for all.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold mb-4 drop-shadow-lg">
                Join the Movement
              </h2>
              <p className="text-lg mb-8 font-light">
                The world is facing a critical moment in its battle against
                climate change. But with the right tools, knowledge, and
                commitment, we can make a lasting impact. At EcoScore, we aim to
                provide individuals with the means to track and reduce their
                carbon footprints through gamified actions, community
                engagement, and educational resources. Together, we can create a
                greener, more sustainable future.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
