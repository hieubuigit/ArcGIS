import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TransactionInfo } from './transaction-list.model';
import { GisMap } from '../gis-map/gis-map.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent implements OnInit {
 readonly sampleTransactions: TransactionInfo[] = [
  { maintainCode: 'TRX001', maintainName: 'Oil Change', description: 'Change engine oil and filter.', cost: 45.00, latestUpdate: '2023-09-15T10:00:00Z', createdDate: '2023-01-01T08:30:00Z', createdBy: 'admin', updatedDate: '2023-09-15T10:00:00Z', updatedBy: 'admin', status: GisMap.Status.DongCua },
  { maintainCode: 'TRX002', maintainName: 'Tire Rotation', description: 'Rotate tires for even wear.', cost: 30.00, latestUpdate: '2023-09-16T11:00:00Z', createdDate: '2023-01-02T09:15:00Z', createdBy: 'admin', updatedDate: '2023-09-16T11:00:00Z', updatedBy: 'tech1', status: GisMap.Status.BaoTri },
  { maintainCode: 'TRX003', maintainName: 'Brake Inspection', description: 'Inspect brake pads and fluid.', cost: 50.00, latestUpdate: '2023-09-17T12:30:00Z', createdDate: '2023-01-03T10:00:00Z', createdBy: 'user1', updatedDate: '2023-09-17T12:30:00Z', updatedBy: 'tech2', status: GisMap.Status.DongCua },
  { maintainCode: 'TRX004', maintainName: 'Battery Replacement', description: 'Replace old battery with new one.', cost: 120.00, latestUpdate: '2023-09-18T13:30:00Z', createdDate: '2023-01-04T11:45:00Z', createdBy: 'user2', updatedDate: '2023-09-18T13:30:00Z', updatedBy: 'tech1', status: GisMap.Status.DongCua },
  { maintainCode: 'TRX005', maintainName: 'Transmission Fluid Change', description: 'Change transmission fluid and filter.', cost: 100.00, latestUpdate: '2023-09-19T14:30:00Z', createdDate: '2023-01-05T12:00:00Z', createdBy: 'admin', updatedDate: '2023-09-19T14:30:00Z', updatedBy: 'tech3', status: GisMap.Status.DongCua },
  { maintainCode: 'TRX006', maintainName: 'Alignment', description: 'Perform wheel alignment.', cost: 70.00, latestUpdate: '2023-09-20T09:00:00Z', createdDate: '2023-01-06T10:15:00Z', createdBy: 'user1', updatedDate: '2023-09-20T09:00:00Z', updatedBy: 'tech1', status: GisMap.Status.DongCua },
  { maintainCode: 'TRX007', maintainName: 'Fluid Check', description: 'Check and top off all fluids.', cost: 25.00, latestUpdate: '2023-09-21T10:00:00Z', createdDate: '2023-01-07T09:45:00Z', createdBy: 'user2', updatedDate: '2023-09-21T10:00:00Z', updatedBy: 'tech2', status: GisMap.Status.DongCua },
  { maintainCode: 'TRX008', maintainName: 'Air Filter Replacement', description: 'Replace air filter.', cost: 35.00, latestUpdate: '2023-09-22T11:00:00Z', createdDate: '2023-01-08T11:00:00Z', createdBy: 'admin', updatedDate: '2023-09-22T11:00:00Z', updatedBy: 'tech1', status: GisMap.Status.DongCua },
  { maintainCode: 'TRX009', maintainName: 'Spark Plug Replacement', description: 'Replace spark plugs.', cost: 60.00, latestUpdate: '2023-09-23T12:00:00Z', createdDate: '2023-01-09T10:30:00Z', createdBy: 'user1', updatedDate: '2023-09-23T12:00:00Z', updatedBy: 'tech2', status: GisMap.Status.DongCua },
  { maintainCode: 'TRX010', maintainName: 'Exhaust Inspection', description: 'Inspect exhaust system.', cost: 40.00, latestUpdate: '2023-09-24T13:00:00Z', createdDate: '2023-01-10T12:15:00Z', createdBy: 'user2', updatedDate: '2023-09-24T13:00:00Z', updatedBy: 'tech1', status: GisMap.Status.DongCua },
  { maintainCode: 'TRX011', maintainName: 'Coolant Flush', description: 'Flush and replace coolant.', cost: 85.00, latestUpdate: '2023-09-25T09:30:00Z', createdDate: '2023-01-11T11:45:00Z', createdBy: 'admin', updatedDate: '2023-09-25T09:30:00Z', updatedBy: 'tech3', status: GisMap.Status.DongCua },
  { maintainCode: 'TRX012', maintainName: 'Tire Replacement', description: 'Replace worn-out tires.', cost: 500.00, latestUpdate: '2023-09-26T10:30:00Z', createdDate: '2023-01-12T09:00:00Z', createdBy: 'user1', updatedDate: '2023-09-26T10:30:00Z', updatedBy: 'tech2', status: GisMap.Status.DongCua },
  { maintainCode: 'TRX013', maintainName: 'Cabin Filter Replacement', description: 'Replace cabin air filter.', cost: 30.00, latestUpdate: '2023-09-27T11:00:00Z', createdDate: '2023-01-13T10:30:00Z', createdBy: 'user2', updatedDate: '2023-09-27T11:00:00Z', updatedBy: 'tech1', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX014', maintainName: 'Fuel Filter Replacement', description: 'Replace fuel filter.', cost: 55.00, latestUpdate: '2023-09-28T12:00:00Z', createdDate: '2023-01-14T11:00:00Z', createdBy: 'admin', updatedDate: '2023-09-28T12:00:00Z', updatedBy: 'tech3', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX015', maintainName: 'Windshield Wiper Replacement', description: 'Replace windshield wipers.', cost: 25.00, latestUpdate: '2023-09-29T10:00:00Z', createdDate: '2023-01-15T09:30:00Z', createdBy: 'user1', updatedDate: '2023-09-29T10:00:00Z', updatedBy: 'tech2', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX016', maintainName: 'Headlight Replacement', description: 'Replace headlight bulbs.', cost: 40.00, latestUpdate: '2023-09-30T11:00:00Z', createdDate: '2023-01-16T10:00:00Z', createdBy: 'user2', updatedDate: '2023-09-30T11:00:00Z', updatedBy: 'tech1', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX017', maintainName: 'Taillight Replacement', description: 'Replace taillight bulbs.', cost: 40.00, latestUpdate: '2023-10-01T12:00:00Z', createdDate: '2023-01-17T11:30:00Z', createdBy: 'admin', updatedDate: '2023-10-01T12:00:00Z', updatedBy: 'tech3', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX018', maintainName: 'System Diagnostics', description: 'Perform diagnostic check.', cost: 70.00, latestUpdate: '2023-10-02T10:30:00Z', createdDate: '2023-01-18T09:45:00Z', createdBy: 'user1', updatedDate: '2023-10-02T10:30:00Z', updatedBy: 'tech2', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX019', maintainName: 'Engine Tune-Up', description: 'Tune-up engine for better performance.', cost: 200.00, latestUpdate: '2023-10-03T11:30:00Z', createdDate: '2023-01-19T11:00:00Z', createdBy: 'user2', updatedDate: '2023-10-03T11:30:00Z', updatedBy: 'tech1', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX020', maintainName: 'Fuel System Cleaning', description: 'Clean fuel system for efficiency.', cost: 150.00, latestUpdate: '2023-10-04T10:15:00Z', createdDate: '2023-01-20T12:15:00Z', createdBy: 'admin', updatedDate: '2023-10-04T10:15:00Z', updatedBy: 'tech3', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX021', maintainName: 'HVAC Inspection', description: 'Inspect HVAC system.', cost: 85.00, latestUpdate: '2023-10-05T10:30:00Z', createdDate: '2023-01-21T09:30:00Z', createdBy: 'user1', updatedDate: '2023-10-05T10:30:00Z', updatedBy: 'tech2', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX022', maintainName: 'Drive Belt Replacement', description: 'Replace worn drive belts.', cost: 90.00, latestUpdate: '2023-10-06T12:00:00Z', createdDate: '2023-01-22T11:15:00Z', createdBy: 'user2', updatedDate: '2023-10-06T12:00:00Z', updatedBy: 'tech1', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX023', maintainName: 'Fuel Injection Service', description: 'Service fuel injectors.', cost: 120.00, latestUpdate: '2023-10-07T10:45:00Z', createdDate: '2023-01-23T09:00:00Z', createdBy: 'admin', updatedDate: '2023-10-07T10:45:00Z', updatedBy: 'tech3', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX024', maintainName: 'Timing Belt Replacement', description: 'Replace timing belt.', cost: 400.00, latestUpdate: '2023-10-08T11:30:00Z', createdDate: '2023-01-24T10:30:00Z', createdBy: 'user1', updatedDate: '2023-10-08T11:30:00Z', updatedBy: 'tech2', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX025', maintainName: 'Rear Differential Service', description: 'Service rear differential.', cost: 200.00, latestUpdate: '2023-10-09T10:00:00Z', createdDate: '2023-01-25T09:15:00Z', createdBy: 'user2', updatedDate: '2023-10-09T10:00:00Z', updatedBy: 'tech1', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX026', maintainName: 'Power Steering Fluid Change', description: 'Change power steering fluid.', cost: 80.00, latestUpdate: '2023-10-10T12:00:00Z', createdDate: '2023-01-26T11:45:00Z', createdBy: 'admin', updatedDate: '2023-10-10T12:00:00Z', updatedBy: 'tech3', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX027', maintainName: 'Head Gasket Replacement', description: 'Replace head gasket.', cost: 500.00, latestUpdate: '2023-10-11T13:30:00Z', createdDate: '2023-01-27T10:15:00Z', createdBy: 'user1', updatedDate: '2023-10-11T13:30:00Z', updatedBy: 'tech2', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX028', maintainName: 'Engine Mount Replacement', description: 'Replace engine mounts.', cost: 150.00, latestUpdate: '2023-10-12T10:15:00Z', createdDate: '2023-01-28T09:45:00Z', createdBy: 'user2', updatedDate: '2023-10-12T10:15:00Z', updatedBy: 'tech1', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX029', maintainName: 'Wheel Bearing Replacement', description: 'Replace wheel bearings.', cost: 200.00, latestUpdate: '2023-10-13T11:00:00Z', createdDate: '2023-01-29T11:30:00Z', createdBy: 'admin', updatedDate: '2023-10-13T11:00:00Z', updatedBy: 'tech3', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX030', maintainName: 'Radiator Flush', description: 'Flush and replace radiator fluid.', cost: 75.00, latestUpdate: '2023-10-14T10:00:00Z', createdDate: '2023-01-30T10:00:00Z', createdBy: 'user1', updatedDate: '2023-10-14T10:00:00Z', updatedBy: 'tech2', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX031', maintainName: 'Spark Plug Wires Replacement', description: 'Replace spark plug wires.', cost: 50.00, latestUpdate: '2023-10-15T12:30:00Z', createdDate: '2023-02-01T09:30:00Z', createdBy: 'user2', updatedDate: '2023-10-15T12:30:00Z', updatedBy: 'tech1', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX032', maintainName: 'Engine Flush', description: 'Flush engine for better performance.', cost: 100.00, latestUpdate: '2023-10-16T11:00:00Z', createdDate: '2023-02-02T11:00:00Z', createdBy: 'admin', updatedDate: '2023-10-16T11:00:00Z', updatedBy: 'tech3', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX033', maintainName: 'Throttle Body Cleaning', description: 'Clean throttle body.', cost: 65.00, latestUpdate: '2023-10-17T10:30:00Z', createdDate: '2023-02-03T10:15:00Z', createdBy: 'user1', updatedDate: '2023-10-17T10:30:00Z', updatedBy: 'tech2', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX034', maintainName: 'Catalytic Converter Inspection', description: 'Inspect catalytic converter.', cost: 80.00, latestUpdate: '2023-10-18T12:00:00Z', createdDate: '2023-02-04T09:30:00Z', createdBy: 'user2', updatedDate: '2023-10-18T12:00:00Z', updatedBy: 'tech1', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX035', maintainName: 'Oxygen Sensor Replacement', description: 'Replace oxygen sensor.', cost: 95.00, latestUpdate: '2023-10-19T11:30:00Z', createdDate: '2023-02-05T10:00:00Z', createdBy: 'admin', updatedDate: '2023-10-19T11:30:00Z', updatedBy: 'tech3', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX036', maintainName: 'Fuel Pressure Regulator Replacement', description: 'Replace fuel pressure regulator.', cost: 110.00, latestUpdate: '2023-10-20T10:15:00Z', createdDate: '2023-02-06T11:00:00Z', createdBy: 'user1', updatedDate: '2023-10-20T10:15:00Z', updatedBy: 'tech2', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX037', maintainName: 'Rear Brake Pad Replacement', description: 'Replace rear brake pads.', cost: 70.00, latestUpdate: '2023-10-21T09:30:00Z', createdDate: '2023-02-07T10:30:00Z', createdBy: 'user2', updatedDate: '2023-10-21T09:30:00Z', updatedBy: 'tech1', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX038', maintainName: 'Front Brake Pad Replacement', description: 'Replace front brake pads.', cost: 75.00, latestUpdate: '2023-10-22T12:00:00Z', createdDate: '2023-02-08T11:15:00Z', createdBy: 'admin', updatedDate: '2023-10-22T12:00:00Z', updatedBy: 'tech3', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX039', maintainName: 'Drive Shaft Replacement', description: 'Replace drive shaft.', cost: 600.00, latestUpdate: '2023-10-23T11:00:00Z', createdDate: '2023-02-09T09:00:00Z', createdBy: 'user1', updatedDate: '2023-10-23T11:00:00Z', updatedBy: 'tech2', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX040', maintainName: 'Shock Absorber Replacement', description: 'Replace shock absorbers.', cost: 400.00, latestUpdate: '2023-10-24T10:30:00Z', createdDate: '2023-02-10T10:15:00Z', createdBy: 'user2', updatedDate: '2023-10-24T10:30:00Z', updatedBy: 'tech1', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX041', maintainName: 'Timing Chain Replacement', description: 'Replace timing chain.', cost: 300.00, latestUpdate: '2023-10-25T12:00:00Z', createdDate: '2023-02-11T11:00:00Z', createdBy: 'admin', updatedDate: '2023-10-25T12:00:00Z', updatedBy: 'tech3', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX042', maintainName: 'Fuel Tank Cleaning', description: 'Clean fuel tank.', cost: 90.00, latestUpdate: '2023-10-26T10:00:00Z', createdDate: '2023-02-12T10:30:00Z', createdBy: 'user1', updatedDate: '2023-10-26T10:00:00Z', updatedBy: 'tech2', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX043', maintainName: 'Interior Cleaning', description: 'Deep clean the car interior.', cost: 50.00, latestUpdate: '2023-10-27T09:00:00Z', createdDate: '2023-02-13T09:15:00Z', createdBy: 'user2', updatedDate: '2023-10-27T09:00:00Z', updatedBy: 'tech1', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX044', maintainName: 'Exterior Washing', description: 'Wash the exterior of the car.', cost: 30.00, latestUpdate: '2023-10-28T11:30:00Z', createdDate: '2023-02-14T10:45:00Z', createdBy: 'admin', updatedDate: '2023-10-28T11:30:00Z', updatedBy: 'tech3', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX045', maintainName: 'Headlight Alignment', description: 'Align headlight beams.', cost: 40.00, latestUpdate: '2023-10-29T10:30:00Z', createdDate: '2023-02-15T12:00:00Z', createdBy: 'user1', updatedDate: '2023-10-29T10:30:00Z', updatedBy: 'tech2', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX046', maintainName: 'Engine Coolant Check', description: 'Check and top off engine coolant.', cost: 20.00, latestUpdate: '2023-10-30T11:00:00Z', createdDate: '2023-02-16T09:30:00Z', createdBy: 'user2', updatedDate: '2023-10-30T11:00:00Z', updatedBy: 'tech1', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX047', maintainName: 'Clutch Adjustment', description: 'Adjust the clutch for smooth operation.', cost: 100.00, latestUpdate: '2023-10-31T12:30:00Z', createdDate: '2023-02-17T10:00:00Z', createdBy: 'admin', updatedDate: '2023-10-31T12:30:00Z', updatedBy: 'tech3', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX048', maintainName: 'Gearbox Service', description: 'Service the gearbox for better performance.', cost: 250.00, latestUpdate: '2023-11-01T10:00:00Z', createdDate: '2023-02-18T11:15:00Z', createdBy: 'user1', updatedDate: '2023-11-01T10:00:00Z', updatedBy: 'tech2', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX049', maintainName: 'Key Programming', description: 'Program a new key for the vehicle.', cost: 120.00, latestUpdate: '2023-11-02T09:30:00Z', createdDate: '2023-02-19T09:00:00Z', createdBy: 'user2', updatedDate: '2023-11-02T09:30:00Z', updatedBy: 'tech1', status: GisMap.Status.HoatDong },
  { maintainCode: 'TRX050', maintainName: 'Wheel Alignment', description: 'Perform wheel alignment for better handling.', cost: 80.00, latestUpdate: '2023-11-03T12:00:00Z', createdDate: '2023-02-20T10:30:00Z', createdBy: 'admin', updatedDate: '2023-11-03T12:00:00Z', updatedBy: 'tech3', status: GisMap.Status.HoatDong },
];
  displayedColumns: string[] = [
    'maintainCode',
    'maintainName',
    'description',
    'cost',
    'latestUpdate',
    'createdDate',
    'createdBy',
    'updatedDate',
    'updatedBy',
  ];
  dataSource = signal<MatTableDataSource<TransactionInfo>>(
    new MatTableDataSource<TransactionInfo>(this.sampleTransactions)
  );

  constructor() {}

  ngOnInit(): void {}

onEdit() {

}

onDelete() {

}
}
