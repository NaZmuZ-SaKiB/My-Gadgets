import Link from "next/link";
import { Metadata } from "next";
import { Suspense } from "react";

import Outlets from "./Outlets";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about My-Gadgets and our commitment to innovation.",
};

const AboutUsPage = () => {
  return (
    <div className="mg-container pb-10">
      {/* Hero Section */}
      <div className="py-5 text-center md:my-12">
        <h1 className="text-2xl font-bold text-primary sm:mb-2 sm:text-3xl md:text-4xl">
          Welcome to <span className="text-primary">My-Gadgets</span>
        </h1>
        <p className="text-slate-700 max-md:text-sm">
          Your Ultimate Destination for the Latest Gadgets
        </p>
      </div>

      {/* About Section */}
      <div className="mb-12 rounded-xl px-2 max-md:text-sm md:border md:p-8">
        <h2 className="mb-2 text-xl font-bold text-primary sm:mb-6 md:text-2xl">
          About My-Gadgets
        </h2>
        <p className="mb-4 text-slate-700">
          At <span className="font-semibold">My-Gadgets</span>, we are
          passionate about bringing you the most innovative and cutting-edge
          gadgets on the market. Whether you{`'`}re a tech enthusiast, a casual
          shopper, or searching for the perfect gift, our carefully curated
          collection has something for everyone.
        </p>
        <p className="mb-4 text-slate-700">
          Our mission is to make technology accessible and exciting. From the
          latest smartphones and smartwatches to gaming accessories and home
          automation devices, we ensure you stay ahead of the curve with our
          regularly updated inventory.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="mb-12 rounded-xl px-2 max-md:text-sm md:border md:p-8">
        <h2 className="mb-2 text-xl font-bold text-primary sm:mb-6 md:text-2xl">
          Why Choose My-Gadgets?
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="">
            <h3 className="mb-2 text-lg font-semibold text-slate-700 md:text-xl">
              Wide Selection
            </h3>
            <p className="text-slate-600">
              Explore a vast range of gadgets, carefully curated to meet your
              needs and preferences.
            </p>
          </div>
          <div className="">
            <h3 className="mb-2 text-xl font-semibold text-slate-700">
              Competitive Prices
            </h3>
            <p className="text-slate-600">
              Enjoy the best deals on top brands without compromising on
              quality.
            </p>
          </div>
          <div className="">
            <h3 className="mb-2 text-xl font-semibold text-slate-700">
              Customer Satisfaction
            </h3>
            <p className="text-slate-600">
              Our dedicated support team is always here to assist you with any
              questions or concerns.
            </p>
          </div>
        </div>
      </div>

      {/* Shop by Category Section */}
      <div className="mb-12 rounded-xl px-2 max-md:text-sm md:border md:p-8">
        <h2 className="mb-2 text-xl font-bold text-primary sm:mb-6 md:text-2xl">
          Explore Our Categories
        </h2>
        <p className="mb-6 text-slate-700">
          Discover a world of innovation with our extensive catalog. Whether you
          {`'`}re looking for the latest smartphones, smartwatches, or gaming
          accessories, we{`'`}ve got you covered.
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {[
            "Smartphones & Accessories",
            "Wearables & Smartwatches",
            "Home Automation",
            "Gaming & Entertainment",
            "Audio & Sound",
          ].map((category, index) => (
            <div key={index} className="rounded-lg bg-slate-50 p-4 text-center">
              <p className="font-medium text-slate-700">{category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stay Connected Section */}
      <div className="mb-12 rounded-xl px-2 max-md:text-sm md:border md:p-8">
        <h2 className="mb-2 text-xl font-bold text-primary sm:mb-6 md:text-2xl">
          Stay Connected with Us
        </h2>
        <p className="mb-4 text-slate-700">
          Join our growing community of tech enthusiasts and stay updated with
          the latest news, reviews, and exclusive offers. Follow us on social
          media and subscribe to our newsletter to never miss an update.
        </p>
        <div className="flex space-x-4">
          <button className="rounded-lg bg-primary px-6 py-2 text-white transition duration-300 hover:bg-primary-hover">
            Follow Us
          </button>
          <button className="rounded-lg bg-slate-700 px-6 py-2 text-white transition duration-300 hover:bg-slate-700">
            Subscribe
          </button>
        </div>
      </div>

      {/* Outlets Section */}
      <div className="mb-12 rounded-xl px-2 max-md:text-sm md:border md:p-8">
        <h2 className="mb-2 text-xl font-bold text-primary sm:mb-6 md:text-2xl">
          Visit Our Outlets
        </h2>
        <p className="mb-6 text-slate-700">
          We have multiple locations across Dhaka to serve you better. Visit us
          today and experience the latest gadgets in person.
        </p>
        <Suspense>
          <Outlets />
        </Suspense>
      </div>

      {/* Call to Action Section */}
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold text-primary">
          Ready to Explore?
        </h2>
        <p className="mb-6 text-slate-700">
          Elevate your tech game today! Browse our collection and discover the
          gadgets that will transform your lifestyle.
        </p>
        <Link
          href="/shop"
          className="rounded-lg bg-primary px-8 py-3 text-white transition duration-300 hover:bg-primary-hover"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default AboutUsPage;
