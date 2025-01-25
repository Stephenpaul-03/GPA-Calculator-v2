import React from "react";
import { HStack, Input, Select, useBreakpointValue } from "@chakra-ui/react";

const SubjectRow = ({ index, subject, updateSubject }) => {
  const subjectNameWidth = useBreakpointValue({ base: "20%", md: "60%" });

  return (
    <HStack spacing={4} mb={4} w="full">
      <Input
        minW={subjectNameWidth} 
        textAlign="center"
        placeholder={`Subject ${index + 1}`}
        focusBorderColor="gray.300"
        value={subject.name}
        onChange={(e) => updateSubject(index, "name", e.target.value)}
      />

      <Input
        textAlign="center"
        placeholder="Credits"
        value={subject.credits}
        focusBorderColor="gray.300"
        onChange={(e) => updateSubject(index, "credits", e.target.value)}
      />

      <Select
        textAlign="center"
        placeholder="Grade"
        value={subject.grade}
        focusBorderColor="gray.300"
        onChange={(e) => updateSubject(index, "grade", e.target.value)}
      >
        <option value="O">O</option>
        <option value="A+">A+</option>
        <option value="A">A</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
      </Select>
    </HStack>
  );
};

export default SubjectRow;
