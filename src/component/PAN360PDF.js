import React from 'react';
import { Document, Page, Text, StyleSheet, View, Image } from '@react-pdf/renderer';

import backgroundImage from './image/PAN_360.jpg';

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
    top: 190, 
    left: 55, 
    paddingRight: 50,
  },
  text: {
    fontSize: 12,
    marginBottom: 21, 
    lineHeight: 1.3, 
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

const PAN360PDF = ({ verificationData }) => {
  console.log(verificationData); 

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
            <Text style={styles.label}>Name on PAN Card</Text>
            <Text style={styles.value}>{verificationData.namePANCard}</Text>
          </View>
          
          <View style={styles.text}>
            <Text style={styles.label}>Reference ID</Text>
            <Text style={styles.value}>{verificationData.referenceId}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.label}>Type</Text>
            <Text style={styles.value}>{verificationData.type}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.label}>Name Provided</Text>
            <Text style={styles.value}>{verificationData.nameProvided || '-'}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.value}>{verificationData.gender}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.label}>Date of Birth</Text>
            <Text style={styles.value}>{verificationData.dateOfBirth}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.label}>Aadhaar Linked</Text>
            <Text style={styles.value}>{verificationData.aadhaarLinked ? 'Yes' : 'No'}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.label}>Masked Aadhaar Number</Text>
            <Text style={styles.value}>{verificationData.maskedAadhaarNumber}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{verificationData.email || '-'}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.label}>Mobile Number</Text>
            <Text style={styles.value}>{verificationData.mobileNumber || '-'}</Text>
          </View>
          
          <View style={styles.text}>
            <Text style={styles.label}>Valid</Text>
            <Text style={styles.value}>{verificationData.valid ? 'Yes' : 'No'}</Text>
          </View>

          <View style={styles.text}>
            <Text style={styles.label}>Message</Text>
            <Text style={styles.value}>{verificationData.message}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{verificationData.address.fullAddress || '-'}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PAN360PDF;
