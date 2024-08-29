"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import MGARichInput from "@/components/admin/forms/MGARichInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductSpecsForm = () => {
  return (
    <AFloatingBox>
      <Tabs defaultValue="shortSpecification" className="w-full">
        <TabsList className="w-full flex mb-3">
          <TabsTrigger className="flex-1" value="shortSpecification">
            Short Specification
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="specification">
            Specification
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="description">
            Description
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shortSpecification">
          <MGARichInput
            name="shortSpecification"
            label="Short Specification*"
            height="200px"
          />
        </TabsContent>

        <TabsContent value="specification">
          <MGARichInput
            name="specification"
            label="Specification*"
            height="400px"
          />
        </TabsContent>

        <TabsContent value="description">
          <MGARichInput name="description" label="Description" height="400px" />
        </TabsContent>
      </Tabs>
    </AFloatingBox>
  );
};

export default ProductSpecsForm;
