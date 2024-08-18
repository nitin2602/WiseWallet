'use client'

import  Link  from 'next/link';

function Hero() {
 
  return (
    <div>
      <section className="pt-12 bg-gray-50 sm:pt-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="px-6 text-lg text-gray-600 font-inter">
              Plan Today, Prosper Tomorrow.
            </h1>
            <p className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj">
              Take Control of Your Finances with Ease
              
            </p>

            <div className="px-8 sm:items-center sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-9">
              <Link
               href="/dashboard"
                
                className="inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Go to Dashboard
              </Link>

              
            </div>

            <p className="mt-8 text-base text-gray-500 font-inter">
            No Cost, Just Savings
            </p>
          </div>
        </div>

        <div className="pb-12 bg-white">
          <div className="relative">
            <div className="absolute inset-0 h-2/3 bg-gray-50"></div>
            <div className="relative mx-auto">
              <div className=" w-auto p-10 flex justify-center items-center lg:max-w-5xl lg:mx-auto">
                <img
                  className="transform scale-110"
                  src="./heroimg.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
