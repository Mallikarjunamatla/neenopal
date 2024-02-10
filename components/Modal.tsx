import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { UserData } from './Person';

type Props = {
  editModalVisible: boolean;
  closeModal: any;
  transformOrigin: any;
  handleOk: any;
  formData: UserData;
};

interface FormFields {
  [key: string]: {
    required: boolean;
    type: any;
  };
}
const schemaValidation: FormFields = {
  name: {
    required: true,
    type: 'text',
  },
  email: {
    required: true,
    type: 'email',
  },
  phone: {
    required: true,
    type: 'tel',
  },
  website: {
    required: true,
    type: 'text',
  },
};
const Modal = React.forwardRef(function MyModal(
  { editModalVisible, closeModal, transformOrigin, handleOk, formData }: Props,
  modalContentRef: React.ForwardedRef<any>
) {
  const [formCurrData, setFormData] = useState(formData);
  const [errors, setErrors] = useState<any>({});
  useEffect(() => {
    setFormData(formData);
  }, [formData]);

  const errorValidation = (name: string, value: string) => {
    if (schemaValidation[name].required && !value) {
      setErrors((pre: any) => ({
        ...pre,
        [name]: { message: 'This field is required' },
      }));
      return true;
    } else {
      // Email validation
      if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors((pre: any) => ({
          ...pre,
          email: { message: 'Invalid email' },
        }));
        return true;
      } else {
        const updatedErrors = Object.entries(errors).filter(
          ([key, value]) => key !== name && value
        );
        setErrors(Object.fromEntries(updatedErrors));
        return false;
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    errorValidation(name, value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // if (schemaValidation[name].required && !value) {
    //   setErrors((pre) => ({
    //     ...pre,
    //     [name]: { message: 'This field is required' },
    //   }));
    // } else {
    //   // Email validation
    //   if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    //     setErrors((pre) => ({ ...pre, email: { message: 'Invalid email' } }));
    //   } else {
    //     setErrors((pre) => ({ ...pre, [name]: false }));
    //     setFormData((prevData) => ({ ...prevData, [name]: value }));
    //   }
    // }
  };
  const onSubmit = (event: any) => {
    event.preventDefault();
    const formData1: any = new FormData(event.target);
    const user: any = { id: formCurrData.id };
    let anyError = false;
    for (let [key, value] of formData1.entries()) {
      user[key] = value;
      if (!anyError) {
        anyError = errorValidation(key, value);
      }
    }
    if (!anyError) {
      handleOk(user);
    }
  };
  return (
    <div
      className={`${
        editModalVisible ? 'modal-overlay active' : 'modal-overlay'
      }`}
      onClick={closeModal}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        ref={modalContentRef}
        className={`modal-content ${editModalVisible ? 'active' : ''}`}
        style={{ transformOrigin: transformOrigin }}
      >
        <div className="edit__user__wrapper">
          <div className="edit__header">
            <span>Basic Modal</span>
            <button className="close" onClick={closeModal}>
              <Image
                width={18}
                height={18}
                src={'/icons/close.svg'}
                alt="phone"
              />
            </button>
          </div>
          <form id="form" className="form" onSubmit={onSubmit}>
            <div className="fields">
              <div className="field">
                <label
                  htmlFor="name"
                  className="edit__fields__label"
                  title="Name"
                >
                  Name:
                </label>
                <div className="input__container">
                  <input
                    className="edit__fields__input"
                    type="text"
                    name="name"
                    value={formCurrData.name}
                    required
                    onChange={handleChange}
                  />
                  {errors['name'] && (
                    <span className="error">
                      {errors['name']?.message || ' '}
                    </span>
                  )}
                </div>
              </div>
              <div className="field">
                <label
                  htmlFor="email"
                  className="edit__fields__label"
                  title="Email"
                >
                  Email :
                </label>
                <div className="input__container">
                  <input
                    className="edit__fields__input"
                    type="email"
                    name="email"
                    value={formCurrData.email}
                    required
                    onChange={handleChange}
                  />
                  {errors['email'] && (
                    <span className="error">
                      {errors['email']?.message || ' '}
                    </span>
                  )}
                </div>
              </div>
              <div className="field">
                <label
                  htmlFor="phone"
                  className="edit__fields__label"
                  title="Phone"
                >
                  Phone :
                </label>
                <div className="input__container">
                  <input
                    className="edit__fields__input"
                    type="tel"
                    name="phone"
                    value={formCurrData.phone}
                    required
                    onChange={handleChange}
                  />
                  {errors['phone'] && (
                    <span className="error">
                      {errors['phone']?.message || ' '}
                    </span>
                  )}
                </div>
              </div>
              <div className="field">
                <label
                  htmlFor="Website"
                  className="edit__fields__label"
                  title="Website"
                >
                  Website :
                </label>
                <div className="input__container">
                  <input
                    className="edit__fields__input"
                    type="text"
                    name="website"
                    value={formCurrData.website}
                    onChange={handleChange}
                    required
                  />
                  {errors['website'] && (
                    <span className="error">
                      {errors['website']?.message || ' '}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="form__actions">
              <button
                type="button"
                className="button__cancel"
                onClick={closeModal}
              >
                Cancel
              </button>
              <input
                formNoValidate={true}
                type="submit"
                className="button__ok"
                value={'OK'}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default Modal;
