import React from "react";
import Container from "@/components/container";
import SvgIcon from "@/components/svg-icon";
import Link from "next/link";
import Button from "@/components/button";
import Accordion from "@/components/accordion";
import AccordionItem from "@/components/accordion/accordion-item";
import FooterLinksList from "@/components/footer/footer-links-list";

const Footer = (props) => {
  const handleOpenCookiesManager = () => {
    // todo
    console.log('handleOpenCookiesManager todo...');
  };

  const col1Items = [
    {label: "Lorem ipsum", link: "#11"},
    {label: "Lorem ipsum", link: "#12"},
    {label: "Lorem ipsum", link: "#13"},
    {label: "Lorem ipsum", link: "#14"},
    {label: "Lorem ipsum", link: "#15"},
    {label: "Lorem ipsum", link: "#16"},
    {label: "Lorem ipsum", link: "#17"},
  ];

  const col2_1Items = [
    {label: "Lorem ipsum", link: "#21"},
    {label: "Lorem ipsum", link: "#22"},
    {label: "Lorem ipsum", link: "#23"},
    {label: "Lorem ipsum", link: "#24"},
    {label: "Lorem ipsum", link: "#25"},
    {label: "Lorem ipsum", link: "#26"},
    {label: "Lorem ipsum", link: "#27"},
  ];
  const col2_2Items = [
    {label: "Lorem ipsum", link: "#31"},
    {label: "Lorem ipsum", link: "#32"},
    {label: "Lorem ipsum", link: "#33"},
    {label: "Lorem ipsum", link: "#34"},
    {label: "Lorem ipsum", link: "#35"},
    {label: "Lorem ipsum", link: "#36"},
    {label: "Lorem ipsum", link: "#37"},
  ];
  const col2_3Items = [
    {label: "Lorem ipsum", link: "#41"},
    {label: "Lorem ipsum", link: "#42"},
    {label: "Lorem ipsum", link: "#43"},
    {label: "Lorem ipsum", link: "#44"},
    {label: "Lorem ipsum", link: "#45"},
    {label: "Lorem ipsum", link: "#46"},
    {label: "Lorem ipsum", link: "#47"},
  ];
  const col2_4Items = [
    {label: "Lorem ipsum", link: "#51"},
    {label: "Lorem ipsum", link: "#52"},
    {label: "Lorem ipsum", link: "#53"},
    {label: "Lorem ipsum", link: "#54"},
    {label: "Lorem ipsum", link: "#55"},
    {label: "Lorem ipsum", link: "#56"},
    {label: "Lorem ipsum", link: "#57"},
  ];

  return (
    <footer className="Footer border-t border-gray-100 py-10">
      <Container>
        <Link href="/" className="inline-block">
          <SvgIcon name="logo" />
        </Link>

        <div className="grid grid-cols-12 mt-10 gap-10">
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <FooterLinksList items={col1Items} />

            <ul>
              <li>
                <Button variant="text" className="mt-4 text-xs text-gray-700 hover:text-gray-700" onClick={handleOpenCookiesManager}>
                  Cookie manager
                </Button>
              </li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-8 lg:col-span-5 lg:pl-10 lg:w-10/12">
            <Accordion>
              <AccordionItem title="Item 1">
                <FooterLinksList className="pl-11 pb-2" items={col2_1Items} />
              </AccordionItem>
              <AccordionItem title="Item 2">
                <FooterLinksList className="pl-11 pb-2" items={col2_2Items} />
              </AccordionItem>
              <AccordionItem title="Item 3">
                <FooterLinksList className="pl-11 pb-2" items={col2_3Items} />
              </AccordionItem>
              <AccordionItem title="Item 4">
                <FooterLinksList className="pl-11 pb-2" items={col2_4Items} />
              </AccordionItem>
            </Accordion>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <p className="text-sm mb-2">Help us improve our website</p>
            <Button variant="outline" className="mb-4">Send feedback</Button>

            <div className="flex gap-2 mb-2">
              <Link href="instagram" target="_blank" className="group inline-block">
                <SvgIcon name="instagram" className="transition group-hover:text-teal-500" />
              </Link>
              <Link href="facebook" target="_blank" className="group inline-block">
                <SvgIcon name="facebook" className="transition group-hover:text-teal-500" />
              </Link>
              <Link href="tiktok" target="_blank" className="group inline-block">
                <SvgIcon name="tiktok" className="transition group-hover:text-teal-500" />
              </Link>
            </div>

            <div>Mobile apps coming soon</div>

            <div className="text-xs text-gray-500 mt-4">
              <p>
                Copyright © Auto Trader Limited 2024.
              </p>

              <br/>

              <p>
                Auto Trader Limited is authorised and regulated by the Financial Conduct Authority in relation to
                consumer
                credit and insurance mediation activities. Our FCA firm reference number is 735711. Auto Trader Limited
                is
                a credit broker and not a lender. Representative finance examples are for illustrative purposes only.
                Finance is subject to status. Terms and conditions apply. Available to 18s and over. UK residents only.
                Auto Trader receives a fee from retailers advertising finance and may receive a commission from
                commercial
                partners for introducing customers to finance products. These fees and commissions do not influence the
                amount a customer pays.
              </p>

              <br/>

              <p>Registered office and headquarters</p>

              <br/>

              <p>4th Floor</p>
              <p>1 Tony Wilson Place</p>
              <p>Manchester</p>
              <p>M15 4FN</p>
              <p>United Kingdom</p>
              <p>Registered number: 03909628</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
