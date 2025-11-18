import React from "react";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider as Form,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

type TProp<T extends FieldValues> = {
  methods: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
};

type Props<T extends FieldValues> = TProp<T> &
  Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit">;

export default function RFormProvider<T extends FieldValues>({
  children,
  onSubmit,
  methods,
  ...other
}: Props<T>) {
  return (
    <Form {...methods}>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          methods.handleSubmit(onSubmit)(e);
        }} 
        {...other}
      >
        {children}
      </form>
    </Form>
  );
}
