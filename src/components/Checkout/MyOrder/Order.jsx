import { useRef } from "react";
import html2pdf from "html2pdf.js";

import "./Order.css";

import { useSelector } from "react-redux";

import Logo from "../../Header/MiddleTile/icons/logo.png";
import Button from "../../Button/Button";
import { Link } from "react-router-dom";

const PdfGenerator = ({ valute }) => {
  const contentRef = useRef();

  // DATA
  const fakture = useSelector((state) => state.order.fakture);

  const VAT = 0.2;

  console.log(fakture);

  const generatePDF = () => {
    html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename: "Fakture.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { dpi: 300, letterRendering: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(document.getElementById("pdf-content"))
      .save();
  };

  const changeValute = (price) => {
    if (valute == "Dollar") {
      return price.toFixed(2);
    } else return (price * 0.876).toFixed(2);
  };

  const randomNumbers = Array.from({ length: 1 }, () =>
    Math.floor(1000 + Math.random() * 9000)
  );

  const currentDate = new Date();

  const formattedDate = `${currentDate.getDate()}.${
    currentDate.getMonth() + 1
  }.${currentDate.getFullYear()}`;

  const currentTime = new Date().toLocaleTimeString();

  const promValue = fakture
    .find((item) => Array.isArray(item.values))
    ?.values.map((element) => element[0]);

  return (
    <>
      <div className="container">
        <div className="actions_tile">
          <div className="actions_btn_tile">
            <Link to={"/checkout"} className="fakture_btn">
              Back to checkout
            </Link>

            {/* <Link className="fakture_btn">End session</Link> */}
          </div>

          <button onClick={generatePDF} className="fakture_btn">
            Download
          </button>
        </div>
        <div className="fakture_wrapper">
          <div id="pdf-content" className="pdf-content " ref={contentRef}>
            <div className="fakture_content">
              <div className="fakture_content--title">
                <b className="fakture_title">Order № {randomNumbers}</b>
                <img src={Logo} alt="CREATEX" />
              </div>
              <div className="fakture_content--data">
                Data: <span>{formattedDate}</span>
                <p style={{ marginLeft: "5px" }}>{currentTime}</p>
              </div>
              <div className="fakture_content--info">
                <div className="fakture_content--info_firm">
                  <div className="info_firm--title_tile">
                    <h2 className="info_firm--title">Seller</h2>
                    <div className="info_firm">
                      <span>CREATEX CO.</span>
                      <span>Example street</span>
                      <span>+44 123 456 789</span>
                      <span>Poland, Warszaw (00-000)</span>
                    </div>
                  </div>
                  <div className="info_firm--title_tile second_info_tile">
                    <h2 className="info_firm--title">Buyer</h2>
                    {fakture.length > 0 &&
                      fakture
                        .find((item) => Array.isArray(item.shippingInfo))
                        ?.shippingInfo.map((element, index) => (
                          <div key={index} className="info_firm">
                            <span>
                              {element.firstName} {element.lastName}
                            </span>
                            <span> {element.address}</span>
                            <span> {element.phone}</span>

                            <span>
                              {element.country}, {element.city} ({element.code})
                            </span>
                          </div>
                        ))}
                  </div>
                </div>
              </div>
              {/* Items */}
              <table className="fakture_table">
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Product name</th>
                    <th>Parameters</th>

                    <th>
                      Price per product ({valute == "Dollar" ? "$" : "€"})
                    </th>
                    <th>Price brutto ({valute == "Dollar" ? "$" : "€"})</th>
                    <th>Price netto ({valute == "Dollar" ? "$" : "€"})</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody className="fakture_table--body">
                  {fakture.length > 0 &&
                    fakture
                      .find((item) => Array.isArray(item.items))
                      ?.items.map((element, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{element.title}</td>
                          <td>
                            <span>Color: {element.color}</span>
                            <br />
                            <span>Size: {element.size}</span>
                          </td>
                          <td>{changeValute(element.price)}</td>
                          <td>{changeValute(element.price * element.count)}</td>
                          <td>
                            {changeValute(
                              element.price * element.count -
                                element.price * element.count * VAT
                            )}
                          </td>
                          <td>{element.count}</td>
                        </tr>
                      ))}
                </tbody>
              </table>

              <div className="fakture_table--summary">
                <div className="fakture_details">
                  {/* Promo code */}
                  <p className="fakture_details-block">
                    <span>Promo code</span>
                    {fakture.length > 0
                      ? fakture
                          .find((item) => Array.isArray(item.promo))
                          ?.promo.map((element, index) => (
                            <span key={index}>{element}</span>
                          ))
                      : "-"}
                  </p>
                  {/* Sale value */}
                  <p className="fakture_details-block">
                    <span>Sale value</span>
                    {fakture.length > 0
                      ? fakture
                          .find((item) => Array.isArray(item.values))
                          ?.values.map((element, index) => (
                            <span key={index}>
                              {element[0] != null ? element[0] + "%" : "-"}
                            </span>
                          ))
                      : "-"}
                  </p>
                  {/* Sale sum */}
                  <p className="fakture_details-block">
                    <span>Sale sum</span>
                    <span>
                      {fakture.length > 0
                        ? fakture
                            .find((item) => Array.isArray(item.values))
                            ?.values.map((element, index) => (
                              <span key={index}>
                                {element[0] !== null
                                  ? changeValute(
                                      element[1] -
                                        element[1] * (1 - element[0] / 100)
                                    )
                                  : "-"}
                              </span>
                            ))
                        : "-"}
                    </span>
                  </p>
                  {/* Delivery */}
                  <p className="fakture_details-block">
                    <span>Delivery</span>
                    {fakture.length > 0 &&
                      fakture
                        .find((item) => Array.isArray(item.values))
                        ?.values.map((element, index) => (
                          <span key={index}>{element[2][1]}</span>
                        ))}
                  </p>
                </div>
                <div className="fakture_details secound_details_tile">
                  <p className="fakture_details-block">
                    <span>Tax</span>

                    <span>{VAT * 100}%</span>
                  </p>
                  <p className="fakture_details-block">
                    <span>Brutto</span>
                    <span>
                      {fakture.length > 0
                        ? fakture
                            .find((item) => Array.isArray(item.values))
                            ?.values.map((element, index) => (
                              <span key={index}>
                                {changeValute(+element[1])}
                                {valute == "Dollar" ? "$" : "€"}
                              </span>
                            ))
                        : "-"}
                    </span>
                  </p>
                  <p className="fakture_details-block">
                    <span>Netto</span>
                    {fakture.length > 0
                      ? fakture
                          .find((item) => Array.isArray(item.values))
                          ?.values.map((element, index) => (
                            <span key={index}>
                              {changeValute(element[1] - element[1] * VAT)}
                              {valute == "Dollar" ? "$" : "€"}
                            </span>
                          ))
                      : "-"}
                  </p>
                </div>
              </div>

              {/* Payment Method */}
              {fakture.length > 0 && (
                <>
                  {fakture
                    .find((item) => Array.isArray(item.payMethod))
                    ?.payMethod.map((element, index) => (
                      <span style={{ marginLeft: "30px" }} key={index}>
                        Pay method: {element}
                      </span>
                    ))}

                  {fakture
                    .find((item) => Array.isArray(item.values))
                    ?.values.map((element, index) => (
                      <span key={index}>
                        {element[2][1]} {changeValute(element[2][0])}
                        {valute === "Dollar" ? "$" : "€"}
                      </span>
                    ))}
                </>
              )}
              <div className="fakture_summary">
                {fakture.length > 0 &&
                  fakture
                    .find((item) => Array.isArray(item.values))
                    ?.values.map((element, index) => (
                      <h3 className="fakture_total_price" key={index}>
                        To be paid :
                        {changeValute(
                          element[1] * (1 - element[0] / 100) + element[2][0]
                        )}
                        {valute === "Dollar" ? "$" : "€"}
                      </h3>
                    ))}
              </div>
              <div className="fakture_signature">
                <div className="seller_signature signature">
                  <span>CREATEX CO.</span>
                  <span>_______________________________</span>
                  <p>Seller's signature</p>
                </div>
                <div className="buyer_signature signature">
                  <span style={{ opacity: "0" }}>...</span>
                  <span>_______________________________</span>
                  <p>Recipient's signature</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PdfGenerator;
