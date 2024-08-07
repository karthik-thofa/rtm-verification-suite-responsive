import React from 'react';
import { Document, Page, Text, StyleSheet, View, Image } from '@react-pdf/renderer';


import backgroundImage from './image/Basic_aadhar.jpg';



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
    top: 240, 
    left: 55, 
    paddingRight: 50,
  },
  text: {
    fontSize: 12,
    marginBottom: 19, 
    lineHeight: 1.5, 
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    width: '30%', 
  },
  photo: {
    width: 80, 
    height:80, 
    marginRight:170,
  },
  
  value: {
    width: '60%', 
    textAlign: 'left', 
    fontWeight:'bold',
  },
  aadhaarPhoto:{
    marginTop:6,
  },
});


const Aadhaar360PDF = ({ verificationResult, aadhaarNumber }) => {
  if (!verificationResult) return null;
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <Image src={backgroundImage} style={styles.image} />
          <View style={styles.cardContainer}>
            <View style={styles.text}>
              <Text style={styles.label}>Aadhaar Number</Text>
              <Text style={styles.value}>{aadhaarNumber}</Text>
            </View>
            <View style={styles.text}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{verificationResult.name}</Text>
            </View>
            <View style={styles.text}>
           <Text style={styles.label}>Guardian's Name</Text>
           <Text style={styles.value}>{verificationResult.careOf}</Text>
           </View>

            <View style={styles.text}>
              <Text style={styles.label}>Reference ID</Text>
              <Text style={styles.value}>{verificationResult.refId}</Text>
            </View>
            <View style={styles.text}>
              <Text style={styles.label}>Date of Birth</Text>
              <Text style={styles.value}>{verificationResult.dob}</Text>
            </View>
            <View style={styles.text}>
              <Text style={styles.label}>Gender</Text>
              <Text style={styles.value}>{verificationResult.gender}</Text>
            </View>
            <View style={styles.text}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{verificationResult.email}</Text>
            </View>
              <View style={styles.text}>
              <Text style={styles.label}>Mobile Number</Text>
               <Text style={styles.value}>{verificationResult.mobileNumber}</Text>
              </View>

            <View style={styles.text}>
            <Text style={styles.label}>Valid</Text>
             <Text style={styles.value}>{verificationResult.valid ? 'Yes' : 'No'}</Text>
             </View>

            <View style={styles.text}>
              <Text style={styles.label}>Message</Text>
              <Text style={styles.value}>{verificationResult.message}</Text>
            </View>
            <View style={styles.text}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.value}>{verificationResult.address}</Text>
            </View>
            <div className='aadhaarphoto' style={styles.aadhaarPhoto}>
            <View style={styles.text}>
              <Text style={styles.label}>Photo</Text>
              {verificationResult.photoLink && (
              <Image src={`data:image/jpeg;base64,${verificationResult.photoLink}`} style={styles.photo} />
                )}
             </View>
             </div>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Aadhaar360PDF;
