import Link from "next/link";
import { Circle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { adminSideBar } from "@/constants";

const ASidebar = () => {
  return (
    <div className="h-[calc(100svh-60px)] bg-slate-800 px-3 py-4 text-slate-50">
      <Accordion type="single" collapsible>
        {adminSideBar.map((item) => {
          if (item.hasSubMenu) {
            return (
              <AccordionItem
                key={item.name}
                value={item.name}
                className="border-none"
              >
                <AccordionTrigger className="no-focus flex items-center justify-between rounded-lg p-3 font-semibold hover:bg-primary-hover hover:no-underline data-[state=open]:bg-slate-50 data-[state=open]:text-primary-hover">
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
                        className="no-focus inline-block w-full border-l-2 border-transparent px-3 py-2 pl-5 transition-all hover:border-primary hover:text-primary"
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
                  className="no-focus flex items-center rounded-lg font-semibold hover:bg-primary-hover"
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
