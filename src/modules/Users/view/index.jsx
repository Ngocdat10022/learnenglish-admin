"use client";
import ButtonCustoms from "@/components/Button";
import ModelAddNewUser from "@/modules/Users/components/ModalAddNewUser";
import { useUserContext } from "@/contexts/userContext";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
export default function UsersPage() {
  const [showModal, setShowModal] = useState(false);
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  const { users, getUsers } = useUserContext();
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="mt-[50px] ">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-mainColor text-[48px] font-black mb-3">
          Manager Users
        </h3>
        <ButtonCustoms
          name="Add user"
          className="w-[300px]"
          type="button"
          onClick={() => setShowModal(true)}
        />
      </div>
      {showModal && (
        <ModelAddNewUser handleSetShow={() => setShowModal(false)} />
      )}
      <TableContainer
        component={Paper}
        sx={{ width: "100%", background: "#fff" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <CustomTableRow>
              <CustomTh align="center">Avatar</CustomTh>
              <CustomTh align="center" isBorderLeft={true}>
                full name
              </CustomTh>
              <CustomTh align="center" isBorderLeft={true}>
                email
              </CustomTh>

              <CustomTh align="center" sortDirection="asc" isBorderLeft={true}>
                point
              </CustomTh>

              <CustomTh align="center" isBorderLeft={true}>
                Tags
              </CustomTh>
            </CustomTableRow>
          </TableHead>

          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row?.userIdPK}
                sx={{
                  borderBottom: "5px solid rgba(0, 0, 0, 0.5)",
                  background: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => {
                  router.push(`/dashboard/users/${row?.userIdPK}`);
                }}
              >
                <CustomTableCell>
                  <div className="flex items-center justify-center w-full">
                    <Image
                      width={100}
                      height={100}
                      src={row?.avatar}
                      alt="avatar"
                      className="w-[50px] h-[50px] rounded-full"
                    />
                  </div>
                </CustomTableCell>
                <CustomTableCell
                  borderLeftColor="#50505f"
                  align="center"
                  style={{ borderLeft: "0px" }}
                >
                  <NameKOL>{row?.userName}</NameKOL>
                </CustomTableCell>
                <CustomTableCell borderLeftColor="#50505f" align="center">
                  <Cell>{row?.email}</Cell>
                </CustomTableCell>
                <CustomTableCell
                  borderLeftColor="#50505f"
                  // background="#191D24"
                  align="center"
                >
                  <Cell>{row?.point ?? 0}</Cell>
                </CustomTableCell>
                <CustomTableCell borderLeftColor="#50505f" align="center">
                  <Tags>
                    {/* {row?.tags.map(
                  (item, index) =>
                    item && (
                      <Chips
                        key={item}
                        label={item}
                        variant="outlined"
                        sx={{
                          color: `${
                            index === 0
                              ? "#F23581"
                              : index === 1
                              ? "#3EAABE"
                              : "#25002D"
                          }`,
                          backgroundColor: `${
                            index === 0
                              ? "#ffd7f4"
                              : index === 1
                              ? "#EBFCFF"
                              : "#F6CCFF"
                          }`,
                          "&.MuiChip-root": {
                            height: "24px",
                          },
                        }}
                      />
                    )
                )} */}
                    111
                  </Tags>
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
  color: #ffd7f4 !important;
  font-weight: 700;
  text-align: center;
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
