import Image from "next/image";

import { icons } from "@/constants";

const servicesData = [
  {
    icon: icons.serviceImg1,
    title: "Best prices & offers",
    subTitle: "Orders $50 or more",
  },
  {
    icon: icons.serviceImg2,
    title: "Fast delivery",
    subTitle: "24/7 amazing services",
  },
  {
    icon: icons.serviceImg3,
    title: "Easy returns",
    subTitle: "Within 7 days",
  },
  {
    icon: icons.serviceImg4,
    title: "Safe Delivery",
    subTitle: "Within 2 days",
  },
];

const Services = () => {
  return (
    <section className="pb-4 pt-4 md:pt-6">
      <h2 className="text-3xl font-bold text-slate-700">Our Specialities</h2>

      <div className="mt-6 grid gap-3 xs:grid-cols-2 lg:grid-cols-4">
        {servicesData.map((service) => (
          <div
            key={service.title}
            className="flex h-full flex-1 items-center gap-5 rounded-xl bg-slate-100 p-4 max-md:flex-col"
          >
            <div className="relative size-16">
              <Image
                fill
                src={service.icon}
                alt={service.title}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-3 max-md:items-center max-md:text-center">
              <h3 className="text-xl font-bold max-lg:text-2xl">
                {service.title}
              </h3>
              <p className="font-semibold text-slate-500">{service.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
