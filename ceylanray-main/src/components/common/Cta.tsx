import { Button } from "./Button";

export const Cta = () => {
  return (
    <div className="relative z-20 mt-12 max-[1560px]:mx-4 max-sm:mx-2">
      <div className="relative h-[800px] max-sm:h-[500px] rounded-lg max-w-[1560px] mx-auto w-full overflow-hidden">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/common/cta-forest.jpg')", // Replace with your image path
            backgroundSize: "cover",
            backgroundPosition: "bottom"
          }}
        />

        {/* Video Layer with Opacity */}
        <div className="absolute inset-0 z-10">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-50"
          >
            <source src="/common/cta-beach-3s.mp4" type="video/mp4" /> {/* Replace with your video path */}
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#4AC5F0]/20 to-[#4AC5F0]/20" />
        </div>

        {/* Content Layer */}
        <div className="relative z-20  max-w-[1560px] mx-auto h-full flex flex-col items-center justify-center text-center px-4">
          {/* Gradient Text */}
          <div className="max-w-3xl mb-8">
            <p className="h3 max-sm:p-large max-sm:leading-tight font-medium leading-tight tracking-tight bg-gradient-to-r from-gray-500 to-black bg-clip-text text-transparent">
              Ready to embark on your next adventure? <br />Connect with Ceylanray today to start planning your dream trip
            </p>
          </div>

          {/* Decorative Button */}
          <Button variant="decorative" className="mb-40">
            Book now
          </Button>

          {/* Large White Text */}
          <h1 className=" max-xl:text-[150px]  max-lg:text-[100px] max-sm:text-[50px]  max-[1560px]:text-[200px] text-[244px] font-bold text-white  leading-none">
            CEYLANRAY
          </h1>
        </div>
      </div>
    </div>
  );
};
