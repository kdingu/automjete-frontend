import React from 'react';
import MotorsImage from "@/components/motors-image";
import Link from "next/link";
import Button from "@/components/button";
import Title from "@/components/title";
import Tag from "@/components/tag";
import SvgIcon from "@/components/svg-icon";
import {GoogleMapsEmbed} from "@next/third-parties/google";
import TextInput from "@/components/input/text-input";
import Select from "@/components/select";
import Input from "@/components/input";
import Checkbox from "@/components/checkbox";
import Accordion from "@/components/accordion";
import AccordionItem from "@/components/accordion/accordion-item";
import {useTranslation} from "next-i18next";

const weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const DealerProfilePage = ({dealer, contactForm, isSelfAccount}) => {
    const {t, i18n: {language = "al"}} = useTranslation("profile");
    const locale = `${language[0].toUpperCase()}${language[1]}`;

    const contactMethodOptions = [
        {value: "", label: "Select a contact method"},
        {value: "telephone", label: "Telephone"},
        {value: "email", label: "Email"},
    ];

    const contactTimeOptions = [
        {value: "", label: "Select a time"},
        {value: "09:00-12:00", label: "09:00-12:00"},
        {value: "12:00-15:00", label: "12:00-15:00"},
        {value: "15:00-18:00", label: "15:00-18:00"},
        {value: "anytime", label: "Anytime"},
    ];

    const getOpenHours = (day) => {
        if (!dealer.openHours[day]?.open && !dealer.openHours[day]?.close) return t("closed");

        return `${dealer.openHours[day]?.open} - ${dealer.openHours[day]?.close}`;
    };

    const getIsToday = (day) => {
        return weekDays[new Date().getDay() - 1] === day;
    };

    const isCurrentTimeBetween = (startHourStr, endHourStr) => {
        // Helper function to convert time string to minutes since midnight
        function timeToMinutes(timeStr) {
            const [hours, minutes] = timeStr?.split(':')?.map(Number);
            return hours * 60 + minutes;
        }

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        const startMinutes = timeToMinutes(startHourStr);
        const endMinutes = timeToMinutes(endHourStr);

        // Handle cases where startHour is greater than endHour (e.g., 22:00 to 06:00)
        if (startMinutes > endMinutes) {
            return currentMinutes >= startMinutes || currentMinutes < endMinutes;
        } else {
            return currentMinutes >= startMinutes && currentMinutes < endMinutes;
        }
    };

    const getIsOpenNow = () => {
        const today = new Date();
        const day = weekDays[today.getDay() - 1];
        const openHours = getOpenHours(day);
        const inWorkingHours = isCurrentTimeBetween(dealer.openHours[day]?.open, dealer.openHours[day]?.close);

        return openHours !== 'closed' && inWorkingHours;
    };

    return (
        <div>
            {/* Widget 1 */}
            <div className="border flex flex-col lg:flex-row min-h-[580px]">
                <div className="w-12/12 lg:w-8/12 bg-teal-50 relative min-h-[400px]">
                    <MotorsImage fill className="object-contain" src={dealer.banner?.externalUrl}/>
                </div>

                <div className="w-12/12 lg:w-4/12 p-4 flex flex-col">
                    <h1 className="text-2xl">{dealer.name}</h1>

                    <hr className="my-5"/>

                    <div className="flex-1 mb-5">
                        Perks todo
                    </div>

                    <div>
                        {isSelfAccount && (
                            <Link href="/account/personal-details">
                                <Button className="w-full mb-3">Edit my details</Button>
                            </Link>
                        )}
                        <Link href={`/profiles/${dealer.id}/vehicles`}>
                            <Button className="w-full mb-3">View {dealer.vehiclesCount} cars</Button>
                        </Link>
                        <Link href="#contact">
                            <Button variant="outline" className="w-full">Contact</Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Widget 2 */}
            <div className="bg-teal-100 p-4 lg:my-16 lg:px-32 lg:pt-8 lg:pb-12">
                <Title className="!text-left mb-6">Get in touch</Title>

                <div className="grid gap-10 lg:grid-cols-3">
                    {dealer.address ? (
                        <div>
                            <h3 className="text-xl text-semibold">Address</h3>
                            <p>{dealer.address.address_line_1}</p>
                            <p>{dealer.address.address_line_2}</p>
                            <p>{dealer.address.city.name}</p>
                            <p>{dealer.address.country.name}</p>
                            <p className="uppercase">{dealer.address.zip_code}</p>

                            <Button variant="text" className="mt-4 block">X kilometers away from you (todo)</Button>
                            <Button variant="outline" className="mt-8 block">Get directions (todo)</Button>
                        </div>
                    ) : "Address not set"}

                    <div>
                        <h3 className="text-xl text-semibold">Website</h3>
                        <Link className="text-teal" href={`https://${dealer.website}`}
                              target="_blank">{dealer.website}</Link>

                        <h3 className="mt-5 text-xl text-semibold">Phone number</h3>
                        <Link className="text-teal" href={`tel:${dealer.phone}`}>{dealer.phone}</Link>
                    </div>

                    <div>
                        <div className="flex justify-between">
                            <h3 className="text-xl text-semibold">Opening hours</h3>
                            {getIsOpenNow() &&
                                <Tag variant="success" className="text-white !text-sm bg-green-600">Open now</Tag>}
                        </div>

                        <ul className="mt-4">
                            {weekDays.map(day => {
                                const isToday = getIsToday(day);

                                return (
                                    <li key={day}
                                        className={`flex justify-between mb-2 ${isToday ? "underline font-bold" : ""}`}>
                                        <span>{t(day)}</span>
                                        <span>{getOpenHours(day)}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="p-4 lg:p-0 lg:px-32">
                <div>
                    {/* Widget 3 */}
                    <Title className="!text-left mb-6">About us</Title>
                    <MotorsImage src={dealer.logo?.externalUrl} width={100} height={100}/>
                    <p className="mt-8">{dealer[`description${locale}`]}</p>
                </div>

                <hr className="mt-10 mb-12 lg:mt-32 lg:mb-20"/>

                {/* Widget 4 */}
                {/*<div>*/}
                {/*    <Title className="!text-left mb-6">Why buy from us?</Title>*/}
                {/*    <div>Todo carousel with mini cards</div>*/}
                {/*</div>*/}

                {/*<hr className="mt-10 mb-12 lg:mt-32 lg:mb-20"/>*/}

                {/* Widget 5 */}
                {/*<div>*/}
                {/*    <Title className="!text-left mb-6">Featured stock</Title>*/}
                {/*    <div>Todo carousel with cards</div>*/}
                {/*    <div className="mt-4 text-center">*/}
                {/*        <Link href="#">*/}
                {/*            <Button>Vew more <SvgIcon name="arrow-right"/></Button>*/}
                {/*        </Link>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<hr className="mt-10 mb-12 lg:mt-32 lg:mb-20"/>*/}

                {/* Widget 6 */}
                {dealer.address && (
                    <div>
                        <Title className="!text-left mb-6">Location</Title>
                        <div className="flex gap-10">
                            <div className="w-5/12">
                                <h3 className="text-xl text-semibold">Address</h3>
                                <p>{dealer.address.address_line_1}</p>
                                <p>{dealer.address.address_line_2}</p>
                                <p>{dealer.address.city.name}</p>
                                <p>{dealer.address.country.name}</p>
                                <p className="uppercase">{dealer.address.zip_code}</p>
                                <Button variant="outline" className="mt-8 block">Get directions (todo)</Button>
                            </div>

                            <div className="w-7/12">
                                <GoogleMapsEmbed
                                    language="sq"
                                    apiKey="AIzaSyA_rXmoJLHhRt07i6cpWIGxv2237-WPmX0"
                                    width="100%"
                                    height={400}
                                    mode="place"
                                    q={`${dealer.address.address_line_1},${dealer.address.address_line_2},${dealer.address.city.name},${dealer.address.country.name},${dealer.address.zip_code}`}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Widget 7 */}
            <div className="bg-teal-100 p-4 lg:my-16 lg:px-32 lg:pt-8 lg:pb-12" id="contact">
                <Title className="!text-left mb-8">Contact us</Title>

                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="lg:w-5/12">
                        <p className="mb-4">Need to reach us quickly?</p>
                        <p className="mb-4">Call or live chat with us to get a quick response to your query.</p>
                        <Link href={`tel:${dealer.phone}`}>
                            <Button variant="outline" className="w-full mt-8 block">Call {dealer.phone}</Button>
                        </Link>
                    </div>

                    <form className="lg:w-7/12" onSubmit={contactForm.handleSubmit}>
                        <p className="mb-8">Send a message</p>
                        <p className="mb-8">Send us your message and we will be in touch shortly.</p>

                        <div className="flex flex-col lg:flex-row gap-3 my-4">
                            <TextInput label="First Name" placeholder="e.g. 069 69 69 699" name="firstName"
                                       value={contactForm.values.firstName} onChange={contactForm.handleChange}/>
                            <TextInput label="Last Name" placeholder="e.g. Fisteku" name="lastName"
                                       value={contactForm.values.lastName} onChange={contactForm.handleChange}/>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-3 my-4">
                            <TextInput label="Phone number" placeholder="e.g. 069 69 69 699" name="phoneNumber"
                                       value={contactForm.values.phoneNumber} onChange={contactForm.handleChange}/>
                            <TextInput label="Email" placeholder="e.g. Fisteku" name="email"
                                       value={contactForm.values.email}
                                       onChange={contactForm.handleChange}/>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-3 my-4">
                            <Select data={contactMethodOptions}
                                    label="Prefered contact method"
                                    placeholder="e.g. 069 69 69 699" name="contactMethod"
                                    value={contactForm.values.contactMethod}
                                    onChange={contactForm.handleChange}/>
                            <Select data={contactTimeOptions}
                                    label="Prefered contact time" placeholder="e.g. 069 69 69 699"
                                    name="contactTime"
                                    value={contactForm.values.contactTime}
                                    onChange={contactForm.handleChange}/>
                        </div>

                        <Input type="textarea" label="Your message (optional)" placeholder="123" name="message"
                               value={contactForm.values.message} onChange={contactForm.handleChange}/>

                        <div className="mt-4">
                            <Checkbox data={{label: "Register to receive special promos"}}
                                      active={contactForm.values.specialPromos}
                                      onClick={() => contactForm.setFieldValue("specialPromos", !contactForm.values.specialPromos)}/>
                        </div>

                        <p className="mt-4">Auto Trader will use your details in accordance with our privacy policy.
                            In
                            addition,
                            by hitting &quot;Send your enquiry&quot;, you&apos;re happy for us to pass your details
                            to the seller
                            which will be used by the seller in accordance with their privacy policy. Please check
                            the
                            seller&apos;s
                            website or contact them separately for details.</p>

                        <div
                            className="flex flex-col lg:flex-row gap-4 mt-4 lg:gap-0 lg:mt-0 justify-between items-center">
                            <p>disclaimer recaptcha</p>
                            <Button onClick={contactForm.submitForm}>Send your enquiry</Button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="p-4 lg:px-32">
                {/* Widget 9 */}
                <div className="max-w-[500px] m-auto mt-10">
                    <Title className="mb-6">Frequently asked questions</Title>
                    <Accordion>
                        {dealer[`faq${locale}`].faqs.map(faq => {
                            return (
                                <AccordionItem key={faq.title} title={faq.title}>
                                    <div className="shadow mx-1 mb-4 p-2">{faq.content}</div>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default DealerProfilePage;
