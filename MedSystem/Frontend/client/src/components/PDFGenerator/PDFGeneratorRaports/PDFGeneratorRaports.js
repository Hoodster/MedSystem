import React, { Component } from "react";
import { Page, Text, Document, StyleSheet, Font } from "@react-pdf/renderer";
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});
export default class PDFGeneratorRaports extends Component {
  render() {
    const styles = StyleSheet.create({
      body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
      },
      title: {
        fontSize: 24,
        textAlign: "center",
        fontFamily: "Roboto",
      },
      author: {
        fontSize: 12,
        textAlign: "center",
        marginBottom: 40,
      },
      subtitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: "Roboto",
      },
      text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
        fontFamily: "Roboto",
      },
      image: {
        marginVertical: 15,
        marginHorizontal: 100,
      },
      header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
      },
      pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
      },
    });

    return (
      <Document>
        <Page style={styles.body}>
          <Text style={styles.header} fixed>
            ~ Created by MedSystem ~
          </Text>
          <Text style={styles.title}>Raport - {this.props.raportTitle}</Text>
          <Text style={styles.subtitle}>{this.props.raportDate}</Text>
          <Text style={styles.text}>Opis raportu:</Text>
          <Text style={styles.text}>
            {this.props.raportBody.replaceAll("<br/>", `${"\n"}`)}
          </Text>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    );
  }
}
