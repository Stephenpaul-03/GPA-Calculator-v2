import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  useDisclosure,
  Tooltip,
  IconButton,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MenuIcon } from "@heroicons/react/outline";
import Presets from "../pages/components/Presets";
import Calculator from "../pages/components/Calculator";
import Contact from "../pages/components/Contact";
import Instructions from "../pages/components/Instructions";
import Result from "../pages/components/Result";

const DashBoard = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(true);
  const [subjects, setSubjects] = useState(
    Array(7).fill({ name: "", credits: "", grade: "" })
  );
  const [results, setResults] = useState(null);

  const {
    isOpen: isMainDrawerOpen,
    onOpen: onMainDrawerOpen,
    onClose: onMainDrawerClose,
  } = useDisclosure();

  const toast = useToast();

  const navWidth = useBreakpointValue({ base: "12%", md: "3%" });
  const boxMaxWidth = useBreakpointValue({ base: "40%", md: "4xl" });
  const boxMinWidth = useBreakpointValue({ base: "90%", md: "4xl" });
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    toast({
      title: "Presets Available!",
      description: "Check out the available presets in the drawer.",
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
  }, [toast]);

  const handlePresetSelect = (presetSubjects) => {
    setSubjects(
      presetSubjects.map((subject) => ({
        name: subject.name,
        credits: subject.credits,
        grade: "",
      }))
    );
  };

  const resetSubjects = () => {
    setSubjects(Array(8).fill({ name: "", credits: "", grade: "" }));
  };

  const handleSubjectsChange = (updatedSubjects) => {
    setSubjects(updatedSubjects);
  };

  const handleResultsChange = (newResults) => {
    setResults(newResults);
  };

  return (
    <>
      <style>
        {`
          .scrollable-content::-webkit-scrollbar {
            display: none;
          }
          .scrollable-content {
            -ms-overflow-style: none; /* IE 10+ */
            scrollbar-width: none; /* Firefox */
          }
        `}
      </style>
      <Flex
        as="nav"
        color="white"
        justifyContent="space-between"
        alignItems="center"
        position="fixed"
        top={0}
        left={0}
        width={navWidth}
        zIndex={10}
        flexDirection="column"
        gap={2}
      >
        <Tooltip
          label="Presets are Available"
          bg="orange.300"
          color="black"
          fontWeight="semibold"
          borderRadius="md"
          padding="2"
          placement="right"
          isOpen={isTooltipVisible}
        >
          <IconButton
            onClick={onMainDrawerOpen}
            variant="filled"
            color="whiteAlpha.900"
            bg="teal.600"
            borderRadius="md"
            _hover={{ bg: "teal.700" }}
            icon={<MenuIcon width="18px" height="18px" strokeWidth="1" />}
            aria-label="Open menu"
            onMouseEnter={() => setIsTooltipVisible(false)}
          />
        </Tooltip>
      </Flex>

      {/* Main Drawer */}
      <Drawer
        isOpen={isMainDrawerOpen}
        placement="left"
        onClose={onMainDrawerClose}
        size={useBreakpointValue({ base: "full", md: "xs" })}
      >
        <DrawerOverlay />
        <DrawerContent
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <DrawerCloseButton
            position="absolute"
            top={2}
            right={2}
            _hover={{ bg: "gray.200" }}
          />
          <DrawerBody
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="full"
          >
            <Presets
              onPresetSelect={handlePresetSelect}
              onCollegeSelect={resetSubjects}
              onMainDrawerClose={onMainDrawerClose}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Dashboard Body */}
      <Flex
        minH="100vh"
        bg="gray.100"
        justifyContent="center"
        alignItems="center"
        m={0}
      >
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          minW={boxMinWidth}
          maxW={boxMaxWidth}
          maxH="fit-content"
          bg="white"
          my={2}
          className="scrollable-content"
        >
          {!isMobile && <Instructions />}
          <Contact />
          <Calculator
            subjects={subjects}
            onSubjectsChange={handleSubjectsChange}
            onResultsChange={handleResultsChange}
          />
        </Box>
      </Flex>
      {results && (
        <Box>
          <Result results={results} />
        </Box>
      )}
    </>
  );
};

export default DashBoard;
