import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class TransactionScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      bnState: 'normal'
    }
  }

  getCameraPermission = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermissions: status==='granted',
      bnState: 'clicked',
      scanned: false
    })
  }

  handleBarcodeScan = async(type, data) => {
    this.setState({
      scanned:true,
      scannedData: data,
      bnState: 'normal'
    })
  }

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions
    const scanned = this.state.scanned
    const bnState = this.state.bnState
    
    if(bnState === 'clicked' && hasCameraPermissions) {
      return(
        <BarCodeScanner 
          onBarCodeScanned = {scanned ? undefined : this.handleBarcodeScan}
          style = {StyleSheet.absoluteFillObject}
        />
      )
    } else if(bnState === 'normal') {
      return(
      <View style={style.container}>
        <Text style={style.bnText}>{
          hasCameraPermissions=== true ? this.state.scannedData : "Request Camera Permission"
        }</Text>
        <TouchableOpacity stlye={style.scanBn} onPress={()=> {
          this.getCameraPermission();
        }}>
          <Text style={style.bnText}>Scan QR code </Text>
        </TouchableOpacity>

      </View>
    )
    }
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  scanBn: {
    backgroundColor: 'yellow',
    padding: 10,
    margin: 10,
    borderWidth: 4,
  },

  bnText: {
    fontsize: 18,
    fontWeight: 'bold',
    alignText: 'center'
  }
})