import React from 'react';
import { Document, Page, Text, StyleSheet, View, Image } from '@react-pdf/renderer';

import backgroundImage from './image/Basic_PAN.jpg';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    position: 'relative', 
  },
  cardContainer: {
    padding: 20,
    position: 'absolute', 
    top: 200, 
    left: 55, 
  },
  text: {
    fontSize: 12,
    marginBottom: 17, 
    lineHeight: 2.5, 
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {

    width: '30%', 
  },
  value: {
    width: '60%', 
    textAlign: 'left', 
    fontWeight:'bold',
  },
});

const VerificationPDF = ({ verificationData }) => {
  if (!verificationData) return null;

  return (
    <Document>
      <Page size="A4" style={styles.container}>
    
        <Image src={backgroundImage} style={styles.image} />
        
      
        <View style={styles.cardContainer}>
          <View style={styles.text}>
            <Text style={styles.label}>PAN Number</Text>
            <Text style={styles.value}>{verificationData.panNumber}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.label}>Name Registered</Text>
            <Text style={styles.value}>{verificationData.name}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.label}>Father's Name</Text>
            <Text style={styles.value}>{verificationData.fathersName || '-'}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.label}>Reference ID</Text>
            <Text style={styles.value}>{verificationData.referenceId || '-'}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.label}>Type</Text>
            <Text style={styles.value}>{verificationData.type || '-'}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.label}>Name Provided</Text>
            <Text style={styles.value}>{verificationData.nameProvided || '-'}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.label}>Valid</Text>
            <Text style={styles.value}>{verificationData.valid ? 'Yes' : 'No'}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.label}>Message</Text>
            <Text style={styles.value}>{verificationData.message || '-'}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default VerificationPDF;
