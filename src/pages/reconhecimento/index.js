import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { ErrorModal, SuccessModal } from "../../components/Modal";
import alunosData from "../../data/alunos.json";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  Container,
  FormContainer,
  Form,
  Label,
  Input,
  Button,
  VideoContainer,
  Video,
  CapturedImageContainer,
  CapturedImage,
  CaptureButtonContainer,
  CaptureAnotherButton,
  Title,
  MessageText,
  ErrorMessage,
  AlertBox,
  InfoIcon,
  SpinnerOverlay, // Importando o Spinner Overlay
  Spinner, // Importando o Spinner
} from "./styles";

const CameraCapture = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [imageSrc, setImageSrc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    matricula: "",
  });
  const [errors, setErrors] = useState({});
  const [usingFrontCamera, setUsingFrontCamera] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    setAlunos(alunosData.Sheet);
  }, []);

  const buscarAlunoPorMatricula = (matricula) => {
    return alunos.find((aluno) => aluno.RA === matricula);
  };

  useEffect(() => {
    startVideo(usingFrontCamera);
  }, [usingFrontCamera]);

  const startVideo = (front) => {
    const constraints = {
      video: {
        facingMode: front ? "user" : "environment",
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Erro ao acessar a câmera:", err));
  };

  const captureImage = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    const image = canvasRef.current.toDataURL("image/png");
    setImageSrc(image);
    setCapturedImage(image);
    sendImageToBackend(image);
  };

  const discardImage = () => {
    setImageSrc("");
    setCapturedImage(null);
    startVideo(usingFrontCamera);
  };

  const validateForm = (img) => {
    const newErrors = {};

    if (!formData.nome) {
      newErrors.nome =
        "Nome deve conter apenas letras e ser no máximo 50 caracteres.";
    }

    if (!formData.matricula || !/^\d{6}$/.test(formData.matricula)) {
      newErrors.matricula = "Matrícula deve conter exatamente 6 números.";
    }

    if (!img) {
      newErrors.imageSrc = "Imagem é obrigatório.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const base64ToFile = (base64String, filename) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const sendImageToBackend = async (img) => {
    if (!validateForm(img)) return;
    setIsSubmitting(true); // Ativa o estado de envio

    const file = base64ToFile(img, "captured.png");
    const data = new FormData();
    data.append("imagem", file);
    data.append("nome", formData.nome);
    data.append("matricula", formData.matricula);

    try {
      const response = await axios.post(
        "http://localhost:3005/salvar-aluno",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsSubmitting(false);
      setModalType("success");
      setModalMessage("Presença registrada com sucesso!");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      setIsSubmitting(false);
      setModalType("error");
      setModalMessage(error?.response?.data?.message || error.message);
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    let timer;
    if (isModalOpen) {
      timer = setTimeout(() => {
        setIsModalOpen(false);
        if (modalType === "success") {
          clearForm();
        }
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isModalOpen, modalType]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "matricula") {
      const aluno = buscarAlunoPorMatricula(value);
      if (aluno) {
        setFormData({
          ...formData,
          [name]: value,
          nome: aluno.ALUNO,
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
          nome: "",
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const clearForm = () => {
    setFormData({
      nome: "",
      matricula: "",
    });
    setImageSrc("");
    setCapturedImage(null);
    startVideo(usingFrontCamera);
  };

  return (
    <>
      <Header />
      <Container>
        {isSubmitting && (
          <SpinnerOverlay>
            <Spinner />
          </SpinnerOverlay>
        )}
        <FormContainer>
          <Form>
            <Title>Insira seus dados:</Title>
            <AlertBox>
              <InfoIcon>&#9432;</InfoIcon>
              <MessageText>
                O nome será preenchido automaticamente após o preenchimento do
                RA.
              </MessageText>
            </AlertBox>
            <Label htmlFor='matricula'>Matrícula(RA):</Label>
            <Input
              type='text'
              id='matricula'
              name='matricula'
              value={formData.matricula}
              onChange={handleChange}
              required
              pattern='\d{6}'
              disabled={isSubmitting}
              maxLength='6'
              placeholder='001122'
            />
            {errors.matricula && (
              <ErrorMessage>{errors.matricula}</ErrorMessage>
            )}
            <Label htmlFor='nome'>Nome:</Label>
            <Input
              type='text'
              id='nome'
              name='nome'
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder='...'
            />
            {errors.nome && <ErrorMessage>{errors.nome}</ErrorMessage>}
          </Form>
        </FormContainer>

        <VideoContainer>
          {capturedImage ? (
            <CapturedImageContainer>
              <Title>Imagem Capturada:</Title>
              <CapturedImage src={capturedImage} alt='Imagem capturada' />
              <CaptureButtonContainer>
                <CaptureAnotherButton type='button' onClick={discardImage}>
                  Tirar Outra Foto
                </CaptureAnotherButton>
              </CaptureButtonContainer>
            </CapturedImageContainer>
          ) : (
            <CapturedImageContainer>
              <Video ref={videoRef} autoPlay muted />
              <canvas
                ref={canvasRef}
                width='860'
                height='650'
                style={{ display: "none" }}
              />
              <CaptureButtonContainer>
                <Button type='button' onClick={captureImage}>
                  Tirar Foto
                </Button>
              </CaptureButtonContainer>
            </CapturedImageContainer>
          )}
        </VideoContainer>
        {isModalOpen && modalType === "error" && (
          <ErrorModal
            onClose={() => setIsModalOpen(false)}
            errorMsg={modalMessage}
          />
        )}
        {isModalOpen && modalType === "success" && (
          <SuccessModal
            onClose={() => setIsModalOpen(false)}
            clearForm={clearForm}
          />
        )}
      </Container>
      <Footer />
    </>
  );
};

export default CameraCapture;
