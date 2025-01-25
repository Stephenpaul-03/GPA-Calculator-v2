import React from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  Text,
  Circle,
  Flex,
  Card,
  CardHeader,
  Heading,
} from "@chakra-ui/react";

const Step = ({ step, description, isActive }) => (
  <Flex align="center" mb={4}>
    <Circle
      size="30px"
      bg={"blue.300"}
      color="white"
      mr={4}
    >
      {step}
    </Circle>
    <Text fontSize="xs" fontWeight="thin">{description}</Text>
  </Flex>
);

const VerticalStepper = ({ steps, activeStep }) => (
  <VStack align="start" spacing={0}>
    {steps.map((step, index) => (
      <Step
        key={index}
        step={index + 1}
        description={step}
        isActive={index === activeStep}
      />
    ))}
  </VStack>
);

const Instructions = () => {
  const steps1 = [
    "Search for and select your college in the preset panel.",
    "Choose your year, department, and semesters.",
    "Click Apply Preset.",
    "Select grades for each subject from the dropdown.",
    "Click Calculate and download the result as a PDF, Image or excel.",
  ];
  const steps2 = [
    'Use the "+" or "-" icons to add/remove subject rows.',
    "Optionally, enter the subject name.",
    "Input credits and select grades from the dropdown.",
    "Repeat for all subjects, then click Calculate.",
    "Download the result as a PDF, Image or excel.",
  ];

  return (
    <Card
      minW="2xs"
      maxW="2xs"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="lg"
      borderColor={"transparent"}
      variant={"outline"}
      position="absolute"
      bottom={2}
      right={2}
    >
      <CardHeader p={0} m={2}>
        <Heading fontSize={"xl"} fontWeight={"thin"} textAlign={"center"}>
          Instructions
        </Heading>
      </CardHeader>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton
            _hover={{ borderRadius: "md", bg: "gray.200" }}
            _expanded={{
              bg: "blue.400",
              color: "white",
              borderRadius: "4px",
            }}
          >
            <Box flex="1" textAlign="left">
              With Presets
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel
            overflowY="auto"
            maxH={"2xs"}
            bg={"whiteAlpha.900"}
            borderRadius={"lg"}
            my={2}
          >
            <VerticalStepper steps={steps1} activeStep={0} />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton
            _hover={{ borderRadius: "md", bg: "gray.200" }}
            _expanded={{
              bg: "blue.400",
              color: "white",
              borderRadius: "4px",
            }}
          >
            <Box flex="1" textAlign="left">
              Without Presets
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel
            overflowY="auto"
            maxH={"2xs"}
            bg={"whiteAlpha.900"}
            borderRadius={"lg"}
            my={2}
          >
            <VerticalStepper steps={steps2} activeStep={0} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default Instructions;
