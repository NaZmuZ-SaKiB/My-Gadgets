"use client";

import { Resolver, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TProps = {
  children: ReactNode;
  defaultValues?: any;
  onSubmit: (data: any) => void;
  resolver?: Resolver;
  reset?: boolean;
  className?: string;
};

const MGForm = ({
  children,
  defaultValues,
  onSubmit,
  resolver,
  reset = true,
  className,
}: TProps) => {
  const formConfig: any = {};

  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  if (resolver) {
    formConfig.resolver = resolver;
  }

  const form = useForm(formConfig);

  const FSOnSubmit = (data: any) => {
    onSubmit(data);
    if (reset) {
      form.reset();
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(FSOnSubmit)}
        className={cn("flex flex-col gap-3", className)}
      >
        {children}
      </form>
    </Form>
  );
};

export default MGForm;
