import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import api from "../../utils/api";
import {
  Heading,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const ProjectPost = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get("/project");
        const found = res.data.find((p) => String(p.id) === id);

        if (found) {
          let normalizedImages = [];

          if (Array.isArray(found.images)) {
            normalizedImages = found.images;
          } else if (
            typeof found.image === "string" &&
            found.image.trim() !== ""
          ) {
            normalizedImages = [{ url: found.image }];
          } else if (found.images && typeof found.images === "object") {
            normalizedImages = [found.images];
          }

          setProject({ ...found, images: normalizedImages });
        } else {
          setProject(null);
        }

        setCurrentIndex(0);
      } catch (err) {
        console.error("Failed to fetch project", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        Loading...
      </div>
    );
  if (!project)
    return (
      <div className="text-center text-red-600 mt-10 font-semibold">
        Project not found.
      </div>
    );

  const images = project.images || [];

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Heading fontSize="4xl" mb={"10px"}>
        {project.title}
      </Heading>

      {images.length > 0 && (
        <div className="flex items-center justify-center mb-8 space-x-4">
          {images.length > 1 && (
            <IconButton
              aria-label="Previous image"
              icon={<ChevronLeftIcon />}
              onClick={prevImage}
              bg="rgba(0,0,0,0.3)"
              color="white"
              _hover={{ bg: "rgba(0,0,0,0.5)" }}
              size="lg"
              borderRadius="full"
            />
          )}

          <div
            className="rounded shadow-lg overflow-hidden cursor-pointer flex-shrink-0"
            style={{
              width: "100%",
              maxWidth: "700px",
              height: "auto",
              aspectRatio: "16/9",
            }}
            onClick={onOpen}
          >
            <img
              src={images[currentIndex]?.url}
              alt={project.title}
              className="w-full h-auto object-cover"
              draggable={false}
            />
          </div>

          {images.length > 1 && (
            <IconButton
              aria-label="Next image"
              icon={<ChevronRightIcon />}
              onClick={nextImage}
              bg="rgba(0,0,0,0.3)"
              color="white"
              _hover={{ bg: "rgba(0,0,0,0.5)" }}
              size="lg"
              borderRadius="full"
            />
          )}
        </div>
      )}

      <article className="prose prose-lg max-w-none dark:prose-invert mb-10">
        <ReactMarkdown>{project.description}</ReactMarkdown>
      </article>

      {project.link && (
        <div className="flex justify-center">
          <Button
            as="a"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            colorScheme="teal"
            variant="solid"
            size="md"
            _hover={{
              variant: "outline",
              bg: "transparent",
              borderColor: "teal.500",
              color: "teal.500",
            }}
            _focus={{ boxShadow: "none" }}
            className="inline-block font-semibold px-6 py-3 rounded shadow transition-all duration-300 ease-in-out"
          >
            Visit Live Project →
          </Button>
        </div>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="full" isCentered>
        <ModalOverlay />
        <ModalContent
          bg="blackAlpha.900"
          maxW="100vw"
          maxH="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ModalCloseButton color="white" zIndex={10} />
          {images.length > 1 && (
            <IconButton
              aria-label="Previous image"
              icon={<ChevronLeftIcon />}
              onClick={prevImage}
              position="fixed"
              left="10px"
              top="50%"
              transform="translateY(-50%)"
              bg="rgba(255,255,255,0.3)"
              color="white"
              _hover={{ bg: "rgba(255,255,255,0.6)" }}
              size="lg"
              borderRadius="full"
              zIndex={10}
            />
          )}

          <img
            src={images[currentIndex]?.url}
            alt={project.title}
            style={{
              maxHeight: "90vh",
              maxWidth: "90vw",
              borderRadius: "10px",
              objectFit: "contain",
            }}
            draggable={false}
          />

          {images.length > 1 && (
            <IconButton
              aria-label="Next image"
              icon={<ChevronRightIcon />}
              onClick={nextImage}
              position="fixed"
              right="10px"
              top="50%"
              transform="translateY(-50%)"
              bg="rgba(255,255,255,0.3)"
              color="white"
              _hover={{ bg: "rgba(255,255,255,0.6)" }}
              size="lg"
              borderRadius="full"
              zIndex={10}
            />
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProjectPost;
