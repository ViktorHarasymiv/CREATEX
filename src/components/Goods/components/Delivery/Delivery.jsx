import { useState } from "react";

import "./Delivery.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineMinus } from "react-icons/hi";

import { FaFacebookF } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { TfiInstagram } from "react-icons/tfi";

import VISA from "../../../../../public/icons/visa.png";
import MASTERCARD from "../../../../../public/icons/master-card.png";
import PAYPAL from "../../../../../public/icons/pay-pal.png";

function Delivery() {
  const deliveryOptions = [
    { type: "Standard delivery", duration: "1-4 business days", cost: "$4.50" },
    { type: "Express delivery", duration: "1 business day", cost: "$10.00" },
    { type: "Pick up in store", duration: "1-3 business days", cost: "Free" },
  ];
  const payment = [VISA, MASTERCARD, PAYPAL];

  const [expanded, setExpanded] = useState(true);
  const [expandedTwo, setExpandedTwo] = useState(false);

  const handleClick = () => {
    setExpanded((prev) => !prev);
  };

  const handleClickTwo = () => {
    setExpandedTwo((prev) => !prev);
  };

  return (
    <div className="accordion_tile">
      {/* ACCORDION */}
      <Accordion defaultExpanded style={{ boxShadow: "none" }}>
        <AccordionSummary
          onClick={handleClick}
          expandIcon={expanded ? <HiOutlineMinus /> : <HiOutlinePlus />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Delivery</Typography>
        </AccordionSummary>
        <p className="accordion_sub--title">
          Free standard shipping on orders <b>over $35</b> before tax, plus free
          returns.
        </p>
        <AccordionDetails>
          <table border="1" style={{ width: "100%", textAlign: "left" }}>
            <thead>
              <tr className="accordion_delivery--title_tile">
                <th className="accordion_delivery--title">TYPE</th>
                <th className="accordion_delivery--title">HOW LONG</th>
                <th className="accordion_delivery--title">HOW MUCH</th>
              </tr>
            </thead>
            <tbody>
              {deliveryOptions.map((option, index) => (
                <tr className="accordion_delivery--option_tile" key={index}>
                  <td className="accordion_delivery--option">{option.type}</td>
                  <td className="accordion_delivery--option">
                    {option.duration}
                  </td>
                  <td className="accordion_delivery--option">{option.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </AccordionDetails>
      </Accordion>
      {/* SECOND */}
      <Accordion style={{ boxShadow: "none" }}>
        <AccordionSummary
          onClick={handleClickTwo}
          expandIcon={expandedTwo ? <HiOutlineMinus /> : <HiOutlinePlus />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Return</Typography>
        </AccordionSummary>
        <p className="accordion_sub--title">
          You have <b>60 days</b> to return the item(s) using any of the
          following methods:
        </p>
        <AccordionDetails>
          <ul className="accordion_return--list">
            <li>Free store return</li>
            <li>Free returns via USPS Dropoff Service</li>
          </ul>
        </AccordionDetails>
      </Accordion>

      {/* SHARE */}
      <div className="share_tile">
        <span className="share_title">Share:</span>
        <ul className="share_list">
          <li>
            <a href="#" target="_blank">
              <FaFacebookF className="share_ico" />
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              <BsTwitterX className="share_ico" />
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              <TfiInstagram className="share_ico" />
            </a>
          </li>
        </ul>
      </div>
      {/* PAYMANT */}
      <div className="paymant_tile">
        <ul className="paymant_list">
          {payment.map((image, index) => {
            return (
              <li key={index}>
                <img src={image} alt="" />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Delivery;
