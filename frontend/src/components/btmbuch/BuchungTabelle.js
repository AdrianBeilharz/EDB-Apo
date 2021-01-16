import React, { useState, useEffect } from "react";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Button, Row, Col } from "react-bootstrap";
import { Collapse, Checkbox } from "@material-ui/core";
import Moment from "react-moment";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import TableBody from "@material-ui/core/TableBody";
import NeueBuchungModal from "../../modals/NeueBuchungModal";
import UpdateBuchungModal from "../../modals/UpdateBuchungModal";
import DeleteModal from "../../modals/DeleteModal";
import PrintPdfModal from "../../modals/PrintPdfModal";
import TablePagination from "@material-ui/core/TablePagination";
import jsPDF from "jspdf";
import "jspdf-autotable";
import '../../App.scss';



function BuchungTabelle(props) {
  let { btm } = props;
  const { apoId } = useParams();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [listeUnfiltered, setUnfilteredListe] = useState(false);

  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [showNewBuchungModal, setShowNewBuchungModal] = useState(false);
  const [showUpdateBuchungModal, setShowUpdateBuchungModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPrintPdfModal, setShowPrintPdfModal] = useState(false);

  const [lieferanten, setLieferanten] = useState([]);
  const [aerzte, setAerzte] = useState([]);
  const [empfaenger, setEmpfaenger] = useState([]);
  const [selectedBuchung, setSelectedBuchung] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const loadLieferanten = () => {
    fetch(
      `http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/lieferant`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + window.sessionStorage.getItem("edbapo-jwt"),
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 403) {
          // props.history.push('/forbidden');
        } else if (response.status === 400) {
          // props.history.push('/badrequest');
        }
      })
      .then((data) => setLieferanten(data))
      .catch((err) => {
        //SHOW ERROR
        console.log(err);
      });
  };

  const loadAerzte = () => {
    fetch(
      `http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/arzt`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + window.sessionStorage.getItem("edbapo-jwt"),
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 403) {
          // props.history.push('/forbidden');
        } else if (response.status === 400) {
          // props.history.push('/badrequest');
        }
      })
      .then((data) => setAerzte(data))
      .catch((err) => {
        //SHOW ERROR
        console.log(err);
      });
  };

  const loadEmpfaenger = () => {
    fetch(
      `http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/empfaenger`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + window.sessionStorage.getItem("edbapo-jwt"),
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 403) {
          // props.history.push('/forbidden');
        } else if (response.status === 400) {
          // props.history.push('/badrequest');
        }
      })
      .then((data) => setEmpfaenger(data))
      .catch((err) => {
        //SHOW ERROR
        console.log(err);
      });
  };

  const deleteBtm = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/btmbuchung/${selectedBuchung.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer " + window.sessionStorage.getItem("edbapo-jwt"),
        },
      }
    ).catch((err) => {
      //SHOW ERROR
      console.log(err);
    });

    if (response && response.status === 200) {
      props.apothekeRefFunctions.updateBtmList();
      enqueueSnackbar("Buchung erfolgreich gelöscht", {
        variant: "success",
        autoHideDuration: 3000,
      });
    } else {
      //SHOW ERROR
      console.log(response);
    }
  };

  const update = (buchung) => {
    setSelectedBuchung(buchung);
    setShowUpdateBuchungModal(true);
  };

  const del = (buchung) => {
    setSelectedBuchung(buchung);
    setShowDeleteModal(true);
  };

  const renderEditButtons = (buchung) => {
    return (
      <Row style={{ display: "block" }}>
        <Button onClick={() => update(buchung)} style={{ marginLeft: "0.5em" }}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button onClick={() => del(buchung)} style={{ marginLeft: "0.5em" }}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </Row>
    );
  };

  const renderPruefButton = (buchung) => {
    return (
      <Row>
        <Checkbox
          checked={buchung.pruefdatum}
          onChange={(event) => sendUpdateRequest(buchung)}
          style={{ marginLeft: "0.5em" }}
        ></Checkbox>
      </Row>
    );
  };

  const sendUpdateRequest = async (buchung) => {
    let geprueft = buchung.pruefdatum == null;
    const response = await fetch(
      `http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/btmbuchung/${buchung.id}?setGeprueft=${geprueft}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + window.sessionStorage.getItem("edbapo-jwt"),
          body: JSON.stringify(buchung),
        },
      }
    ).catch((err) => {
      //SHOW ERROR
      console.log(err);
    });

    if (response && response.status === 200) {
      enqueueSnackbar("Buchung erfolgreich aktualisiert", {
        variant: "success",
        autoHideDuration: 3000,
      });
      props.apothekeRefFunctions.updateBtmList();
    } else {
      //SHOW ERROR
      console.log(response);
    }
  };

  const exportPdf = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    const title = [props.btm.btm.name];
    const headers = [
      [
        "Datum",
        "Lieferant/Patient",
        "Arztpraxis",
        "Zugang",
        "Abgang",
        "Rp.Nr./L.Nr.",
        "Prüfdatum",
        "Prüfer Kürzel",
      ],
    ];

    const moment = require("moment");

    let filteredData;

    if (!listeUnfiltered) {
      filteredData = btm.buchungen.filter( (d) => d.datum >= moment(startDate).format("YYYY-MM-DD") && d.datum <= moment(endDate).format("YYYY-MM-DD"));
    }else{
      filteredData = btm.buchungen;
    }  
    const data = filteredData.map((buchung) => [
      moment(buchung.datum).format("DD.MM.YYYY"),
      buchung.typ === "ZUGANG"
        ? buchung.lieferant.name + "\n" + buchung.lieferant.anschrift.strasse + " " + buchung.lieferant.anschrift.nummer + ",\n" + buchung.lieferant.anschrift.ort + " " +
          buchung.lieferant.anschrift.plz
        : buchung.empfaenger.vorname + " " +
          buchung.empfaenger.name + "\n" +
          buchung.empfaenger.anschrift.strasse + " " +
          buchung.empfaenger.anschrift.nummer + ",\n" +
          buchung.empfaenger.anschrift.ort + ",\n" +
          buchung.empfaenger.anschrift.plz, 
        buchung.typ === "ABGANG"
        ? buchung.arzt.name + "\n" +
          buchung.arzt.anschrift.strasse + " " +
          buchung.arzt.anschrift.nummer + ",\n" +
          buchung.arzt.anschrift.ort + ",\n" +
          buchung.arzt.anschrift.plz : "",
      buchung.typ === "ZUGANG" ? buchung.menge : "",
      buchung.typ === "ZUGANG" ? "" : buchung.menge,
      buchung.typ === "ZUGANG" ? buchung.anforderungsschein : buchung.rezept,
      buchung.pruefdatum ? moment(buchung.pruefdatum).format("DD.MM.YYYY") : "",
      buchung.pruefer ? buchung.pruefer.vorname.charAt(0) + " " +
          buchung.pruefer.name.charAt(0) : "",
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("BtmListe.pdf");
    enqueueSnackbar('PDF gespeichert', { variant: 'success', autoHideDuration: 3000 });
  };

  useEffect(loadLieferanten, [apoId]);
  useEffect(loadAerzte, [apoId]);
  useEffect(loadEmpfaenger, [apoId]);
 
  return (
    <React.Fragment>
      <NeueBuchungModal
        {...props}
        lieferanten={lieferanten}
        aerzte={aerzte}
        empfaenger={empfaenger}
        buchung={selectedBuchung}
        show={showNewBuchungModal}
        onHide={() => setShowNewBuchungModal(false)}
      />
      <UpdateBuchungModal
        {...props}
        lieferanten={lieferanten}
        aerzte={aerzte}
        empfaenger={empfaenger}
        buchung={selectedBuchung}
        show={showUpdateBuchungModal}
        onHide={() => setShowUpdateBuchungModal(false)}
      />
      <DeleteModal
        {...props}
        headertext={"Betäubungsmittel-Buchung löschen"}
        maintext={"Möchtest du diese Buchung wirklich löschen?"}
        onSubmit={deleteBtm}
        subtext={"Dieser Vorgang kann nicht rückgängig gemacht werden"}
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      />
      <PrintPdfModal
        {...props}
        show={showPrintPdfModal}
        onHide={() => setShowPrintPdfModal(false)}
        start={(value) => setStartDate(value)}
        ende={(value) => setEndDate(value)}
        onSubmit={exportPdf}
        unFilter={(value) => setUnfilteredListe(value)}
        checked={listeUnfiltered}
      />

      <div style={{ marginBottom: "2em" }}>
        <Row
          onClick={() => setOpen(!open)}
          className="noselect btm-table-header-name"
          style={{backgroundColor: open ? '#0e864e': '', color: open ? '#FFFFFF': ''}}
        >
          <Col sm={3}>
            <p>
              {btm.btm.name} ({btm.btm.menge})
            </p>
          </Col>
          <Col setEmpfaenger={{span: 2, offset: 7}}>
            <div style={{ display: "inline" }}>
              <Button
                style={{ marginRight: "1em" }}
                onClick={(event) => {
                  event.stopPropagation();
                  setShowPrintPdfModal(true);
                }}
              >
                PDF
              </Button>
              <Button
                onClick={(event) => {
                  event.stopPropagation();
                  setShowNewBuchungModal(true);
                }}
              >
                Neue Buchung
                <FontAwesomeIcon
                  style={{ marginLeft: "0.4em" }}
                  icon={faPlus}
                />
              </Button>
            </div>
          </Col>
        </Row>
        <Collapse in={open}>
          <Table striped bordered hover id="btm-table">
            <thead>
              <tr>
                <th>Datum</th>
                <th>Lieferant / Patient</th>
                <th>Arztpraxis</th>
                <th>Zugang</th>
                <th>Abgang</th>
                <th>Rezept Nr. / Lieferschein Nr.</th>
                <th>Prüfdatum</th>
                <th>Prüfer Kürzel</th>
                {props.aktiveRolle.toLowerCase() === "admin" ||
                props.aktiveRolle.toLowerCase() === "pruefer" ? (
                  <th>Geprüft</th>
                ) : null}
                {props.aktiveRolle.toLowerCase() === "admin" ? <th></th> : null}
              </tr>
            </thead>
            <TableBody>
              {btm.buchungen
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((buchung) => (
                  <tr key={buchung.id}>
                    <td>
                      {" "}
                      <Moment format="DD.MM.YYYY">{buchung.datum}</Moment>{" "}
                    </td>
                    <td>
                      {buchung.typ === "ZUGANG"
                        ? buchung.lieferant.name
                        : buchung.empfaenger.vorname +
                          " " +
                          buchung.empfaenger.name}
                    </td>
                    <td>{buchung.typ === "ABGANG" ? buchung.arzt.name : ""}</td>
                    <td>{buchung.typ === "ZUGANG" ? buchung.menge : ""}</td>
                    <td>{buchung.typ === "ZUGANG" ? "" : buchung.menge}</td>
                    <td>
                      {buchung.typ === "ZUGANG"
                        ? buchung.anforderungsschein
                        : buchung.rezept}
                    </td>
                    <td>
                      {buchung.pruefdatum ? (
                        <Moment format="DD.MM.YYYY">
                          {buchung.pruefdatum}
                        </Moment>
                      ) : (
                        ""
                      )}
                    </td>
                    <td>
                      {buchung.pruefer
                        ? buchung.pruefer.vorname + " " + buchung.pruefer.name
                        : ""}
                    </td>

                    {props.aktiveRolle.toLowerCase() === "admin" ||
                    props.aktiveRolle.toLowerCase() === "pruefer" ? (
                      <th>{renderPruefButton(buchung)}</th>
                    ) : null}

                    {props.aktiveRolle.toLowerCase() === "admin" ? (
                      <td
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        {renderEditButtons(buchung)}
                      </td>
                    ) : null}
                  </tr>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={btm.buchungen.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Collapse>
      </div>
    </React.Fragment>
  );
}

export default BuchungTabelle;
