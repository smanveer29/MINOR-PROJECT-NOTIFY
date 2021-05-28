import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { DataTable } from 'react-native-paper';

const Table = ({ todayData }) => {
    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Time</DataTable.Title>
                <DataTable.Title numeric>Subject</DataTable.Title>
                <DataTable.Title numeric>Venue</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row><DataTable.Cell>8:30  </DataTable.Cell><DataTable.Cell numeric>{todayData['p1']?.subject ? `${todayData['p1'].subject}` : "-------"}</DataTable.Cell><DataTable.Cell numeric>{todayData['p1']?.subject ? `${todayData['p1'].venue}` : "-------"}</DataTable.Cell></DataTable.Row>
            <DataTable.Row><DataTable.Cell>9:30  </DataTable.Cell><DataTable.Cell numeric>{todayData['p2']?.subject ? `${todayData['p2'].subject}` : "-------"}</DataTable.Cell><DataTable.Cell numeric>{todayData['p2']?.subject ? `${todayData['p2'].venue}` : "-------"}</DataTable.Cell></DataTable.Row>
            <DataTable.Row><DataTable.Cell>10:30 </DataTable.Cell><DataTable.Cell numeric>{todayData['p3']?.subject ? `${todayData['p3'].subject}` : "-------"}</DataTable.Cell><DataTable.Cell numeric>{todayData['p3']?.subject ? `${todayData['p3'].venue}` : "-------"}</DataTable.Cell></DataTable.Row>
            <DataTable.Row><DataTable.Cell>11:30 </DataTable.Cell><DataTable.Cell numeric>{todayData['p4']?.subject ? `${todayData['p4'].subject}` : "-------"}</DataTable.Cell><DataTable.Cell numeric>{todayData['p4']?.subject ? `${todayData['p4'].venue}` : "-------"}</DataTable.Cell></DataTable.Row>
            <DataTable.Row><DataTable.Cell>12:30 </DataTable.Cell><DataTable.Cell numeric>{`Reccess`}</DataTable.Cell><DataTable.Cell numeric>{`-------`}</DataTable.Cell></DataTable.Row>
            <DataTable.Row><DataTable.Cell>1:30  </DataTable.Cell><DataTable.Cell numeric>{todayData['p6']?.subject ? `${todayData['p6'].subject}` : "-------"}</DataTable.Cell><DataTable.Cell numeric>{todayData['p6']?.subject ? `${todayData['p6'].venue}` : "-------"}</DataTable.Cell></DataTable.Row>
            <DataTable.Row><DataTable.Cell>2:30  </DataTable.Cell><DataTable.Cell numeric>{todayData['p7']?.subject ? `${todayData['p7'].subject}` : "-------"}</DataTable.Cell><DataTable.Cell numeric>{todayData['p7']?.subject ? `${todayData['p7'].venue}` : "-------"}</DataTable.Cell></DataTable.Row>
            <DataTable.Row><DataTable.Cell>3:30  </DataTable.Cell><DataTable.Cell numeric>{todayData['p8']?.subject ? `${todayData['p8'].subject}` : "-------"}</DataTable.Cell><DataTable.Cell numeric>{todayData['p8']?.subject ? `${todayData['p8'].venue}` : "-------"}</DataTable.Cell></DataTable.Row>
        </DataTable>
    )
}

export default Table

const styles = StyleSheet.create({})
