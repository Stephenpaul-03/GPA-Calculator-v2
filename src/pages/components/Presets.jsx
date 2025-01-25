import React, { useState, useRef } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Checkbox,
  VStack,
  Button,
  Card,
  CardBody,
  Input,
  List,
  ListItem,
  Tooltip,
  Text,
  Flex,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import presets from "../dataformats/PresetsData";
import Alert from "../elements/AlertDialog";

const Presets = ({ onPresetSelect, onCollegeSelect, onMainDrawerClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedSem, setSelectedSem] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const toast = useToast();

  const CardMaxW = useBreakpointValue({ base: "100%", md: "2xs" });
  const CardMaxH = useBreakpointValue({ base: "100%", md: "xl" });
  const CardMinW = useBreakpointValue({ base: "xs", md: "2xs" });
  const CardMinH = useBreakpointValue({ base: "2xl", md: "xl" });

  const Handle_Search = (e) => {
    setSearchTerm(e.target.value);
    setSelectedCollege(null);
  };

  const College_Select = (college) => {
    setSelectedCollege(college);
    setSearchTerm("");
    setSelectedSem([]);
    onCollegeSelect();
  };

  const Sem_Select = (semester, subjects) => {
    if (selectedSem.some((sem) => sem.name === semester)) {
      setSelectedSem(selectedSem.filter((sem) => sem.name !== semester));
    } else {
      setSelectedSem([...selectedSem, { name: semester, subjects }]);
    }
  };

  const Apply_Preset = () => {
    const allSubjects = selectedSem.flatMap((sem) => sem.subjects);
    if (allSubjects.length > 0) {
      onPresetSelect(allSubjects);
      onMainDrawerClose();

      toast({
        title: "Preset Applied",
        description: "Your preset has been successfully applied.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    } else {
      setAlertMessage("Please select at least one semester.");
      setIsAlertOpen(true);
    }
  };

  const Clear_Preset = () => {
    setAlertMessage(
      "Are you sure you want to clear all selections? This action cannot be undone."
    );
    setIsAlertOpen(true);
  };

  const confirmClear = () => {
    setSelectedCollege(null);
    setSelectedSem([]);
    setSearchTerm("");
    setIsAlertOpen(false);
  };

  const filteredColleges = Object.keys(presets).filter((college) =>
    college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
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
      <Card
        maxH={CardMaxH}
        minH={CardMinH}
        minW={CardMinW}
        maxW={CardMaxW}
        rounded="lg"
        variant={"outline"}
      >
        <Flex direction="column" justify="space-between" h="100%">
          <CardBody overflow={"hidden"}>
            <VStack spacing={4} align="stretch">
              <Input
                variant={"filled"}
                bg={"whiteAlpha.900"}
                borderRadius={"lg"}
                borderWidth={1}
                borderColor="gray.400"
                paddingX={2}
                focusBorderColor="gray.400"
                placeholder="Search for your college"
                value={searchTerm}
                onChange={Handle_Search}
              />
              {searchTerm && (
                <List
                  spacing={3}
                  overflowY="auto"
                  margin="0"
                  maxH="md"
                  bg={"whiteAlpha.900"}
                  borderRadius={"md"}
                  display={!selectedCollege ? "block" : "none"}
                  className="scrollable-content"
                >
                  {filteredColleges.length > 0 ? (
                    filteredColleges.map((college) => (
                      <ListItem
                        key={college}
                        onClick={() => College_Select(college)}
                        cursor="pointer"
                        px={2}
                        py={1}
                        borderRadius={"md"}
                        _hover={{ backgroundColor: "gray.300" }}
                      >
                        {college}
                      </ListItem>
                    ))
                  ) : (
                    <Text color="gray.500" textAlign="center" mt={2}>
                      <Tooltip
                        bg={"whiteAlpha.800"}
                        color={"gray.800"}
                        borderRadius={"md"}
                        padding={"2"}
                        label="Contact me for assistance."
                      >
                        <Box as="span" color="blue.500" cursor="pointer">
                          No Match Found
                        </Box>
                      </Tooltip>
                    </Text>
                  )}
                </List>
              )}
              {selectedCollege && (
                <>
                  <CardBody
                    fontWeight="medium"
                    textAlign="center"
                    fontSize="lg"
                    borderRadius="lg"
                    color="white"
                    boxShadow={"md"}
                    variant={"filled"}
                    bg={"blue.200"}
                  >
                    {selectedCollege}
                  </CardBody>
                  <Accordion
                    allowToggle
                    maxH="sm"
                    minH="sm"
                    overflowY="auto"
                    className="scrollable-content"
                  >
                    {Object.entries(presets[selectedCollege]).map(
                      ([year, departments]) => (
                        <AccordionItem key={year}>
                          <h2>
                            <AccordionButton
                              _expanded={{
                                bg: "blue.400",
                                color: "white",
                                borderRadius: "4px",
                              }}
                            >
                              <Box flex="1" textAlign="left">
                                {year}
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel>
                            <Accordion
                              allowToggle
                              maxH="xs"
                              overflowX="auto"
                              className="scrollable-content"
                            >
                              {Object.entries(departments).map(
                                ([department, semesters]) => (
                                  <AccordionItem key={department}>
                                    <h3>
                                      <AccordionButton
                                        _expanded={{
                                          bg: "teal.400",
                                          color: "white",
                                          borderRadius: "4px",
                                        }}
                                      >
                                        <Box flex="1" textAlign="left">
                                          {department}
                                        </Box>
                                        <AccordionIcon />
                                      </AccordionButton>
                                    </h3>
                                    <AccordionPanel
                                      maxH="3xs"
                                      overflowY="auto"
                                      className="scrollable-content"
                                      bg={"whiteAlpha.900"}
                                      borderRadius={"md"}
                                      my={2}
                                    >
                                      <VStack align="stretch" spacing={2}>
                                        {Object.entries(semesters).map(
                                          ([semester, subjects]) => (
                                            <Checkbox
                                              colorScheme="green"
                                              key={semester}
                                              isChecked={selectedSem.some(
                                                (sem) => sem.name === semester
                                              )}
                                              onChange={() =>
                                                Sem_Select(semester, subjects)
                                              }
                                            >
                                              {semester}
                                            </Checkbox>
                                          )
                                        )}
                                      </VStack>
                                    </AccordionPanel>
                                  </AccordionItem>
                                )
                              )}
                            </Accordion>
                          </AccordionPanel>
                        </AccordionItem>
                      )
                    )}
                  </Accordion>
                </>
              )}
            </VStack>
          </CardBody>
          {selectedCollege && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              gap={2}
              justifyContent={"flex-end"}
              position='absolute'
              bottom={0}
              right={2}
            >
              <Button
                colorScheme="yellow"
                onClick={Clear_Preset}
                alignSelf="flex-end"
                variant="solid"
                mb={2}
              >
                Clear
              </Button>
              <Button
                colorScheme="blue"
                onClick={Apply_Preset}
                alignSelf="flex-end"
                mb={2}
              >
                Apply Presets
              </Button>
            </Box>
          )}
        </Flex>
      </Card>

      <Alert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title={
          alertMessage === "Please select at least one semester."
            ? "No Semester Selected"
            : "Clear All Selections"
        }
        body={alertMessage}
        confirmText="OK"
        cancelText={
          alertMessage === "Please select at least one semester."
            ? ""
            : "Cancel"
        }
        onConfirm={confirmClear}
      />
    </div>
  );
};

export default Presets;
