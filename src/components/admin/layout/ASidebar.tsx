import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { adminSideBar } from "@/constants";
import { Circle } from "lucide-react";
import Link from "next/link";

const ASidebar = () => {
  return (
    <div className="bg-slate-800 h-[calc(100svh-60px)] py-4 px-3 text-slate-50">
      <Accordion type="single" collapsible>
        {adminSideBar.map((item) => {
          if (item.hasSubMenu) {
            return (
              <AccordionItem
                key={item.name}
                value={item.name}
                className="border-none"
              >
                <AccordionTrigger className="p-3 font-semibold no-focus flex justify-between items-center rounded-lg hover:bg-primary-hover hover:no-underline data-[state=open]:bg-slate-50 data-[state=open]:text-primary-hover">
                  {item.link ? (
                    <Link
                      href={item.link}
                      className="no-focus flex items-center"
                    >
                      <div className="mr-3">
                        {item.icon ? (
                          <item.icon className="size-5" />
                        ) : (
                          <Circle className="size-5" />
                        )}
                      </div>
                      {item.name}
                    </Link>
                  ) : (
                    <span className="no-focus flex items-center">
                      <div className="mr-3">
                        <item.icon className="size-5" />
                      </div>
                      {item.name}
                    </span>
                  )}
                </AccordionTrigger>

                <AccordionContent className="ml-5 border-l border-slate-500 text-base">
                  {item.subMenus?.map((subItem) => (
                    <div key={subItem.name}>
                      <Link
                        href={subItem.link}
                        className="px-3 py-2 pl-5 inline-block no-focus w-full border-l-2 border-transparent hover:border-primary hover:text-primary transition-all"
                      >
                        {subItem.name}
                      </Link>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            );
          } else {
            return (
              <div key={item.name}>
                <Link
                  href={item.link}
                  className="no-focus flex items-center font-semibold rounded-lg hover:bg-primary-hover"
                >
                  <div className="p-3">
                    <item.icon className="size-5" />
                  </div>
                  {item.name}
                </Link>
              </div>
            );
          }
        })}
      </Accordion>
    </div>
  );
};

export default ASidebar;
