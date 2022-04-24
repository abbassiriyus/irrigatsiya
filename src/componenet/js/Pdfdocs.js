import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { connect } from "react-redux";
import { saveTuitor } from "../config/tuitor";
import { uzLanguege } from "../redux/Actions/uzLanguege";
import { ruLanguege } from "../redux/Actions/ruLanguege";
import { enLanguege } from "../redux/Actions/enLanguege";
import { host1 } from "../config/host";
import pdflar from "./../css/pdfcss.module.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

function Pdfdocs(props) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [urls, setUrl] = useState([]);

  /*To Prevent right click on screen*/
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  const getCvdocs = (uz, en) => {
    saveTuitor(uz, en)
      .then((res) => {
        setUrl(res.data.biography);
      })
      .catch((res) => console.log(res.data.biography));
  };
  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  useEffect(() => {
    getCvdocs(props.uzLang, props.enLang);
  }, [props.uzLang, props.enLang]);
  // var yol = `${host1}${urls}`;
  // console.log(yol);

  var yol = `https://cors-anywhere.herokuapp.com/${host1}${urls}`;

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-lg-12 col-sm-12 d-flex justify-content-center">
            <div className="ril-image-current ril__image" id={pdflar.pd}>
              <Document file={yol} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>

              <div className="d-flex justify-content-center mb-5">
                <div>
                  <div className="pagec text-center">
                    <p>
                      Page {pageNumber || (numPages ? 1 : "--")} of{" "}
                      {numPages || "--"}
                    </p>
                  </div>
                  <div className="buttonc">
                    <button
                      type="button"
                      disabled={pageNumber <= 1}
                      onClick={previousPage}
                      className="Pre"
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        borderRadius: "5px",
                        fontSize: "18px",
                      }}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      disabled={pageNumber >= numPages}
                      onClick={nextPage}
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        borderRadius: "5px",
                        marginLeft: "12px",
                        fontSize: "18px",
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    uzLang: state.changeLang.uzLang,
    enLang: state.changeLang.enLang,
  };
};
export default connect(mapStateToProps, { uzLanguege, ruLanguege, enLanguege })(
  Pdfdocs
);
