import { icons } from "@/constants";
import Image from "next/image";

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
    <section className="pt-4 md:pt-6 pb-4">
      <h2 className="font-bold text-3xl text-slate-700">Our Specialities</h2>

      <div className="grid xs:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
        {servicesData.map((service) => (
          <div
            key={service.title}
            className="bg-slate-100 p-4 rounded-xl flex-1 gap-5 flex max-md:flex-col h-full items-center"
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
              <h3 className="max-lg:text-2xl text-xl font-bold">
                {service.title}
              </h3>
              <p className="text-slate-500 font-semibold">{service.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
