"use client";
import ButtonCustoms from "@/components/Button";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ModalAddNewVoca from "../components/ModalAddNewLesoon";
import { useVocabularyContext } from "@/contexts/vocaContext";
import ModalUpdateVoca from "../components/ModalUpdateVoca";
export default function VocabularyPage() {
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [vocaItem, setVocaItem] = useState({});
  const { vocabulary, deleteVocabulary, getVocabulary } =
    useVocabularyContext();
  useEffect(() => {
    getVocabulary();
  }, []);
  return (
    <div className="mt-[50px] ">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-mainColor text-[48px] font-black mb-3">
          Manager Vocabulary
        </h3>
        <ButtonCustoms
          name="Add Vocabulary"
          className="w-[300px]"
          type="button"
          onClick={() => setShowModal(true)}
        />
        {showModal && (
          <ModalAddNewVoca handleSetShow={() => setShowModal(false)} />
        )}
        {showModalUpdate && (
          <ModalUpdateVoca
            handleSetShow={() => setShowModalUpdate(false)}
            vocaItem={vocaItem}
          />
        )}
      </div>
      <TableContainer
        component={Paper}
        sx={{ width: "100%", background: "#fff" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <CustomTableRow>
              <CustomTh align="center" isBorderLeft={true}>
                Word
              </CustomTh>
              <CustomTh align="center" isBorderLeft={true}>
                Lessons name
              </CustomTh>
              <CustomTh align="center" isBorderLeft={true}>
                Meaning
              </CustomTh>
              <CustomTh align="center" isBorderLeft={true}>
                Spelling
              </CustomTh>
              <CustomTh align="center" isBorderLeft={true}>
                Action
              </CustomTh>
            </CustomTableRow>
          </TableHead>
          <TableBody>
            {vocabulary?.map((row) => (
              <TableRow
                key={row?.lessonIdPK}
                sx={{
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                <CustomTableCell>{row?.word}</CustomTableCell>
                <CustomTableCell
                  borderLeftColor="#50505f"
                  align="center"
                  style={{ borderLeft: "0px", whiteSpace: "nowrap" }}
                >
                  {row?.title ?? ""}
                </CustomTableCell>

                <CustomTableCell
                  borderLeftColor="#50505f"
                  align="center"
                  style={{ borderLeft: "0px" }}
                >
                  {row?.meaning}
                </CustomTableCell>
                <CustomTableCell
                  borderLeftColor="#50505f"
                  align="center"
                  style={{ borderLeft: "0px" }}
                >
                  {row?.spelling}
                </CustomTableCell>
                <CustomTableCell
                  borderLeftColor="#50505f"
                  align="center"
                  style={{ borderLeft: "0px" }}
                >
                  <div className="flex items-center w-full gap-3">
                    <ButtonCustoms
                      className="w-full h-full"
                      name="Update"
                      type="button"
                      onClick={() => {
                        setShowModalUpdate(true);
                        setVocaItem(row);
                      }}
                    />
                    <ButtonCustoms
                      className="w-full h-full"
                      name="Delete"
                      type="button"
                      onClick={() => deleteVocabulary(row?.vocaIdPK)}
                    />
                  </div>
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          sx={{ padding: "50px", backgroundColor: "#053576", color: "#FFF" }}
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={10}
          rowsPerPage={10}
          page={10}
          // onPageChange={handleChangePage}
          // onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows per page"
        />
      </TableContainer>
    </div>
  );
}

const ItemFilters = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => (color ? color : "#fff")};
  width: 15%;
  font-size: 14px !important;
`;

const CustomTableRow = styled(TableRow)`
  background-color: #000;
`;

const CustomTh = styled(TableCell)`
  color: #fff !important;
  font-weight: 700;
  white-space: nowrap;
  border-left: 1px solid #fff;
  text-align: center;
  background: #053576;
  font-size: 18px;

  &:first {
    border-left: unset;
  }
`;

const CustomTableCell = styled(TableCell)`
  color: #053576 !important;
  font-weight: 700;
  text-align: center;
  font-size: 18px;
  background: transparent !important;
`;

const Fillter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
`;

const Cell = styled.div`
  color: #053576;
  text-align: center;
  white-space: nowrap;
`;

const NameKOL = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: larger;
  gap: 10px;
  color: #053576;
  padding: 10px;
  white-space: nowrap;
`;

const Tags = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  color: #053576;
  padding: 10px;
`;

const Rank = styled.div`
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  /* border-right: 2px #b9b9b9 solid; */
  color: #053576;
  padding: 20px;
`;

const UpTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;
