"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import MGAInput from "@/components/admin/forms/MGAInput";
import MGAMultiSelect from "@/components/admin/forms/MGAMultiSelect";
import MGASelect from "@/components/admin/forms/MGASelect";
import {
  chargingPortOptions,
  compatibilityOptions,
  connectivityOptions,
  operatingSystemOptions,
  powerSourceOptions,
} from "@/constants";

const ProductFiltersForm = () => {
  return (
    <AFloatingBox className="">
      <div className="max-w-md flex flex-col gap-3">
        <MGAMultiSelect
          name="compatibility"
          label="Compatibility"
          options={compatibilityOptions}
          vertical
        />

        <MGAMultiSelect
          name="connectivity"
          label="Connectivity"
          options={connectivityOptions}
          vertical
        />

        <MGAMultiSelect
          name="powerSource"
          label="Power Source"
          options={powerSourceOptions}
          vertical
        />

        <MGASelect
          name="operatingSystem"
          label="Operating System"
          options={operatingSystemOptions}
          vertical
        />

        <MGASelect
          name="chargingPort"
          label="Charging Port"
          options={chargingPortOptions}
          vertical
        />

        <MGAInput
          name="weight"
          label="Weight"
          type="number"
          description="In Kg unit. Ex: 1.25"
          vertical
        />
        <MGAInput name="camera" label="Camera" type="number" vertical />
        <MGAInput
          name="displaySize"
          label="Display Size"
          type="number"
          description="In inches. Ex: 15.6"
          vertical
        />
      </div>
    </AFloatingBox>
  );
};

export default ProductFiltersForm;
