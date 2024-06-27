import React, {useState} from "react";
import {toast} from "react-toastify";
import {GoogleMapsEmbed} from "@next/third-parties/google";
import Card from "@/components/card";
import ImageUploading from "react-images-uploading";
import SubTitle from "@/components/sub-title";
import SvgIcon from "@/components/svg-icon";
import {useFormik} from "formik";
import TextInput from "@/components/input/text-input";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import Input from "@/components/input";
import {AL, GB} from "country-flag-icons/react/3x2";
import Link from "next/link";
import Button from "@/components/button";
import InputLabel from "@/components/input/input-label";
import {updateAccount} from "@/helpers/api/user";

const Placeholder = (props) => (
    <div
        className="relative flex h-[150px] w-full cursor-pointer items-center justify-center rounded-xl bg-gray-100"
        onClick={props.onClick}
    >
        <span className="text-gray-400">{props.text}</span>
    </div>
);

const AccountCardForm = ({account}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (values) => {
        const onSuccess = (data) => {
            console.log('onSuccess data', data);
            toast.success("U kry!");
        };

        const onError = (error) => {
            console.log('onError error', error.toString());
            toast.error("Su kry.");
        };

        setIsSubmitting(true);
        updateAccount(account.id, {
            ...values,
            faqAl: {faqs: values.faqAl},
            faqEn: {faqs: values.faqEn},
        })
            .then(onSuccess)
            .catch(onError)
            .finally(() => setIsSubmitting(false));
    };

    const formik = useFormik({
        initialValues: {
            logo: "",
            banner: "",
            name: account.name,
            subscription: account.subscription,
            address: {
                address_line_1: account.address?.address_line_1 || '',
                address_line_2: account.address?.address_line_2 || '',
                country: account.address?.country.name || '',
                city: account.address?.city.name || '',
                zip_code: account.address?.zip_code || '',
                coordinates: account.address?.coordinates || '',
            },
            website: account.website,
            phone: account.phone,
            email: account.email,
            openHours: {
                monday: {
                    open: account.openHours?.monday?.open,
                    close: account.openHours?.monday?.close,
                },
                tuesday: {
                    open: account.openHours?.tuesday?.open,
                    close: account.openHours?.tuesday?.close,
                },
                wednesday: {
                    open: account.openHours?.wednesday?.open,
                    close: account.openHours?.wednesday?.close,
                },
                thursday: {
                    open: account.openHours?.thursday?.open,
                    close: account.openHours?.thursday?.close,
                },
                friday: {
                    open: account.openHours?.friday?.open,
                    close: account.openHours?.friday?.close,
                },
                saturday: {
                    open: account.openHours?.saturday?.open,
                    close: account.openHours?.saturday?.close,
                },
                sunday: {
                    open: account.openHours?.sunday?.open,
                    close: account.openHours?.sunday?.close,
                },
            },
            descriptionAl: account.descriptionAl,
            descriptionEn: account.descriptionEn,
            faqAl: account.faqAl?.faqs || [],
            faqEn: account.faqEn?.faqs || [],
        },
        onSubmit: handleSubmit,
    });

    const addFaq = (lang) => {
        const field = `faq${lang}`;
        formik.setFieldValue(field, [
            ...formik.values[field],
            {title: "", content: ""},
        ]);
    };

    const removeFaq = (lang, index) => {
        const field = `faq${lang}`;
        const newState = formik.values[field].filter((_, idx) => idx !== index);
        formik.setFieldValue(field, newState);
    };

    const updateFaq = (lang, key, index, value) => {
        const field = `faq${lang}`;
        const newState = formik.values[field].map((faq, idx) => {
            if (idx !== index) return faq;

            return {
                ...faq,
                [key]: value,
            };
        });
        formik.setFieldValue(field, newState);
    };

    const handleChangeLogo = (imageList, addUpdateIndex) => {
        formik.setFieldValue("logo", imageList);
    };

    const handleChangeBanner = (imageList, addUpdateIndex) => {
        formik.setFieldValue("banner", imageList);
    };

    const handleChangeTime = (time = "", key) => {
        formik.setFieldValue(key, time);
    };

    const mapAddress = `${formik.values.address.address_line_1},${formik.values.address.address_line_2},${formik.values.address.city},${formik.values.address.country},${formik.values.address.zip_code}`;

    return (
        <Card title="Account" className="grid grid-cols-1 gap-3">
            {/* LOGO & BANNER */}
            <div className="flex h-[200px] gap-4">
                {/* LOGO */}
                <div className="w-full max-w-[200px]">
                    <SubTitle className="!text-left">Logo</SubTitle>

                    <ImageUploading
                        value={formik.values.logo}
                        onChange={handleChangeLogo}
                        dataURLKey="data_url"
                    >
                        {({
                              imageList,
                              onImageUpload,
                              onImageRemoveAll,
                              onImageUpdate,
                              onImageRemove,
                              isDragging,
                              dragProps,
                          }) => (
                            // write your building UI
                            <div className="">
                                <div className="flex justify-between gap-1">
                                    {imageList.length === 0 && (
                                        <Placeholder text="Add a logo" onClick={onImageUpload}/>
                                    )}
                                </div>
                                <div className="">
                                    {imageList.map((image, index) => (
                                        <div
                                            key={index}
                                            className="group/image relative h-[150px] w-full overflow-hidden rounded-xl border"
                                        >
                                            <img
                                                src={image["data_url"]}
                                                alt=""
                                                width="100"
                                                className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
                                            />
                                            <div
                                                className="image-item__btn-wrapper absolute h-full w-full bg-black opacity-0 group-hover/image:opacity-50">
                                                <button
                                                    onClick={() => onImageUpdate(index)}
                                                    className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 font-bold text-white"
                                                >
                                                    Edit
                                                </button>
                                                <div className="group/delete inline-block">
                                                    <button
                                                        onClick={() => onImageRemove(index)}
                                                        className="absolute right-[5px] top-[5px] rounded-full border-2 p-2 group-hover/delete:border-red-400"
                                                    >
                                                        <SvgIcon
                                                            name="close"
                                                            className="fill-white group-hover/delete:fill-red-400"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </ImageUploading>
                </div>

                {/* BANNER */}
                <div className="w-full">
                    <SubTitle className="!text-left">Banner</SubTitle>

                    <ImageUploading
                        value={formik.values.banner}
                        onChange={handleChangeBanner}
                        dataURLKey="data_url"
                    >
                        {({
                              imageList,
                              onImageUpload,
                              onImageRemoveAll,
                              onImageUpdate,
                              onImageRemove,
                              isDragging,
                              dragProps,
                          }) => (
                            // write your building UI
                            <div className="">
                                <div className="flex justify-between gap-1">
                                    {imageList.length === 0 && (
                                        <Placeholder text="Add a banner" onClick={onImageUpload}/>
                                    )}
                                </div>
                                <div className="">
                                    {imageList.map((image, index) => (
                                        <div
                                            key={index}
                                            className="group/image relative h-[150px] w-full overflow-hidden rounded-xl border"
                                        >
                                            <img
                                                src={image["data_url"]}
                                                alt=""
                                                width="100"
                                                className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
                                            />
                                            <div
                                                className="image-item__btn-wrapper absolute h-full w-full bg-black opacity-0 group-hover/image:opacity-50">
                                                <button
                                                    onClick={() => onImageUpdate(index)}
                                                    className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 font-bold text-white"
                                                >
                                                    Edit
                                                </button>
                                                <div className="group/delete inline-block">
                                                    <button
                                                        onClick={() => onImageRemove(index)}
                                                        className="absolute right-[5px] top-[5px] rounded-full border-2 p-2 group-hover/delete:border-red-400"
                                                    >
                                                        <SvgIcon
                                                            name="close"
                                                            className="fill-white group-hover/delete:fill-red-400"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </ImageUploading>
                </div>
            </div>

            {/* SUBSCRIPTION */}
            <Card
                title={<SubTitle className="!m-0 !text-left">Subscription</SubTitle>}
            >
                <p>
                    Your current subscription is <strong>{account.subscription}</strong>
                    .&nbsp;
                    <Link href="/account/subscriptions" className="teal">
                        Check out all subscriptions and their perks here!
                    </Link>
                </p>
            </Card>

            <Card
                title={<SubTitle className="!m-0 !text-left">Contact Details</SubTitle>}
            >
                {/* NAME */}
                <TextInput
                    label="name"
                    id="name"
                    name="name"
                    placeholder="e.g. Ilir Meta"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />

                {/* WEBSITE */}
                <TextInput
                    label="website"
                    id="website"
                    name="website"
                    value={formik.values.website}
                    onChange={formik.handleChange}
                />

                {/* PHONE */}
                <TextInput
                    label="phone"
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                />

                {/* EMAIL */}
                <TextInput
                    label="email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />

                {/* ADDRESS */}
                <Card title="Address" className="mt-3 flex gap-4">
                    <div className="w-5/12">
                        <TextInput
                            label="ZIP Code"
                            id="zip_code"
                            name="address.zip_code"
                            value={formik.values.address.zip_code}
                            onChange={formik.handleChange}
                        />

                        <TextInput
                            label="Address line 1"
                            id="address.address_line_1"
                            name="address.address_line_1"
                            value={formik.values.address.address_line_1}
                            onChange={formik.handleChange}
                        />

                        <TextInput
                            label="Address line 2"
                            id="address.address_line_2"
                            name="address.address_line_2"
                            value={formik.values.address.address_line_2}
                            onChange={formik.handleChange}
                        />

                        <TextInput
                            label="Country"
                            id="address.country"
                            name="address.country"
                            value={formik.values.address.country}
                            onChange={formik.handleChange}
                        />

                        <TextInput
                            label="City"
                            id="address.city"
                            name="address.city"
                            value={formik.values.address.city}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div className="w-7/12">
                        <GoogleMapsEmbed
                            language="sq"
                            apiKey="AIzaSyA_rXmoJLHhRt07i6cpWIGxv2237-WPmX0"
                            width="100%"
                            height={400}
                            mode="place"
                            q={mapAddress}
                        />
                    </div>
                </Card>
            </Card>

            {/* DESCRIPTION */}
            <Card
                title={<SubTitle className="!m-0 !text-left">Description</SubTitle>}
            >
                <div className="flex gap-2">
                    <Input
                        id="descriptionAl"
                        name="descriptionAl"
                        value={formik.values.descriptionAl}
                        onChange={formik.handleChange}
                        type="textarea"
                        label={
                            <p>
                                Shqip <AL className="ml-1 inline-block h-4"/>
                            </p>
                        }
                        labelClassName="w-full"
                        placeholder="Shtoni pershkrimin"
                    />
                    <Input
                        id="descriptionEn"
                        name="descriptionEn"
                        value={formik.values.descriptionEn}
                        onChange={formik.handleChange}
                        type="textarea"
                        label={
                            <p>
                                English <GB className="ml-1 inline-block h-4"/>
                            </p>
                        }
                        labelClassName="w-full"
                        placeholder="Enter description"
                    />
                </div>
            </Card>

            {/* FAQ */}
            <Card title={<SubTitle className="!m-0 !text-left">FAQ</SubTitle>}>
                <div className="flex gap-2">
                    <div className="w-full">
                        <InputLabel
                            label={
                                <>
                                    Shqip <AL className="ml-1 inline-block h-4"/>
                                </>
                            }
                        />

                        <div>
                            {formik.values.faqAl.map((faq, index) => {
                                return (
                                    <div key={index} className="mb-2 flex gap-2">
                                        <Button
                                            variant="outline"
                                            className="!h-auto w-6 border-red-400 !p-1 text-sm text-red-400"
                                            onClick={() => removeFaq("Al", index)}
                                        >
                                            X
                                        </Button>
                                        <div className="w-full">
                                            <Input
                                                placeholder="Pyetja"
                                                className="mb-2"
                                                value={faq.title}
                                                handleChange={(e) =>
                                                    updateFaq("Al", "title", index, e.target.value)
                                                }
                                            />
                                            <Input
                                                placeholder="Pergjigja"
                                                value={faq.content}
                                                handleChange={(e) =>
                                                    updateFaq("Al", "content", index, e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div>
                            <Button variant="text" onClick={() => addFaq("Al")}>
                                Add
                            </Button>
                        </div>
                    </div>

                    <div className="w-full">
                        <InputLabel
                            label={
                                <>
                                    English <GB className="ml-1 inline-block h-4"/>
                                </>
                            }
                        />

                        <div>
                            {formik.values.faqEn?.map((faq, index) => {
                                return (
                                    <div key={index} className="mb-2 flex gap-2">
                                        <Button
                                            variant="outline"
                                            className="!h-auto w-6 border-red-400 !p-1 text-sm text-red-400"
                                            onClick={() => removeFaq("En", index)}
                                        >
                                            X
                                        </Button>
                                        <div className="w-full">
                                            <Input
                                                placeholder="Question"
                                                className="mb-2"
                                                value={faq.title}
                                                handleChange={(e) =>
                                                    updateFaq("En", "title", index, e.target.value)
                                                }
                                            />
                                            <Input
                                                placeholder="Answer"
                                                value={faq.content}
                                                handleChange={(e) =>
                                                    updateFaq("En", "content", index, e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div>
                            <Button variant="text" onClick={() => addFaq("En")}>
                                Add
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>

            <Card
                title={<SubTitle className="!m-0 !text-left">Availability</SubTitle>}
            >
                {/* OPEN HOURS */}
                <table className="w-full table-auto">
                    <thead>
                    <tr>
                        <td></td>
                        <td className="pb-4">Open</td>
                        <td>Close</td>
                    </tr>
                    </thead>

                    <thead>
                    {/* MONDAY */}
                    <tr>
                        <th className="min-w-[120px]">monday</th>
                        <td>
                            <TimePicker
                                id="openHours"
                                className="TimePicker inline-block h-10 w-full rounded-sm border border-gray-400 px-2"
                                onChange={(time) =>
                                    handleChangeTime(time, "openHours.monday.open")
                                }
                                value={formik.values.openHours.monday.open}
                                disableClock
                                hourPlaceholder="hh"
                                minutePlaceholder="mm"
                            />
                        </td>
                        <td>
                            <TimePicker
                                id="openHours"
                                className="TimePicker inline-block h-10 w-full rounded-sm border border-gray-400 px-2"
                                onChange={(time) =>
                                    handleChangeTime(time, "openHours.monday.close")
                                }
                                value={formik.values.openHours.monday.close}
                                disableClock
                                hourPlaceholder="hh"
                                minutePlaceholder="mm"
                            />
                        </td>
                    </tr>

                    {/* TUESDAY */}
                    <tr>
                        <th className="min-w-[120px]">tuesday</th>
                        <td>
                            <TimePicker
                                id="openHours"
                                className="TimePicker inline-block h-10 w-full rounded-sm border border-gray-400 px-2"
                                onChange={(time) =>
                                    handleChangeTime(time, "openHours.tuesday.open")
                                }
                                value={formik.values.openHours.tuesday.open}
                                disableClock
                                hourPlaceholder="hh"
                                minutePlaceholder="mm"
                            />
                        </td>
                        <td>
                            <TimePicker
                                id="openHours"
                                className="TimePicker inline-block h-10 w-full rounded-sm border border-gray-400 px-2"
                                onChange={(time) =>
                                    handleChangeTime(time, "openHours.tuesday.close")
                                }
                                value={formik.values.openHours.tuesday.close}
                                disableClock
                                hourPlaceholder="hh"
                                minutePlaceholder="mm"
                            />
                        </td>
                    </tr>

                    {/* WEDNESDAY */}
                    <tr>
                        <th className="min-w-[120px]">wednesday</th>
                        <td>
                            <TimePicker
                                id="openHours"
                                className="TimePicker inline-block h-10 w-full rounded-sm border border-gray-400 px-2"
                                onChange={(time) =>
                                    handleChangeTime(time, "openHours.wednesday.open")
                                }
                                value={formik.values.openHours.wednesday.open}
                                disableClock
                                hourPlaceholder="hh"
                                minutePlaceholder="mm"
                            />
                        </td>
                        <td>
                            <TimePicker
                                id="openHours"
                                className="TimePicker inline-block h-10 w-full rounded-sm border border-gray-400 px-2"
                                onChange={(time) =>
                                    handleChangeTime(time, "openHours.wednesday.close")
                                }
                                value={formik.values.openHours.wednesday.close}
                                disableClock
                                hourPlaceholder="hh"
                                minutePlaceholder="mm"
                            />
                        </td>
                    </tr>

                    {/* THURSDAY */}
                    <tr>
                        <th className="min-w-[120px]">thursday</th>
                        <td>
                            <TimePicker
                                id="openHours"
                                className="TimePicker inline-block h-10 w-full rounded-sm border border-gray-400 px-2"
                                onChange={(time) =>
                                    handleChangeTime(time, "openHours.thursday.open")
                                }
                                value={formik.values.openHours.thursday.open}
                                disableClock
                                hourPlaceholder="hh"
                                minutePlaceholder="mm"
                            />
                        </td>
                        <td>
                            <TimePicker
                                id="openHours"
                                className="TimePicker inline-block h-10 w-full rounded-sm border border-gray-400 px-2"
                                onChange={(time) =>
                                    handleChangeTime(time, "openHours.thursday.close")
                                }
                                value={formik.values.openHours.thursday.close}
                                disableClock
                                hourPlaceholder="hh"
                                minutePlaceholder="mm"
                            />
                        </td>
                    </tr>

                    {/* FRIDAY */}
                    <tr>
                        <th className="min-w-[120px]">friday</th>
                        <td>
                            <TimePicker
                                id="openHours"
                                className="TimePicker inline-block h-10 w-full rounded-sm border border-gray-400 px-2"
                                onChange={(time) =>
                                    handleChangeTime(time, "openHours.friday.open")
                                }
                                value={formik.values.openHours.friday.open}
                                disableClock
                                hourPlaceholder="hh"
                                minutePlaceholder="mm"
                            />
                        </td>
                        <td>
                            <TimePicker
                                id="openHours"
                                className="TimePicker inline-block h-10 w-full rounded-sm border border-gray-400 px-2"
                                onChange={(time) =>
                                    handleChangeTime(time, "openHours.friday.close")
                                }
                                value={formik.values.openHours.friday.close}
                                disableClock
                                hourPlaceholder="hh"
                                minutePlaceholder="mm"
                            />
                        </td>
                    </tr>

                    {/* SATURDAY */}
                    <tr>
                        <th className="min-w-[120px]">saturday</th>
                        <td>
                            <TimePicker
                                id="openHours"
                                className="TimePicker inline-block h-10 w-full rounded-sm border border-gray-400 px-2"
                                onChange={(time) =>
                                    handleChangeTime(time, "openHours.saturday.open")
                                }
                                value={formik.values.openHours.saturday.open}
                                disableClock
                                hourPlaceholder="hh"
                                minutePlaceholder="mm"
                            />
                        </td>
                        <td>
                            <TimePicker
                                id="openHours"
                                className="TimePicker inline-block h-10 w-full rounded-sm border border-gray-400 px-2"
                                onChange={(time) =>
                                    handleChangeTime(time, "openHours.saturday.close")
                                }
                                value={formik.values.openHours.saturday.close}
                                disableClock
                                hourPlaceholder="hh"
                                minutePlaceholder="mm"
                            />
                        </td>
                    </tr>

                    {/* SUNDAY */}
                    <tr>
                        <th className="w-[150px]">sunday</th>
                        <td>
                            <TimePicker
                                id="openHours"
                                className="TimePicker inline-block h-10 w-full rounded-sm border border-gray-400 px-2"
                                onChange={(time) =>
                                    handleChangeTime(time, "openHours.sunday.open")
                                }
                                value={formik.values.openHours.sunday.open}
                                disableClock
                                hourPlaceholder="hh"
                                minutePlaceholder="mm"
                            />
                        </td>
                        <td>
                            <TimePicker
                                id="openHours"
                                className="TimePicker inline-block h-10 w-full rounded-sm border border-gray-400 px-2"
                                onChange={(time) =>
                                    handleChangeTime(time, "openHours.sunday.close")
                                }
                                value={formik.values.openHours.sunday.close}
                                disableClock
                                hourPlaceholder="hh"
                                minutePlaceholder="mm"
                            />
                        </td>
                    </tr>
                    </thead>
                </table>
            </Card>

            <div className="flex items-center justify-end gap-2">
                <Button variant="outline">Clear</Button>
                <Button onClick={formik.handleSubmit} disabled={isSubmitting}>Submit</Button>
            </div>
        </Card>
    );
};

export default AccountCardForm;
