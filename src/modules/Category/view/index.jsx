"use client";
import ButtonCustoms from "@/components/Button";
import { useCatContext } from "@/contexts/CatContext";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import ModalAddNewCat from "../components/ModalAddNewCat";
import ModalUpdateCat from "../components/ModalUpdateCat";
export default function CategoryPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [catItem, setCatItem] = useState({});
  const { category, deleteCat } = useCatContext();

  return (
    <div className="mt-[50px] ">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-mainColor text-[48px] font-black mb-3">
          Manager Category
        </h3>
        <ButtonCustoms
          name="Add Category"
          className="w-[300px]"
          type="button"
          onClick={() => setShowModal(true)}
        />
        {showModal && (
          <ModalAddNewCat handleSetShow={() => setShowModal(false)} />
        )}

        {modalUpdate && (
          <ModalUpdateCat
            handleSetShow={() => setModalUpdate(false)}
            catItem={catItem}
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
              {/* <CustomTh align="center" isBorderLeft={true}>
                ID category
              </CustomTh> */}
              <CustomTh align="center" isBorderLeft={true}>
                Category name
              </CustomTh>
              <CustomTh align="center" isBorderLeft={true}>
                Action
              </CustomTh>
            </CustomTableRow>
          </TableHead>

          <TableBody>
            {category?.map((row) => (
              <TableRow
                key={row?.catIdPK}
                sx={{
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                {/* <CustomTableCell>{row?.catIdPK}</CustomTableCell> */}
                <CustomTableCell
                  borderLeftColor="#50505f"
                  align="center"
                  style={{ borderLeft: "0px" }}
                >
                  {row?.catName}
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
                        setModalUpdate(true);
                        setCatItem(row);
                      }}
                    />
                    <ButtonCustoms
                      className="w-full h-full"
                      name="Delete"
                      type="button"
                      onClick={() => deleteCat(row?.catIdPK)}
                    />
                  </div>
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <TablePagination
  sx={{ padding: "50px", backgroundColor: "#000", color: "#FFF" }}
  rowsPerPageOptions={[10, 20, 50]}
  component="div"
  count={totalItemKols}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
  labelRowsPerPage="Rows per page"
/> */}
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
  white-space: nowrap;
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
