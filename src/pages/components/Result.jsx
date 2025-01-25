import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tfoot,
  VStack,
  TableContainer,
  Tooltip,
  IconButton,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaImage, FaFileExcel, FaFilePdf } from "react-icons/fa";
import html2canvas from "html2canvas";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";

const Result = ({ results }) => {
  const Image_Download = () => {
    const content = document.getElementById("contentContainer");

    html2canvas(content, {
      scale: 2,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = imgData;
      link.download = "Result.png";
      link.click();
    });
  };

  const Excel_Download = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Result");

    const headerRow = ["Subject", "Credits", "Grade", "Score"];
    worksheet.addRow(headerRow);
    const headerStyle = {
      font: { name: "Times New Roman", size: 14, bold: true },
      alignment: { horizontal: "center", vertical: "middle" },
    };
    worksheet.getRow(1).eachCell((cell) => {
      cell.style = headerStyle;
    });

    results.rows.forEach((row) => {
      const rowData = [row.name, row.credits, row.grade, row.score];
      const newRow = worksheet.addRow(rowData);
      newRow.eachCell((cell, colNumber) => {
        cell.style = {
          font: { name: "Times New Roman", size: 14 },
          alignment: {
            horizontal: colNumber === 1 ? "left" : "center",
            vertical: "middle",
          },
        };
      });
    });

    const totalRow = worksheet.addRow([
      "Total Score",
      results.totalCredits,
      "",
      results.totalScore,
    ]);
    const gpaRow = worksheet.addRow(["Total GPA/CGPA", "", "", results.gpa]);

    [totalRow, gpaRow].forEach((row) => {
      row.eachCell((cell) => {
        cell.style = {
          font: { name: "Times New Roman", size: 14 },
          alignment: { horizontal: "center", vertical: "middle" },
        };
      });
    });

    worksheet.columns = [
      { width: 40 },
      { width: 10 },
      { width: 10 },
      { width: 10 },
    ];

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "Result.xlsx");
    });
  };

  const PDF_Download = () => {
    const doc = new jsPDF("landscape");
  
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
  
    const startX = 20;
    const startY = 30;
    const totalWidth = pageWidth - startX * 2;
  
    const colRatios = [0.5, 0.15, 0.15, 0.2];
    const colWidths = colRatios.map((ratio) => totalWidth * ratio);
    const rowHeight = 10;
    const padding = 3;
  
    const headers = ["Subject", "Credits", "Grade", "Score"];
  
    doc.setFontSize(16);
    doc.text("Result", startX, 20);
  
    doc.setFontSize(12);
    headers.forEach((header, i) => {
      const x =
        startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0) + padding;
      doc.text(header, x, startY + 7);
    });
  
    doc.line(startX, startY, startX + totalWidth, startY);
    doc.line(
      startX,
      startY + rowHeight,
      startX + totalWidth,
      startY + rowHeight
    );
    let currentX = startX;
    for (const width of colWidths) {
      doc.line(currentX, startY, currentX, startY + rowHeight);
      currentX += width;
    }
    doc.line(currentX, startY, currentX, startY + rowHeight);
  
    let yPosition = startY + rowHeight * 2; // Start position for rows
    const maxRowsPerPage = Math.floor((pageHeight - startY - rowHeight * 2) / rowHeight);
  
    results.rows.forEach((row, index) => {
      if (index > 0 && index % maxRowsPerPage === 0) {
        doc.addPage();
        yPosition = startY + rowHeight * 2; // Reset Y position on new page
        doc.setFontSize(12);
        headers.forEach((header, i) => {
          const x =
            startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0) + padding;
          doc.text(header, x, yPosition + 7);
        });
        doc.line(startX, yPosition, startX + totalWidth, yPosition);
        doc.line(
          startX,
          yPosition + rowHeight,
          startX + totalWidth,
          yPosition + rowHeight
        );
        currentX = startX;
        for (const width of colWidths) {
          doc.line(currentX, yPosition, currentX, yPosition + rowHeight);
          currentX += width;
        }
        doc.line(currentX, yPosition, currentX, yPosition + rowHeight);
        yPosition += rowHeight; // Move down after headers
      }
  
      const rowData = [
        row.name,
        row.credits.toString(),
        row.grade,
        row.score.toString(),
      ];
      rowData.forEach((data, i) => {
        const x =
          startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0) + padding;
        const maxWidth = colWidths[i] - padding * 2;
  
        if (i === 0 && data.length > 0) {
          doc.text(doc.splitTextToSize(data, maxWidth), x, yPosition + 7);
        } else {
          doc.text(data, x, yPosition + 7);
        }
      });
  
      doc.line(startX, yPosition, startX + totalWidth, yPosition);
      currentX = startX;
      for (const width of colWidths) {
        doc.line(currentX, yPosition, currentX, yPosition + rowHeight);
        currentX += width;
      }
      doc.line(currentX, yPosition, currentX, yPosition + rowHeight);
  
      yPosition += rowHeight; // Move down after the row
    });
  
    const lastRowY = yPosition;
    doc.line(startX, lastRowY, startX + totalWidth, lastRowY);
  
    const summaryY = lastRowY + rowHeight;
    doc.text("Total Score: " + results.totalScore, startX, summaryY);
    doc.text("Total GPA/CGPA: " + results.gpa, startX, summaryY + rowHeight);
  
    doc.save("Result.pdf");
  };
  
  

  const buttonAlignment = useBreakpointValue({
    base: "center",
    md: "flex-start",
  });

  return (
    <>
      <Box
        id="contentContainer"
        p={4}
        border="1px solid #e2e8f0"
        borderRadius="md"
        my={4}
      >
        <VStack spacing={6} align="center">
          <TableContainer w="fit-content">
            <Table variant="simple" size="md">
              <Thead>
                <Tr>
                  <Th
                    textAlign="center"
                    textColor="red.400"
                    borderBottomColor="red.400"
                  >
                    Subject
                  </Th>
                  <Th
                    textAlign="center"
                    textColor="red.400"
                    borderBottomColor="red.400"
                  >
                    Credits
                  </Th>
                  <Th
                    textAlign="center"
                    textColor="red.400"
                    borderBottomColor="red.400"
                  >
                    Grade
                  </Th>
                  <Th
                    textAlign="center"
                    textColor="red.400"
                    borderBottomColor="red.400"
                  >
                    Score
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {results.rows.map((row, index) => (
                  <Tr key={index}>
                    <Td>{row.name}</Td>
                    <Td textAlign="center">{row.credits}</Td>
                    <Td textAlign="center">{row.grade}</Td>
                    <Td textAlign="center">{row.score}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th textColor="blue.400">Total Score</Th>
                  <Th textAlign="center" textColor="blue.400">
                    {results.totalCredits}
                  </Th>
                  <Th></Th>
                  <Th textAlign="center" textColor="blue.400">
                    {results.totalScore}
                  </Th>
                </Tr>
                <Tr>
                  <Th textColor="teal.400">
                    Total GPA/CGPA{" "}
                    <span style={{ fontSize: "6px" }}>[on 10-point scale]</span>
                  </Th>
                  <Th></Th>
                  <Th></Th>
                  <Tooltip
                    bg="whiteAlpha.800"
                    color="gray.800"
                    borderRadius="md"
                    maxW="md"
                    padding="2"
                    placement="right"
                    label="Calculated by dividing Obtained Score by Total Credits"
                  >
                    <Th textAlign="center" textColor="teal.400">
                      {results.gpa}
                    </Th>
                  </Tooltip>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </VStack>
      </Box>

      <Flex
        direction="row"
        gap={2}
        justifyContent={buttonAlignment}
        wrap="wrap"
      >
        <Tooltip
          bg="whiteAlpha.800"
          color="gray.800"
          borderRadius="md"
          padding="2"
          label="Download as Image [PNG]"
        >
          <IconButton
            colorScheme="blue"
            onClick={Image_Download}
            padding={4}
            marginY={2}
            icon={<FaImage />}
            size="lg"
            variant="solid"
          />
        </Tooltip>

        <Tooltip
          bg="whiteAlpha.800"
          color="gray.800"
          borderRadius="md"
          padding="2"
          label="Download as Excel"
        >
          <IconButton
            colorScheme="green"
            onClick={Excel_Download}
            padding={4}
            marginY={2}
            icon={<FaFileExcel />}
            size="lg"
            variant="solid"
          />
        </Tooltip>

        <Tooltip
          bg="whiteAlpha.800"
          color="gray.800"
          borderRadius="md"
          padding="2"
          label="Download as PDF"
        >
          <IconButton
            colorScheme="red"
            onClick={PDF_Download}
            padding={4}
            marginY={2}
            icon={<FaFilePdf />}
            size="lg"
            variant="solid"
          />
        </Tooltip>
      </Flex>
    </>
  );
};

export default Result;
