import React from "react";
import FooterLink from "@/components/footer/footer-links-list/footer-link";

const FooterLinksList = (props) => {
    const {items = [], className = ""} = props;

    return (
        <ul className={className}>
            {items.map((item) => {
                return (
                    <li key={item.link}>
                        <FooterLink {...item} />
                    </li>
                );
            })}
        </ul>
    );
};

export default FooterLinksList;
