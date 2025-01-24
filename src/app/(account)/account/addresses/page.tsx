import AddShippingAddressModal from "@/components/global/shared/AddShippingAddressModal";
import { isUserLoggedIn } from "@/lib/actions/auth.action";
import { shippingAddressGetAllAction } from "@/lib/actions/shippingAddress.action";
import { TShippingAddress } from "@/types/shippingAddress.type";
import EditShippingAddressModal from "./_components/EditShippingAddressModal";
import ShippingAddressSetDefaultButton from "./_components/ShippingAddressSetDefaultButton";

const MyAddressesPage = async () => {
  const user = await isUserLoggedIn();

  const addressData = await shippingAddressGetAllAction(`user=${user?._id}`);
  const addresses: TShippingAddress[] = addressData?.data || [];

  return (
    <div className="lg:mg-container">
      <h1 className="mb-4 text-3xl font-semibold text-slate-700">
        Your Addresses
      </h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {addresses.length > 0
          ? addresses.map((address) => (
              <div
                key={`${address?._id}`}
                className={
                  "flex cursor-pointer flex-col justify-between rounded-lg border-2 border-slate-50 bg-slate-50 p-2 text-sm text-slate-700"
                }
              >
                <div>
                  <p>
                    {address?.addressLine1}{" "}
                    {address?.default && (
                      <span className="text-orange-500">(Default Address)</span>
                    )}
                  </p>
                  {address?.addressLine2 && <p>{address?.addressLine2}</p>}
                  <p>
                    <span>City: {address.city}</span>
                    {", "}
                    <span>District: {address.district}</span>
                  </p>
                  <p>
                    <span>Division: {address.division}</span>
                    {", "}
                    <span>Zip: {address.zipCode}</span>
                  </p>
                  <p>Phone: {address.phone}</p>
                </div>

                <div className="mt-4 flex items-center gap-1">
                  <ShippingAddressSetDefaultButton
                    id={address._id}
                    isDefault={address.default}
                  />
                  <EditShippingAddressModal currentAddress={address} />
                </div>
              </div>
            ))
          : null}

        {addresses.length <= 4 ? <AddShippingAddressModal /> : null}
      </div>
    </div>
  );
};

export default MyAddressesPage;
