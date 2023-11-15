import React, { useEffect } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import DateTime from "react-datetime";
import { formatDate } from "../../utils";
import BootstrapTable from "react-bootstrap-table-next";

const SubscriptionEditHistoryModal = (props) => {
  const { subscriptionHistories, showModal, setShowModal, subscription } =
    props;

  const columns = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "updatedBy",
      text: "Updated By",
      formatter: (cell) => (cell?.Email === undefined ? "ADMIN" : cell?.Email),
    },
    {
      dataField: "datetimeUpdated",
      text: "Date Time Updated",
      formatter: (cell) => formatDate(cell),
    },
    {
      dataField: "remarks",
      text: "Remarks",
    },
  ];

  return (
    <Container fluid={true}>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Subscription Edit History - {subscription.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {subscriptionHistories.length === 0 ? (
            <center>
              <div>No edit histories yet.</div>
            </center>
          ) : (
            <BootstrapTable
              keyField="id"
              data={subscriptionHistories}
              columns={columns}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SubscriptionEditHistoryModal;
