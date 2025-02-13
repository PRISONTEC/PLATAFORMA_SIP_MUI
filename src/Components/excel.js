import React, { Component } from "react";
import ExportExcel from "react-export-excel";
import styled from "styled-components";

const ExcelFile = ExportExcel.ExcelFile; // indica el archivo de excel que vamos a crear
const ExcelSheet = ExportExcel.ExcelSheet;  // Una hoja de excel
const ExcelColumn = ExportExcel.ExcelColumn; // Una conlumna de excel

function Excel(props) {
    return (
        <>
            {
                props.excelInterno == "interno" &&
                <ExcelFile element={<PrettyButton >Exportar a Excel</PrettyButton>} filename={props.excelBuscarPorIdInterno}>
                    <ExcelSheet data={props.llamadasInterno} name={props.excelBuscarPorIdInterno}>
                        <ExcelColumn label="INTERNO" value="idInterno" />
                        <ExcelColumn label="DESTINO" value="numeroCelular" />
                        <ExcelColumn label="FECHA" value="fechaHora" />
                        <ExcelColumn label="DURACION" value="duracion" />
                    </ExcelSheet>
                </ExcelFile>
            }
            {
                props.excelDestino == "destino" &&
                <ExcelFile element={<PrettyButton>Exportar a Excel</PrettyButton>} filename={props.excelBuscarPorDestino}>
                    <ExcelSheet data={props.llamadasInterno} name={props.excelBuscarPorDestino}>
                        <ExcelColumn label="INTERNO" value="idInterno" />
                        <ExcelColumn label="DESTINO" value="numeroCelular" />
                        <ExcelColumn label="FECHA" value="fechaHora" />
                        <ExcelColumn label="DURACION" value="duracion" />
                        <ExcelColumn label="PENAL" value="penal" />
                    </ExcelSheet>
                </ExcelFile>
            }
        </>
    )
}

export default Excel;

const PrettyButton = styled.button`
  background-color: green;
  border: 2px solid green;
  border-radius: 5px;
  color: white;
  padding: 5px;
  box-shadow: 5px 5px 5px 0px lightgray;
`;