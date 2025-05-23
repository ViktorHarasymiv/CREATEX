import { useRef } from "react";
import html2pdf from "html2pdf.js";

import "./Order.css";

import { useSelector } from "react-redux";

import Logo from "../../Header/MiddleTile/icons/logo.png";

const PdfGenerator = () => {
  const contentRef = useRef();

  // DATA
  const fakture = useSelector((state) => state.order.fakture);

  console.log(fakture);

  const generatePDF = () => {
    html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        fontFamily: "Courier New",
        filename: "Fakture.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { dpi: 300, letterRendering: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(document.getElementById("pdf-content"))
      .save();
  };

  const randomNumbers = Array.from({ length: 1 }, () =>
    Math.floor(1000 + Math.random() * 9000)
  );

  const currentDate = new Date();

  const formattedDate = `${currentDate.getDate()}.${
    currentDate.getMonth() + 1
  }.${currentDate.getFullYear()}`;

  const currentTime = new Date().toLocaleTimeString();

  return (
    <>
      <div className="container">
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
                    <th>Назва товару</th>
                    <th>Ціна (грн)</th>
                    <th>Кількість</th>
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
                          <td>{element.price}</td>
                          <td>{element.count}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
              {/* ShippingInfo */}
              {fakture.length > 0 &&
                fakture
                  .find((item) => Array.isArray(item.shippingInfo))
                  ?.shippingInfo.map((element, index) => (
                    <p key={index}>{element.firstName}</p>
                  ))}
              {/* Delivery */}
              {fakture.length > 0 &&
                fakture
                  .find((item) => Array.isArray(item.delivery))
                  ?.delivery.map((element, index) => (
                    <p key={index}>{element}</p>
                  ))}

              {/* Payment Method */}
              {fakture.length > 0 &&
                fakture
                  .find((item) => Array.isArray(item.payMethod))
                  ?.payMethod.map((element, index) => (
                    <p key={index}>{element}</p>
                  ))}
            </div>
          </div>
        </div>
      </div>
      <button onClick={generatePDF}>Завантажити PDF</button>
    </>
  );
};

export default PdfGenerator;
