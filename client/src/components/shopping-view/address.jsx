import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "/store/shop/address-slice";
import CommonForm from "../common/form";
import AddressCard from "./address-card";
import { useToast } from "@/hooks/use-toast";
import { hcmcDistricts } from "@/config"; // Import danh sách quận huyện

const initialAddressFormData = {
  streetAddress: "",
  ward: "",
  district: "",
  city: "",
  phone: "",
  notes: "",
  addressType: "Home",
  isDefault: false,
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredWards, setFilteredWards] = useState([]);
  const [filteredStreets, setFilteredStreets] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  useEffect(() => {
    // Cập nhật danh sách quận huyện khi chọn thành phố
    if (formData.city === "HCM") {
      setFilteredDistricts(hcmcDistricts);
    } else {
      setFilteredDistricts([]);
    }
    setFormData((prev) => ({ ...prev, district: "", ward: "" })); // Reset district và ward
  }, [formData.city]);

  useEffect(() => {
    // Cập nhật danh sách phường xã khi chọn quận huyện
    const selectedDistrict = filteredDistricts.find(
      (district) => district.name === formData.district
    );
    if (selectedDistrict) {
      setFilteredWards(selectedDistrict.wards);
    } else {
      setFilteredWards([]);
    }
    setFormData((prev) => ({ ...prev, ward: "" })); // Reset ward
  }, [formData.district, filteredDistricts]);

  useEffect(() => {
    // Cập nhật danh sách tên đường khi chọn phường/xã
    const selectedWard = filteredWards.find((ward) => ward.name === formData.ward);
    if (selectedWard) {
      setFilteredStreets(selectedWard.streets || []);
    } else {
      setFilteredStreets([]);
    }
  }, [formData.ward, filteredWards]);

  function handleManageAddress(event) {
    event.preventDefault();

    const errorMessage = validateFormData(formData);
    if (errorMessage) {
      toast({
        title: "Lỗi nhập liệu",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "Bạn chỉ có thể thêm tối đa 3 địa chỉ.",
        variant: "destructive",
      });
      return;
    }

    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast({
              title: "Cập nhật địa chỉ thành công.",
            });
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
            toast({
              title: "Thêm địa chỉ thành công.",
            });
          }
        });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    if (!getCurrentAddress) return;

    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      streetAddress: getCurrentAddress?.streetAddress || "",
      ward: getCurrentAddress?.ward || "",
      district: getCurrentAddress?.district || "",
      city: getCurrentAddress?.city || "",
      phone: getCurrentAddress?.phone || "",
      notes: getCurrentAddress?.notes || "",
      addressType: getCurrentAddress?.addressType || "Home",
      isDefault: getCurrentAddress?.isDefault || false,
    });
  }

  function isFormValid() {
    return Object.values(formData).every(
      (value) => value !== undefined && value !== null && value.toString().trim() !== ""
    );
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllAddresses(user?.id));
    }
  }, [dispatch, user?.id]);

  function validateFormData(data) {
    if (!data.city) {
      return "Vui lòng chọn Tỉnh/Thành phố.";
    }
    if (!data.district) {
      return "Vui lòng chọn Quận/Huyện.";
    }
    if (!data.ward) {
      return "Vui lòng chọn Phường/Xã.";
    }
    if (!data.streetAddress.trim()) {
      return "Vui lòng nhập Số nhà, Tên đường.";
    }
    if (!data.phone.trim()) {
      return "Vui lòng nhập Số điện thoại.";
    }
    if (!/^\d{10,11}$/.test(data.phone)) {
      return "Số điện thoại không hợp lệ. Vui lòng nhập 10-11 chữ số.";
    }
    return null; // Không có lỗi
  }

  return (
    <Card className="p-6 bg-white shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center mb-4">
          Quản lý địa chỉ của bạn
        </CardTitle>
        <p className="text-gray-600 text-center">
          Hãy chọn hoặc thêm mới địa chỉ của bạn.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {addressList && addressList.length > 0 ? (
            addressList.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem._id}
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">Không tìm thấy địa chỉ nào.</p>
          )}
        </div>
        <CardHeader>
          <CardTitle>
            {currentEditedId !== null ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <CommonForm
            formControls={addressFormControls.map((control) => {
              if (control.name === "district") {
                return { ...control, options: filteredDistricts.map((d) => ({ id: d.name, label: d.name })) };
              }
              if (control.name === "ward") {
                return { ...control, options: filteredWards.map((w) => ({ id: w.name, label: w.name })) };
              }
              if (control.name === "streetAddress") {
                return {
                  ...control,
                  suggestions: filteredStreets.map((street) => ({ id: street, label: street })),
                };
              }
              return control;
            })}
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditedId !== null ? "Cập nhật" : "Thêm mới"}
            onSubmit={handleManageAddress}
            isBtnDisabled={!isFormValid()}
          />
        </CardContent>
      </CardContent>
    </Card>
  );
}

export default Address;
