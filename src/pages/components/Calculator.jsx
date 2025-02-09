import React, { useState } from "react";
import {
  HStack,
  Button,
  Box,
  Text,
  IconButton,
  Tooltip,
  useBreakpointValue,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { PlusIcon, MinusIcon } from "@heroicons/react/outline";
import SubjectRow from "../elements/SubjectRow";
import Result from "../components/Result";
import Alert from "../elements/AlertDialog";

const Calculator = ({ subjects, onSubjectsChange }) => {
  const [results, setResults] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const toast = useToast();

  const buttonSize = useBreakpointValue({ base: "xs", md: "sm" });
  const containerPadding = useBreakpointValue({ base: 2, md: 4 });

  const Add_Subject = () => {
    onSubjectsChange([...subjects, { name: "", credits: "", grade: "" }]);
  };

  const Remove_Subject = () => {
    if (subjects.length > 3) {
      onSubjectsChange(subjects.slice(0, -1));
    } else {
      setAlertType("cannotRemove");
      setIsAlertOpen(true);
    }
  };

  const Update_Subject = (index, field, value) => {
    const Updated = subjects.map((subject, i) =>
      i === index ? { ...subject, [field]: value } : subject
    );
    onSubjectsChange(Updated);
  };

  const Calculate_GPA = () => {
    const Grade_Val_Dict = {
      O: 10,
      "A+": 9,
      A: 8,
      "B+": 7,
      B: 6,
      "C+": 5,
      C: 4,
    };

    let Total_Credits = 0;
    let Total_Score = 0;
    let InvalidCredits = false;
    let MissingCreditsSubjects = [];

    const Result = subjects.map(({ name, credits, grade }, index) => {
      const Credits = parseFloat(credits);
      const Grades = Grade_Val_Dict[grade?.toUpperCase()];

      if (isNaN(Credits) || Credits < 0 || Credits > 6) {
        InvalidCredits = true;
        return {
          name: name || `Subject ${index + 1}`,
          credits: Credits || 0,
          grade,
          score: 0,
        };
      }

      if (!grade) {
        MissingCreditsSubjects.push(name || `Subject ${index + 1}`);
      }

      const Score = Grades ? Credits * Grades : 0;
      if (Grades) {
        Total_Credits += Credits;
        Total_Score += Score;
      }

      return {
        name: name || `Subject ${index + 1}`,
        credits: Credits,
        grade,
        score: Score,
      };
    });

    if (InvalidCredits) {
      setAlertType("invalidcredits");
      setIsAlertOpen(true);
      return;
    }

    if (MissingCreditsSubjects.length > 0) {
      toast({
        title: "Missing Grades",
        description: `Grades missing for: ${MissingCreditsSubjects.join(", ")}`,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }

    const GPA =
      Total_Credits > 0 ? (Total_Score / Total_Credits).toFixed(3) : "N/A";
    setResults({
      rows: Result,
      totalCredits: Total_Credits,
      totalScore: Total_Score,
      gpa: GPA,
    });
  };

  const Handle_Clear = () => {
    onSubjectsChange(Array(7).fill({ name: "", credits: "", grade: "" }));
    setResults(null);
    setIsAlertOpen(false);
  };

  const Handle_Error = () => {
    setIsAlertOpen(false);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        minH="md"
        px={containerPadding}
      >
        <Box bg="white" display="flex" pb={4} justifyContent="flex-end">
          <HStack spacing={4} direction={"row"}>
            <Tooltip
              bg={"whiteAlpha.800"}
              color={"gray.800"}
              borderRadius={"md"}
              padding={"2"}
              placement="top"
              label="Add Subject"
            >
              <IconButton
                borderRadius={"full"}
                colorScheme="green"
                icon={<PlusIcon />}
                padding={2}
                size={buttonSize}
                onClick={Add_Subject}
              ></IconButton>
            </Tooltip>
            <Tooltip
              bg={"whiteAlpha.800"}
              color={"gray.800"}
              borderRadius={"md"}
              padding={"2"}
              placement="top"
              label="Remove Last Subject"
            >
              <IconButton
                borderRadius={"full"}
                colorScheme="red"
                icon={<MinusIcon />}
                padding={2}
                size={buttonSize}
                onClick={Remove_Subject}
              ></IconButton>
            </Tooltip>
          </HStack>
        </Box>

        <Box flex="1" overflowY="auto" maxH="sm" className="scrollable-content">
          {subjects.map((subject, index) => (
            <SubjectRow
              key={index}
              index={index}
              subject={subject}
              updateSubject={Update_Subject}
            />
          ))}
        </Box>

        <Box position="sticky" bottom="0" bg="white" pt={2}>
          <HStack spacing={2} justifyContent="space-between" direction={"row"}>
            <Text fontSize="lg" fontWeight="light">
              Total Subjects: {subjects.length}
            </Text>
            <Stack direction={"row"} spacing={4}>
              <Button
                colorScheme="yellow"
                color={"white"}
                size={buttonSize}
                onClick={() => {
                  setAlertType("clear");
                  setIsAlertOpen(true);
                }}
              >
                Clear
              </Button>
              <Button
                colorScheme="blue"
                size={buttonSize}
                onClick={Calculate_GPA}
              >
                Calculate
              </Button>
            </Stack>
          </HStack>
        </Box>

        <Alert
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          title={
            alertType === "clear"
              ? "Clear All Data"
              : alertType === "invalidcredits"
              ? "Invalid Credits"
              : "Cannot Remove"
          }
          body={
            alertType === "clear"
              ? "Are you sure you want to clear all the entered data? This action cannot be undone."
              : alertType === "invalidcredits"
              ? "Please Verify that all credits are provided and are within the limit [0-6] "
              : "A minimum of 3 rows of subjects are required."
          }
          confirmText={alertType === "clear" ? "Clear" : "Understood"}
          cancelText={alertType === "clear" ? "Cancel" : null}
          onConfirm={alertType === "clear" ? Handle_Clear : Handle_Error}
        />
      </Box>
      {results && <Result results={results} />}
    </>
  );
};

export default Calculator;
