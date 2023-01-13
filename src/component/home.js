import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

import { Button, Card, Container, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import serviceApi from "./api/api";

function Home() {
  const [datas, setDatas] = useState([]);
  const [name, setName] = useState({});
  const [updateId, setUpdateId] = useState({});
  const [description, setDescription] = useState({});
  const [show, setShow] = useState(false);
  const [edit, setedit] = useState(false);
  const [state, setState] = useState({
    id: null,
    name: "",
    description: "",
    status: 1,
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEdit = () => setedit(false);
  const handleShowEdit = (id) => {
    if (id != null) {
      setedit(true);
      getSingleData(id);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  //Get Semua Data
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    serviceApi
      .getAll()
      .then((response) => {
        setDatas(response.data.result.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //Create Data
  const saveState = () => {
    var data = {
      data: {
        name: state.name,
        description: state.description,
        status: 1,
      },
    };

    serviceApi.createData(data).then((response) => {
      if (response.data.status == 200) {
        getData();
        handleClose();
        setState("");
        Swal.fire(
          "Berhasil Ditambahkan!",
          "Data berhasil ditambahkan",
          "success"
        );
      } else {
        Swal.fire(
          "Gagal Menambahkan",
          "Cek kembali data yang ditambahkan",
          "error"
        );
      }
    });
  };

  //Edit Fitur
  const getSingleData = (id) => {
    serviceApi.getSingleData(id).then((response) => {
      setName(response.data.result.data.name);
      setDescription(response.data.result.data.description);
      setUpdateId(response.data.result.data.id);
    });
  };

  const updateData = () => {
    var data = {
      data: {
        id: updateId,
        name: name,
        description: description,
        status: 1,
      },
    };

    serviceApi.updateData(data).then((response) => {
      if (response.data.status == 200) {
        handleCloseEdit();
        getData();
        Swal.fire(
          "Berhasil Ditambahkan!",
          "Data berhasil ditambahkan",
          "success"
        );
      } else {
        Swal.fire(
          "Gagal Menambahkan",
          "Cek kembali data yang ditambahkan",
          "error"
        );
      }
    });
  };

  //Delete Data
  function Delete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        var data = JSON.stringify([id]);
        serviceApi
          .deleteData(data)
          .then((response) => {
            if (response.status == 200) {
              getData();
              Swal.fire("Berhasil Dihapus", "Data berhasil Dihapus", "success");
            } else {
              Swal.fire("Gagal Dihapus", "Data gagal di hapus", "error");
            }
          })
          .Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }

  return (
    <>
      <Container>
        <div style={{ margin: "auto" }} className="text-center">
          <Row
            className=" d-flex flex-wrap mt-5 p-5"
            style={{ margin: "auto" }}
          >
            <div>
              <Button variant="primary" onClick={handleShow}>
                Tambah
              </Button>
              <br />
              <br />
            </div>
            {datas.map((data, index) => (
              <Card className="col-3 mb-4 " key={data.id}>
                <Card.Body>
                  <Card.Title>{data.name}</Card.Title>
                  <Card.Text>{data.description}</Card.Text>
                  <div className="d-flex justify-content-evenly">
                    <Button
                      variant="primary"
                      onClick={() => handleShowEdit(data.id)}
                    >
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => Delete(data.id)}>
                      Hapus
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Row>
        </div>
      </Container>

      {/* Modal Create */}
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Form Create</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form>
              <input
                className="form-control"
                placeholder="Masukkan Nama"
                name="name"
                id="name"
                value={state.name}
                onChange={handleInputChange}
              />
              <br />
              <input
                className="form-control"
                placeholder="Masukkan Deskripsi"
                name="description"
                id="description"
                value={state.description}
                onChange={handleInputChange}
              />
              <br />
              <br />
            </Form>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="pull-left"
            onClick={handleClose}
            variant="secondary"
          >
            Close
          </Button>
          <Button onClick={saveState}>Submit</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Edit */}
      <Modal show={edit}>
        <Modal.Header>
          <Modal.Title>Form Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form>
              <input
                className="form-control"
                placeholder="Masukkan Nama"
                name="name"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <br />
              <input
                className="form-control"
                placeholder="Masukkan Deskripsi"
                name="description"
                id="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <br />
              <br />
            </Form>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="pull-left"
            onClick={handleCloseEdit}
            variant="secondary"
          >
            Close
          </Button>
          <Button onClick={updateData}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Home;
