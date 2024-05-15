import React, { useState } from "react";
import TextInput from "@/components/input/text-input";
import { toast } from "react-toastify";
import Button from "@/components/button";
import Card from "@/components/card";
import { useFormik } from "formik";
import { updatePassword, updateUser } from "@/helpers/api/user";
import Modal from "@/components/modal";
import * as Yup from "yup";

const PasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required(),
  newPassword: Yup.string().required(),
  newPassword2: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
    .required(),
});

const UserCardForm = ({ user = {} }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (values, f) => {
    const handleSuccess = (response) => {
      toast.success("U kry!");
      form.resetForm({ values });
    };

    const handleError = (e) => {
      console.error(e.toString());
      toast.error("Su kry.");
    };

    setIsSubmitting(true);
    updateUser({
      id: user.id,
      ...values,
    })
      .then(handleSuccess)
      .catch(handleError)
      .finally(() => setIsSubmitting(false));
  };

  const form = useFormik({
    initialValues: {
      name: user.name,
    },
    onSubmit: handleSubmit,
  });

  const handleChangePassword = (values) => {
    const handleSuccess = (response) => {
      console.log("handleSuccess", { response });
      toast.success("Password changed successfully");
      closeChangePassModal();
    };
    const handleError = (error) => {
      console.error("handleError", { error });
      toast.error(error.toString());
    };

    setIsSubmitting(true);
    updatePassword(values)
      .then(handleSuccess)
      .catch(handleError)
      .finally(() => setIsSubmitting(false));
  };

  const passwordForm = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      newPassword2: "",
    },
    validationSchema: PasswordSchema,
    onSubmit: handleChangePassword,
  });

  const openChangePassModal = () => setIsModalOpen(true);

  const closeChangePassModal = () => {
    setIsModalOpen(false);
    passwordForm.resetForm();
  };

  return (
    <Card title="User" className="mb-10 grid grid-cols-3 gap-3">
      <TextInput
        label="Name"
        id="name"
        name="name"
        value={form.values.name}
        onChange={form.handleChange}
      />
      <TextInput disabled label="Email" value={user.email} />
      <TextInput disabled label="Role" value={user.role} />

      <div className="col-span-3 flex min-h-[40px] items-center justify-between gap-3">
        <Button variant="text" onClick={openChangePassModal}>
          Change password
        </Button>

        {form.dirty && (
          <div>
            <Button variant="outline" onClick={form.resetForm}>
              Reset
            </Button>
            <Button
              disabled={isSubmitting}
              className="col-span-2 ml-2"
              onClick={form.handleSubmit}
            >
              Save
            </Button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal
          title="Change Password"
          submitDisabled={isSubmitting}
          submit={passwordForm.handleSubmit}
          cancel={closeChangePassModal}
        >
          <TextInput
            autoComplete="new-password"
            label="Old Password"
            wrapperClassName="mb-2"
            type="password"
            placeholder="Insert old password"
            id="oldPassword"
            name="oldPassword"
            value={passwordForm.values.oldPassword}
            onChange={passwordForm.handleChange}
            errorMessage={passwordForm.errors.oldPassword}
          />
          <TextInput
            autoComplete="new-password"
            label="New Password"
            wrapperClassName="mb-2"
            type="password"
            placeholder="Insert new password"
            id="newPassword"
            name="newPassword"
            value={passwordForm.values.newPassword}
            onChange={passwordForm.handleChange}
            errorMessage={passwordForm.errors.newPassword}
          />
          <TextInput
            autoComplete="new-password"
            type="password"
            placeholder="Insert new password"
            id="newPassword2"
            name="newPassword2"
            value={passwordForm.values.newPassword2}
            onChange={passwordForm.handleChange}
            errorMessage={passwordForm.errors.newPassword2}
          />
        </Modal>
      )}
    </Card>
  );
};

export default UserCardForm;
