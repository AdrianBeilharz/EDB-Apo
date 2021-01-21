import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";

function UpdateBuchungModal(props) {

	const [personal, setPersonal] = useState([]);
	const [buchung, setBuchung] = useState(props.buchung);

	const { apoId } = useParams();
	let { lieferanten, aerzte, empfaenger } = props;
	const { enqueueSnackbar } = useSnackbar();
	const moment = require("moment");

	const [tooltips, setTooltips] = useState({});

	const getPersonalData = () => {
		fetch(
			`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/benutzer`,
			{
				method: "GET",
				headers: {
					Authorization:
						"Bearer " + window.sessionStorage.getItem("edbapo-jwt"),
				},
			}
		)
			.then((res) => {
				if (res.status === 200) {
					return res.json();
				} else if (res.status === 403) {
					props.history.push("forbidden");
				} else if (res.status === 400) {
					props.history.push("badrequest");
				}
			})
			.then((data) => setPersonal(data))
			.catch((err) => {
				//SHOW ERROR
				return;
			});
	};

	const sendUpdateRequest = async (buchungData) => {
		const response = await fetch(
			`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/btmbuchung/${buchung.id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization:
						"Bearer " + window.sessionStorage.getItem("edbapo-jwt"),
				},
				body: JSON.stringify(buchungData),
			}
		).catch((err) => {
			//SHOW ERROR
			console.log(err);
		});

		if (response && response.status === 200) {
			props.onHide();
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

	const updateBuchung = (event) => {
		event.preventDefault();

		let { btmMenge, pruefdatum, pruefer, datum } = event.target;
		let buchungData = {
			benutzer: props.user.id,
			btm: props.btm.btm.id,
			menge: btmMenge.value,
			pruefdatum: pruefdatum.value,
			pruefer: pruefer.value,
			datum: datum.value,
		}

		if (buchung.typ.toLowerCase() === "zugang") {
			let { anforderungsschein, lieferant, } = event.target;
			buchungData = {
				...buchungData,
				typ: "ZUGANG",
				lieferant: lieferant.value,
				anforderungsschein: anforderungsschein.value,
			};
		} else if (buchung.typ.toLowerCase() === "abgang") {
			let { rezept, empfaenger, arzt } = event.target;
			buchungData = {
				...buchungData,
				typ: "ABGANG",
				empfaenger: empfaenger.value,
				arzt: arzt.value,
				rezept: rezept.value,
			};
		}
		sendUpdateRequest(buchungData);
	};

	const checkPruefdatum = () => {
		if (buchung.pruefdatum) {
			return buchung.pruefdatum >= buchung.datum && buchung.pruefdatum <= moment(new Date()).format("YYYY-MM-DD");
		}
		return true;
	};

	const checkDatum = () => {
		if(buchung.datum){
			return buchung.datum <= moment(new Date()).format("YYYY-MM-DD");
		  } else {
			return true;
		  }
	};

	const checkPruefer = () => {
		return (buchung.pruefer && buchung.pruefdatum) || (!buchung.pruefer && !buchung.pruefdatum)
	}

	const updateTooltipTexts = data => {
		if (data) {
			console.log(data)
			if (data.pruefdatum < data.datum) {
				setTooltips({ ...tooltips, pruefdatum: 'Prüfdatum darf nicht vor dem Einstelldatum liegen' });
			}
			if (data.pruefdatum && !data.pruefer) {
				setTooltips({ ...tooltips, pruefer: 'Prüfer darf nicht leer sein wenn ein Prüfdatum ausgewählt ist' });
			} else if (!data.pruefdatum && data.pruefer) {
				setTooltips({ ...tooltips, pruefer: 'Prüfdatum muss ausgewählt werden wenn ein Prüfer ausgewählt ist' });
			}
		}
	}

	const hideModal = () => {
		props.onHide();
		setBuchung(props.buchung);
	};

	useEffect(() => {
		setBuchung(props.buchung);
		getPersonalData();
		updateTooltipTexts(props.buchung);
	}, [props.buchung]);

	function Zugang() {
		if (buchung.typ) {
			if (buchung.typ.toLowerCase() === "zugang") {
				return (
					<React.Fragment>
						<Form.Group as={Row} controlId="anforderungsschein">
							<Form.Label column sm="3">
								Anforderungsschein
              				</Form.Label>
							<Col sm="9">
								<Form.Control
									name="anforderungsschein"
									type="text"
									required
									defaultValue={buchung.anforderungsschein}
								/>
							</Col>
						</Form.Group>
						<Form.Group as={Row} controlId="lieferant">
							<Form.Label column sm="3">
								Lieferant
              				</Form.Label>
							<Col sm="9">
								<Form.Control
									name="lieferant"
									defaultValue={buchung.lieferant.name}
									required
									as="select"
								>
									{lieferanten.map((l) => (
										<option key={l.id} value={l.id}>
											{l.name}
										</option>
									))}
								</Form.Control>
							</Col>
						</Form.Group>
					</React.Fragment>
				);
			}
		}
		return null;
	}

	function Abgang() {
		if (buchung.typ) {
			if (buchung.typ.toLowerCase() === "abgang") {
				return (
					<React.Fragment>
						<Form.Group as={Row} controlId="empfaenger">
							<Form.Label column sm="3">
								Empfaenger
              				</Form.Label>
							<Col sm="9">
								<Form.Control
									name="empfaenger"
									defaultValue={buchung.empfaenger.name}
									required
									as="select"
								>
									{empfaenger.map((e) => (
										<option key={e.id} value={e.id}>
											{e.vorname} {e.name}
										</option>
									))}
								</Form.Control>
							</Col>
						</Form.Group>
						<Form.Group as={Row} controlId="arzt">
							<Form.Label column sm="3">
								Arzt
              				</Form.Label>
							<Col sm="9">
								<Form.Control
									name="arzt"
									defaultValue={buchung.arzt.name}
									required
									as="select"
								>
									{aerzte.map((p) => (
										<option key={p.id} value={p.id}>
											{p.name}
										</option>
									))}
								</Form.Control>
							</Col>
						</Form.Group>
						<Form.Group as={Row} controlId="rezept">
							<Form.Label column sm="3">
								Rezept
              				</Form.Label>
							<Col sm="9">
								<Form.Control
									defaultValue={buchung.rezept}
									name="rezept"
									type="text"
									required
								/>
							</Col>
						</Form.Group>
					</React.Fragment>
				);
			}
		}
		return null;
	}

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			onExiting={hideModal}
			backdrop="static"
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Betäubungsmittel-Buchung aktualisieren
        </Modal.Title>
			</Modal.Header>
			<Form onSubmit={updateBuchung}>
				<Modal.Body>
					<Form.Group as={Row} controlId="datum">
						<Form.Label column sm="3">
							Datum
            		</Form.Label>
						<Col sm="9">

							<Form.Control
								name="datum"
								type="date"
								isInvalid={!checkDatum()}
								value={moment(buchung.datum).format("YYYY-MM-DD")}
								onChange={e => {setBuchung({ ...buchung, datum: e.target.value });
								}}
							/>

						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="btmMenge">
						<Form.Label column sm="3">
							Menge
            		</Form.Label>
						<Col sm="9">
							<Form.Control
								name="btmMenge"
								type="number"
								min="1"
								value={buchung.menge}
								onChange={e => setBuchung({ ...buchung, menge: e.target.value })}
							/>
						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="pruefdatum">
						<Form.Label column sm="3">
							Prüfdatum
            		</Form.Label>
						<Col sm="9">
							<OverlayTrigger
								placement="right"
								show={!checkPruefdatum()}
								overlay={<Tooltip id="button-tooltip-1">{tooltips.pruefdatum}</Tooltip>}
							>
								<Form.Control
									name="pruefdatum"
									isInvalid={!checkPruefdatum()}
									type="date"
									value={moment(buchung.pruefdatum).format("YYYY-MM-DD")}
									onChange={(e) => {
										setBuchung({ ...buchung, pruefdatum: e.target.value });
										checkPruefer();
										checkPruefdatum();
										updateTooltipTexts({ ...buchung, pruefdatum: e.target.value });
									}}
								/>
							</OverlayTrigger>
						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="pruefer">
						<Form.Label column sm="3">
							Pruefer
            		</Form.Label>
						<Col sm="9">
							<OverlayTrigger
								placement="right"
								show={!checkPruefer()}
								overlay={<Tooltip id="button-tooltip-2">{tooltips.pruefer}</Tooltip>}
							>
								<Form.Control
									name="pruefer"
									isInvalid={!checkPruefer()}
									value={buchung.pruefer == null ? '' : buchung.pruefer.id}
									as="select"
									onChange={e => {
										setBuchung({ ...buchung, pruefer: e.target.value });
										checkPruefer();
										checkPruefdatum();
										updateTooltipTexts({ ...buchung, pruefer: e.target.value });
									}}
								>
									<option value=''></option>
									{personal
										.filter((p) => p.rolle === "ADMIN" || p.rolle === "PRUEFER")
										.map((p) => (
											<option key={p.id} value={p.id}> {p.vorname} {p.name} </option>
										))}
								</Form.Control>
							</OverlayTrigger>
						</Col>
					</Form.Group>
					<Zugang />
					<Abgang />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={(props.onHide)}>
						Abbrechen
          			</Button>
					<Button variant="primary" disabled={!checkPruefdatum() || !checkPruefer()} type="submit">
						Bestätigen
          			</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}

export default UpdateBuchungModal;
