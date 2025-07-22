import React from "react";

const HomeIntroduction = () => {
    return (
        <section className="w-full bg-primary/10 my-32">
            <div className="container max-w-[1560px] mx-auto px-3 lg:px-4 max-[1560px]:px-6  py-20 lg:py-32">
                <div className="flex flex-col gap-8">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                        <div className="flex flex-col gap-6">
                            <div className="flex gap-3 items-center ">
                                <span className="bg-gray-100 h-1 w-20"></span>
                                <h3 className="h3">INTRODUCTION</h3>
                            </div>
                            <p className="p-base text-gray-200">
                                Welcome to Ceylanray Travels! From serene beach getaways to immersive cultural tours and exhilarating adventures, we craft personalized journeys that match your travel
                                style. Let us transform your wanderlust into lasting memories. Your next adventure begins with us.
                            </p>
                            <div className="mt-6">
                                <div className="flex gap-3 items-center ">
                                    <span className="bg-gray-100 h-1 w-20"></span>
                                    <h3 className="h3">Sigiriya UNESCO</h3>
                                </div>
                                <p className="p-base text-gray-700">
                                    Sigiriya, also known as Lion Rock, is a UNESCO World Heritage Site in Sri Lanka.<br/>
                                    This ancient rock fortress rises dramatically from the central plains, offering breathtaking views.<br/>
                                    Built in the 5th century by King Kashyapa, Sigiriya is renowned for its stunning frescoes and water gardens.<br/>
                                    The site is a marvel of ancient urban planning and engineering.<br/>
                                    Visitors can climb to the summit for panoramic vistas and explore the remnants of the royal palace.<br/>
                                    Sigiriya stands as a testament to Sri Lanka's rich cultural and historical heritage.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="relative w-full h-[300px] lg:h-[500px] rounded-lg overflow-hidden">
                                <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
                                    <source src="/home/sigiriya.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeIntroduction;
